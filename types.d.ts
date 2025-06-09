type size = "small" | "medium" | "large";

type supportedLocale = "en" | "fr";

type discountType = "PERCENTAGE" | "FIXED";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthCredentials {
  name: string;
  email: string;
  password: string;
}

interface Dimensions {
  width: string;
  height: string;
  depth: string;
  weight: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  dimensions: Dimensions | unknown;
  discount: number | null;
  discountedPrice: number | null;
  tags: string[] | null;
  availableQuantity: number;
}

interface CartItem {
  id: string;
  name: string;
  newPrice: number;
  oldPrice: number;
  discount: number;
  quantity: number;
  image: string;
  available: number;
}

interface Variant {
  id: string;
  productId: string;
  sku: string;
  size: size | null;
  color: string | null;
  price: number;
  discount: number | null;
  discountedPrice: number | null;
  availableQuantity: number;
  imageUrl: string;
}

interface Coupon {
  code: string;
  discount: number;
  type: discountType;
}
