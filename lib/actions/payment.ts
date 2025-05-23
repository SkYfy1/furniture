"use server";

import { Products, Variants } from "@/db/tableTypes";
import { stripe } from "../stripe";
import { createLineItems, isProductTable } from "../utils";
import { sql } from "drizzle-orm";
import { db } from "@/db/drizzle";

export const retryPayment = async ({
  userId,
  paymentId,
  orderedProducts,
}: {
  userId: string;
  paymentId: string;
  orderedProducts: Variants[] | Products[];
}) => {
  try {
    // Filter orderedProducts Array
    const { variantsArray, productsArray } = orderedProducts.reduce<{
      variantsArray: Variants[];
      productsArray: Products[];
    }>(
      (acc, cur) => {
        if (isProductTable(cur)) {
          acc.productsArray.push(cur);
        } else {
          acc.variantsArray.push(cur);
        }

        return acc;
      },
      { variantsArray: [], productsArray: [] }
    );
    //   Create line_items for session
    const line_items = createLineItems(variantsArray, productsArray);

    //   Create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?payment_id=${paymentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        payment_id: paymentId,
        user_id: userId,
      },
    });

    //   Return session URL

    return session.url;
  } catch (error) {
    console.log(error);
  }
};

export const buyNow = async ({
  id,
  name,
  quantity,
  price,
  imageUrl,
  type,
  userId,
}: {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
  type: string;
  userId: string;
}) => {
  try {
    const productData = { id, name, quantity, price, imageUrl, type };
    const {
      rows: [{ gen_random_uuid: paymentId }],
    } = await db.execute(sql`SELECT gen_random_uuid()`);

    const line_item = {
      price_data: {
        currency: "eur",
        product_data: {
          name: name as string,
          images: [imageUrl as string],
        },
        unit_amount: price * 100,
      },
      quantity: quantity,
    };
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [line_item],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?payment_id=${paymentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["UA", "FR", "DE", "IT", "PL", "CZ", "US", "GB"],
      },
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: "shipping_service",
          label: {
            type: "custom",
            custom: "Shipping service",
          },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: "NOVAPOST",
                value: "NOVAPOST",
              },
              {
                label: "MEEST",
                value: "MEEST",
              },
              {
                label: "UKRPOSTA",
                value: "UKRPOSTA",
              },
            ],
          },
        },
        {
          key: "payment_method",
          label: {
            type: "custom",
            custom: "Payment method",
          },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: "CASH",
                value: "CASH",
              },
              {
                label: "CARD",
                value: "CARD",
              },
              {
                label: "CRYPTO",
                value: "CRYPTO",
              },
            ],
          },
        },
      ],
      metadata: {
        payment_id: paymentId as string,
        client_id: userId,
        type: "create",
        productData: JSON.stringify(productData),
      },
    });

    return { success: true, message: "Success", url: session.url };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error, please try again later." };
  }
};
