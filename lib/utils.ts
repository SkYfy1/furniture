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
  return "sku" in item;
};

export const isProductTable = (item: Products | Variants): item is Products => {
  return "name" in item;
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

export const formatDate = (input: string) => {
  const [weekDay, month, day, year] = input.split(" ");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthNumber = monthNames.indexOf(month);

  return `${weekDay} ${monthNumber + 1}/${day}/${year}`;
};

export const deleteDublicates = <T>(array: T[], filterKey: keyof T): T[] => {
  const result = [];
  const set = new Set();

  for (const item of array) {
    if (!set.has(item[filterKey])) {
      set.add(item[filterKey]);
      result.push(item);
    }
  }

  return result;
};

export const calculateCart = ({
  cart,
  couponData,
}: {
  cart: CartItem[];
  couponData?: Coupon;
}) => {
  const couponActivated = couponData ? true : false;

  const cartTotal = cart.reduce((cur, acc) => {
    if (!acc.discount) return cur + acc.oldPrice * acc.quantity;
    return cur + acc.newPrice * acc.quantity;
  }, 0);

  const couponDiscount =
    couponData?.type === "PERCENTAGE"
      ? (cartTotal * couponData.discount) / 100
      : couponData?.discount;

  const totalPrice = couponActivated
    ? Math.floor(cartTotal - couponDiscount!)
    : cartTotal;

  const totalDiscount =
    cart.reduce((cur, acc) => {
      if (!acc.discount) return cur + 0;
      return cur + (acc.oldPrice - acc.newPrice) * acc.quantity;
    }, 0) + Math.floor(couponDiscount ?? 0);

  const tax = totalPrice > 1000 ? Math.floor((totalPrice * 12) / 100) : 0;

  return { totalDiscount, totalPrice, tax, couponActivated };
};

export const getMinMaxValue = (
  array: Partial<Product>[] | Partial<Variant>[]
): number[] => {
  if (array.length === 0) return [0, 1000];

  // 1 first variant
  // const prices = array
  //   .sort((a, b) => a.discountedPrice! - b.discountedPrice!)
  //   ?.filter((el, ind) => ind === 0 || ind === array.length - 1)
  //   .map((el) => el.discountedPrice!);

  // return prices;

  // 2nd
  // return [
  //   Math.max(...array.map((el) => el.discountedPrice!)),
  //   Math.min(...array.map((el) => el.discountedPrice!)),
  // ];

  // AI fastest

  let min = array[0].discountedPrice!;
  let max = array[0].discountedPrice!;

  for (let i = 0; i < array.length; i++) {
    const price = array[i].discountedPrice!;
    if (price < min) min = price;
    if (price > max) max = price;
  }

  return [min, max];
};
