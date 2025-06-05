import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import dayjs from "dayjs";
import { couponTable } from "./schema";

config({ path: ".env.local" });

type discountType = "PERCENTAGE" | "FIXED";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const bases = ["SUMMER", "DAY", "NEW", "NATURE"] as const;
const types = ["PERCENTAGE", "FIXED"];
const discountValuesPerc = [10, 15, 20];
const discountValuesFixed = [50, 100, 150];

const createCoupon = async () => {
  const coupons = [];
  for (const base of bases) {
    for (let i = 0; i < 3; i++) {
      const type: discountType = types[
        Math.round(Math.random())
      ] as discountType;

      const value =
        type === "PERCENTAGE" ? discountValuesPerc[i] : discountValuesFixed[i];

      const minOrderAmount = type === "PERCENTAGE" ? 150 : 350;

      const expiresAt = dayjs().add(20, "day").toDate().toDateString();

      coupons.push({
        couponCode: `${base + value}`,
        discountType: type,
        discountValue: value,
        usageLimit: 20,
        minOrderAmount,
        expiresAt,
      });
    }
  }

  try {
    for (const coupon of coupons) {
      await db.insert(couponTable).values(coupon);
    }
  } catch (error) {
    console.log(error);
  }
};

createCoupon();
