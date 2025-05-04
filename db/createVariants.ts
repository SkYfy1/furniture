import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { productsTable } from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle({ client: sql });

const imgUrls = {
  phones: {
    yellow:
      "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//phone-yellow.jpeg",
    pink: "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//phone-pink.jpeg",
    green:
      "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//phone-green.jpeg",
    blue: "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//phone-blue.jpeg",
    black:
      "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//phone-black.jpeg",
  },
  kitchen: {
    coffee: {
      black:
        "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//coffee-black.jpeg",
      red: "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//coffee-red.jpeg",
      white:
        "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//coffee-white.jpeg",
    },
    miniCoffee: {
      black:
        "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//mini-coffee-black.jpeg",
      red: "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//mini-coffee-red.jpeg",
      white:
        "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//mini-coffee-white.jpeg",
    },
    mixer: {
      blue: "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//mixer-blue.jpeg",
      green:
        "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//mixer-green.jpeg",
      red: "https://qgbvgmxttrpojnczyfdn.supabase.co/storage/v1/object/public/images//mixer-red.jpeg",
    },
  },
};

const getPriceBySize = (
  size: string,
  price: number,
  discount: number | null
): { price: number; discount: number | null; discountedPrice: number } => {
  let priceMultiplier = 1;
  if (size === "small") priceMultiplier = 0.75;
  if (size === "large") priceMultiplier = 1.25;

  const productPrice = Math.floor(price * priceMultiplier);

  const discountedPrice = discount
    ? Math.floor(productPrice * (1 - discount / 100))
    : productPrice;

  return {
    price: productPrice,
    discount,
    discountedPrice,
  };
};

const getAllProducts = async () => {
  try {
    const products = await db.select().from(productsTable);

    const variants = [];

    const sizes = ["small", "medium", "large"] as const;
    for (const product of products) {
      const category = product.category.toLowerCase();
      //
      if (category === "plants") {
        //
        for (const size of sizes) {
          const { price, discount, discountedPrice } = getPriceBySize(
            size,
            product.price,
            product.discount
          );
          //
          variants.push({
            productId: product.id,
            sku: `${product.name
              .toLowerCase()
              .split(" ")
              .join("-")}-${size.charAt(0)}`,
            size: size,
            color: null,
            price: price,
            discount: discount,
            discountedPrice: discountedPrice,
            availableQuantity: product.availableQuantity,
            imageUrl: product.imageUrl,
          });
        }
      }

      if (category === "phones") {
        const colors = Object.keys(imgUrls[category]);
        // const colors =
        //   category === "phones" ? productColors : productColors[product.name];
        for (const color of colors) {
          const { price, discount, discountedPrice } = getPriceBySize(
            "meduim",
            product.price,
            product.discount
          );
          //
          variants.push({
            productId: product.id,
            sku: `${product.name.toLowerCase().split(" ").join("-")}-${color}`,
            size: null,
            color,
            price: price,
            discount: discount,
            discountedPrice: discountedPrice,
            availableQuantity: product.availableQuantity,
            imageUrl: imgUrls[category][color as keyof typeof imgUrls.phones],
          });
        }
      }

      if (category === "kitchen") {
        const kitchenImages = imgUrls.kitchen;
        let productName = "coffee";
        if (product.name === "Coffee machine") productName = "coffee";
        if (product.name === "Mini coffee machine") productName = "miniCoffee";
        if (product.name === "Mini mixer") productName = "mixer";
        if (product.name === "Mixer") productName = "mixer";

        const productImages =
          kitchenImages[productName as keyof typeof imgUrls.kitchen];

        const colors = Object.keys(productImages);

        for (const color of colors) {
          const { price, discount, discountedPrice } = getPriceBySize(
            "meduim",
            product.price,
            product.discount
          );
          //
          variants.push({
            productId: product.id,
            sku: `${product.name.toLowerCase().split(" ").join("-")}-${color}`,
            size: null,
            color,
            price: price,
            discount: discount,
            discountedPrice: discountedPrice,
            availableQuantity: product.availableQuantity,
            imageURL: productImages[color as keyof typeof productImages],
          });
        }
      }
    }
    //
    console.log(variants);
  } catch (error) {
    console.log(error);
  }
};

getAllProducts();
