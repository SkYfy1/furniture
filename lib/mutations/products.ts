import { orderItemsTable, productsTable, variantsTable } from "@/db/schema";
import { Transaction } from "@/db/tableTypes";
import { eq, sql } from "drizzle-orm";

export const updateOrderItems = async (
  tx: Transaction,
  productData: { id: string; quantity: number; price: number; type: string },
  orderId: string
) => {
  const { id, quantity, price, type } = productData;
  const isVariant = type === "variant";

  const tableToUpdate = isVariant ? variantsTable : productsTable;

  const insertValue = {
    orderId,
    variantId: isVariant ? id : null,
    productId: isVariant ? null : id,
    priceAtPurchase: price,
    quantity,
  };

  await Promise.all([
    tx.insert(orderItemsTable).values(insertValue),
    tx
      .update(tableToUpdate)
      .set({
        availableQuantity: sql`${tableToUpdate.availableQuantity} - ${quantity}`,
      })
      .where(eq(tableToUpdate.id, id)),
  ]);
};
