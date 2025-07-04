import { db } from "@/db/drizzle";
import { hasValueInArray } from "@/db/helpers";
import { productsTable, variantsTable } from "@/db/schema";
import { and, asc, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";
import { blackList } from "@/constants";
import { deleteDublicates, getMinMaxValue } from "../utils";

export const getVariants = async (id: string) => {
  const variants = await db
    .select()
    .from(variantsTable)
    .where(eq(variantsTable.productId, id));

  return variants;
};

export const getVariantsJoin = async (category: string) => {
  const variants = await db
    .select({ variants: variantsTable })
    .from(variantsTable)
    .innerJoin(productsTable, eq(variantsTable.productId, productsTable.id))
    .where(eq(productsTable.category, category));

  return variants.map((el) => el.variants);
};

export const getProductById = async (id: string) => {
  const product = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));

  return product[0];
};

export const getFilteredVariants = async (
  category: string,
  filters?: { orderBy?: string; min?: number; max?: number }
) => {
  const varQuery = await db
    .select({ variants: variantsTable })
    .from(variantsTable)
    .innerJoin(productsTable, eq(variantsTable.productId, productsTable.id))
    .where(eq(productsTable.category, category));

  const variants = varQuery.map((el) => el.variants);

  const result = [...variants]
    .filter(
      (item) =>
        item.discountedPrice >= (filters?.min ?? 0) &&
        item.discountedPrice <= (filters?.max ?? 1000)
    )
    .sort((a, b) => {
      const name1 = a.sku
        .split("-")
        .filter((item) => !blackList.includes(item))
        .join(" ");

      const name2 = b.sku
        .split("-")
        .filter((item) => !blackList.includes(item))
        .join(" ");

      switch (filters?.orderBy) {
        case "PRICE_ASC":
          return a.discountedPrice - b.discountedPrice;
        case "PRICE_DESC":
          return b.discountedPrice - a.discountedPrice;
        case "NAME_ASC":
          return name1.localeCompare(name2);
        case "NAME_DESC":
          return name2.localeCompare(name1);
        default:
          return name1.localeCompare(name2);
      }
    });
  return result;
};

export const getProductsByCategory = async (
  category: string,
  filters?: { orderBy?: string; min?: number; max?: number }
) => {
  const products = db
    .select()
    .from(productsTable)
    .where(
      filters?.max
        ? and(
            eq(productsTable.category, category),
            gte(productsTable.discountedPrice, filters?.min ?? 0),
            lte(productsTable.discountedPrice, filters?.max ?? 1000)
          )
        : eq(productsTable.category, category)

      // OR
      // and(
      //   eq(productsTable.category, category),
      //   gt(productsTable.price, filters?.min ?? 0),
      //   lt(productsTable.price, filters?.max ?? 1000)
      // )
    );
  // .orderBy(
  //   filters.orderBy === "PRICE_ASC"
  //     ? asc(productsTable.price)
  //     : filters?.orderBy === "PRICE_DESC"
  //     ? desc(productsTable.price)
  //     : filters?.orderBy === "NAME_DESC"
  //     ? desc(productsTable.name)
  //     : filters?.orderBy === "NAME_ASC"
  //     ? asc(productsTable.name)
  //     : asc(productsTable.id)
  // );

  switch (filters?.orderBy) {
    case "PRICE_ASC":
      return await products.orderBy(asc(productsTable.discountedPrice));
    case "PRICE_DESC":
      return await products.orderBy(desc(productsTable.discountedPrice));
    case "NAME_ASC":
      return await products.orderBy(sql`LOWER(${productsTable.name}) ASC`);
    case "NAME_DESC":
      return await products.orderBy(sql`LOWER(${productsTable.name}) DESC`);
    default:
      return await products.orderBy(sql`LOWER(${productsTable.name}) ASC`);
  }
};

export const getOneProductFromThreeCategories = async () => {
  const products = await db
    .selectDistinctOn([productsTable.category])
    .from(productsTable)
    .where(
      or(
        eq(productsTable.category, "Plants"),
        eq(productsTable.category, "Flowers"),
        eq(productsTable.category, "Phones")
      )
    )
    .limit(3)
    .orderBy(productsTable.category);

  return products;
};

export const getLimitedProducts = async (category: string, limit: number) => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category))
    .limit(limit);

  return products;
};

export const getProductsWithTag = async (tag: string) => {
  const products = await db
    .select()
    .from(productsTable)
    .where(hasValueInArray(productsTable.tags, tag))
    .execute({ [tag]: tag });

  return products;
};

export const getRelatedProducts = async (tags: string[], id: string) => {
  const result = await Promise.all(
    tags.map(async (tag) => {
      const res = await db
        .select()
        .from(productsTable)
        .where(hasValueInArray(productsTable.tags, tag))
        .execute({ [tag]: tag });
      return res;
    })
  );

  // Or just .flat()

  const products = result
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((item) => item.id != id);

  return deleteDublicates(products, "id");
};

export const getFewProducts = async () => {
  const products = await db.select().from(productsTable).limit(10);

  return products;
};

export const getQueryProduct = async (query: string) => {
  const products = await db
    .select()
    .from(productsTable)
    .where(ilike(productsTable.name, `${query}%`));

  return products;
};

export const getCategoryPriceRange = async (
  category: string
): Promise<number[]> => {
  const [products, variants] = await Promise.all([
    getProductsByCategory(category),
    getFilteredVariants(category),
  ]);

  const rangeProducts = getMinMaxValue([...products, ...variants]);

  return rangeProducts;
};
