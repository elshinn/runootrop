export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  color: string; // Tailwind color class equivalent usually, or hex
  image: string;
  features: string[];
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
