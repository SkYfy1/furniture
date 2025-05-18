import { getOrderData } from "@/lib/data/order";
import {
  deliveryTable,
  ordersTable,
  paymentTable,
  productsTable,
  variantsTable,
} from "./schema";

export type shippingInfo = typeof deliveryTable.$inferSelect;

export type paymentInfo = typeof paymentTable.$inferSelect;

export type Order = typeof ordersTable.$inferSelect;

export type Variants = Partial<typeof variantsTable.$inferSelect> & {
  quantity: number;
};
export type Products = Partial<typeof productsTable.$inferSelect> & {
  quantity: number;
};

export type result = Record<
  string,
  { order: Order; items: Variants[] | Products[] }
>;

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

type ArrayType<S> = S extends readonly (infer F)[] ? F : never;

export type OrdersValue = ArrayType<
  PromiseResolvedType<ReturnType<typeof getOrderData>>
>;
