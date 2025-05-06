import { db } from "@/db/drizzle";
import { hasValueInArray } from "@/db/helpers";
import { productsTable, variantsTable } from "@/db/schema";
import { eq, or } from "drizzle-orm";

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

export const getProductsByCategory = async (category: string) => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category));

  return products;
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
