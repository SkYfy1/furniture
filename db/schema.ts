import {
  pgTable as table,
  text,
  timestamp,
  uuid,
  pgEnum,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["user", "admin"]);

export const SIZE_ENUM = pgEnum("size", ["small", "medium", "large"]);

export const ORDER_STATUS_ENUM = pgEnum("ORDER_STATUS", [
  "CREATED",
  "PROCESSING",
  "FULLFILLED",
  "REJECTED",
]);

export const DELIVERY_STATUS_ENUM = pgEnum("DELIVERY_STATUS", [
  "PENDING",
  "SENDED",
  "WAITING",
  "FULFILLED",
  "REJECTED",
]);

export const SHIPPING_SERVICE_ENUM = pgEnum("SHIPPING_SERVICE", [
  "NOVAPOST",
  "MEEST",
  "UKRPOSTA",
]);

export const PAYMENT_TYPE_ENUM = pgEnum("PAYMENT_TYPE", [
  "CARD",
  "CASH",
  "CRYPTO",
]);

export const PAYMENT_STATUS_ENUM = pgEnum("PAYMENT_STATUS", [
  "PENDING",
  "PAID",
  "REJECTED",
]);

export const usersTable = table("user_table", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  role: ROLE_ENUM().default("user"),
});

export const productsTable = table("product_table", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("imageUrl").notNull(),
  dimensions: jsonb("dimentions").notNull(),
  discount: integer("discount"),
  discountedPrice: integer("discounted_price").notNull(),
  tags: text("tags").array(),
  availableQuantity: integer("available_quantity").notNull().default(10),
});

export const variantsTable = table("product_variants", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  productId: uuid("product_id")
    .references(() => productsTable.id)
    .notNull(),
  sku: text("sku").notNull(),
  size: SIZE_ENUM(),
  color: text("color"),
  price: integer("price").notNull(),
  discount: integer("discount"),
  discountedPrice: integer("discounted_price").notNull(),
  imageUrl: text("imageUrl").notNull(),
  availableQuantity: integer("available_quantity").notNull().default(10),
});

export const ordersTable = table("orders_table", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  clientId: uuid("client_id")
    .references(() => usersTable.id)
    .notNull(),
  shippingInfo: uuid("shipping_info")
    .references(() => deliveryTable.id)
    .notNull(),
  paymentInfo: uuid("payment_info")
    .references(() => paymentTable.id)
    .notNull(),
  orderDate: timestamp("order_date", {
    withTimezone: true,
  }).defaultNow(),
  summaryPrice: integer("summary_price").notNull(),
  orderStatus: ORDER_STATUS_ENUM("order_status").default("CREATED"),
});

export const deliveryTable = table("delivery_table", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  shippingService: SHIPPING_SERVICE_ENUM("shipping_service")
    .notNull()
    .default("NOVAPOST"),
  deliveryStatus: DELIVERY_STATUS_ENUM("delivery_status").default("PENDING"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: integer("zip_code").notNull(),
  address: text("address").notNull(),
  sendDate: timestamp("send_date", {
    withTimezone: true,
  }),
  arrivalDate: timestamp("arrival_date", {
    withTimezone: true,
  }),
});

export const paymentTable = table("payment_table", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  paymentType: PAYMENT_TYPE_ENUM("payment_type").notNull().default("CARD"),
  paymentStatus: PAYMENT_STATUS_ENUM("payment_status").default("PENDING"),
  paymentDate: timestamp("payment_date", {
    withTimezone: true,
  }).defaultNow(),
});

export const orderItemsTable = table("order_items", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  orderId: uuid("order_id")
    .references(() => ordersTable.id)
    .notNull(),
  productId: uuid("product_id").references(() => productsTable.id),
  variantId: uuid("variant_id").references(() => variantsTable.id),
  priceAtPurchase: integer("price_at_purchase").notNull(),
  quantity: integer("quantity").notNull(),
  size: text("size"),
  color: text("color"),
});
