"use server";

import { Products, Variants } from "@/db/tableTypes";
import { stripe } from "../stripe";
import { createLineItems, isProductTable } from "../utils";

export const retryPayment = async ({
  userId,
  paymentId,
  orderedProducts,
}: {
  userId: string;
  paymentId: string;
  orderedProducts: Variants[] | Products[];
}) => {
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
};
