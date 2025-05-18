import { db } from "@/db/drizzle";
import {
  orderItemsTable,
  ordersTable,
  productsTable,
  usersTable,
  variantsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

type Order = typeof ordersTable.$inferSelect;
// type Items = Partial<typeof orderItemsTable.$inferSelect>;
type Variants = Partial<typeof variantsTable.$inferSelect> & {
  quantity: number;
};
type Products = Partial<typeof productsTable.$inferSelect> & {
  quantity: number;
};
type result = Record<string, { order: Order; items: Variants[] | Products[] }>;

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

type ArrayType<S> = S extends readonly (infer F)[] ? F : never;

export type OrdersValue = ArrayType<
  PromiseResolvedType<ReturnType<typeof getOrderData>>
>;

export const getOrderData = async (userId: string) => {
  const query = await db
    .select({
      order: ordersTable,
      item: orderItemsTable,
      variant: variantsTable,
      product: productsTable,
    })
    .from(usersTable)
    .leftJoin(ordersTable, eq(usersTable.id, ordersTable.clientId))
    .innerJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
    .leftJoin(variantsTable, eq(orderItemsTable.variantId, variantsTable.id))
    .leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id))
    .where(eq(usersTable.id, userId));

  const result = query.reduce<result>((acc, row) => {
    const order = row.order;
    const item = row.item;
    const variant = row.variant;
    const product = row.product;

    if (!acc[order!.id]) {
      acc[order!.id] = { order: order as Order, items: [] };
    }

    if (variant) {
      acc[order!.id].items.push({
        id: variant?.id,
        sku: variant?.sku,
        imageUrl: variant.imageUrl,
        color: variant?.color,
        size: variant?.size,
        price: item.priceAtPurchase,
        quantity: item.quantity,
      });
    }

    if (product) {
      acc[order!.id].items.push({
        id: product?.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: item.priceAtPurchase,
        quantity: item.quantity,
      });
    }

    return acc;
  }, {});

  //   const orders = Object.keys(result).map((key) => result[key]);

  const orders = Object.values(result);

  return orders;
};
