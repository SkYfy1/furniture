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
}
