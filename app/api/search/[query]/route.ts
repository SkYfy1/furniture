import { getQueryProduct } from "@/lib/data/products";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ query: string }> }
) => {
  const query = (await params).query;
  if (!query)
    return Response.json(
      {
        error: "Query error",
      },
      {
        status: 400,
      }
    );
  try {
    const products = await getQueryProduct(query);

    return Response.json(products, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      {
        status: 500,
      }
    );
  }
};
