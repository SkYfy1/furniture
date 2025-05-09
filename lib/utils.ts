import { blackList } from "@/constants";
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

export const filterSku = (sku: string) => {
  return sku
    .split("-")
    .filter((str) => !blackList.includes(str))
    .join(" ");
};
