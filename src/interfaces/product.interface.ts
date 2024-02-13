export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  //todo type: Type;
  gender: Category;
}

export interface CartProduct {
  id: string;
  quantity: number;
  size: Size;
  slug: string;
  title: string;
  price: number;
  image: string;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
type Category = "men" | "women" | "kid" | "unisex";
