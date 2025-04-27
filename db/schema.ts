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
});
