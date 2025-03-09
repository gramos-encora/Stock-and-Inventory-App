// Tipos
export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  expirationDate: string;
  stock: number;
}

export interface ProductListProps {
  products: Product[];
}
