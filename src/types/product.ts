export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number;
  images: string[];
  stock: number;
  category: string;
  status: "draft" | "active";
  variants: string[];
  createdAt: string;
  updatedAt: string;
}
