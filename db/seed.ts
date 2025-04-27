import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { productsTable } from "./schema";
import products from "@/dummyProducts.json";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql });

const seedDb = async () => {
  console.log("Start!");
  try {
    for (const product of products) {
      await db.insert(productsTable).values(product);
    }
  } catch (error) {
    console.log(error);
  }
  console.log("Data seeded successfully!");
};

seedDb();
