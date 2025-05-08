import { db } from "@/db/drizzle";
import { hasValueInArray } from "@/db/helpers";
import { productsTable, variantsTable } from "@/db/schema";
import { and, asc, desc, eq, gt, lt, or } from "drizzle-orm";

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
            gt(productsTable.discountedPrice, filters?.min ?? 0),
            lt(productsTable.discountedPrice, filters?.max ?? 1000)
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
      return await products.orderBy(asc(productsTable.name));
    case "NAME_DESC":
      return await products.orderBy(desc(productsTable.name));
    default:
      return await products.orderBy(asc(productsTable.discountedPrice));
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

export const getFewProducts = async () => {
  const products = await db.select().from(productsTable).limit(10);

  return products;
};
