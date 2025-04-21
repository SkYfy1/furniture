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
