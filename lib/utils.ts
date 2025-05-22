import { blackList } from "@/constants";
import { Products, Variants } from "@/db/tableTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  ms: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), ms);
  };
}

export const isVariant = (item: Product | Variant): item is Variant => {
  return (item as Variant).sku !== undefined;
};

export const isProductTable = (item: Products | Variants): item is Products => {
  return (item as Products).name !== undefined;
};

export const filterSku = (sku: string) => {
  return sku
    .split("-")
    .filter((str) => !blackList.includes(str))
    .join(" ");
};

export const createLineItems = (
  variantArray: Variants[],
  productArray: Products[]
) => {
  const line_items = [
    ...variantArray.map((item) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.sku as string,
            images: [item.imageUrl as string],
          },
          unit_amount: item.price! * 100,
        },
        quantity: item.quantity,
      };
    }),
    ...productArray.map((item) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name as string,
            images: [item.imageUrl as string],
          },
          unit_amount: item.price! * 100,
        },
        quantity: item.quantity,
      };
    }),
  ];

  return line_items;
};
