import { Product } from "../models/Product";

const API_BASE_URL = "http://localhost:8080/api";

export interface ProductFilters {
  name?: string;
  category?: string;
  availability?: "inStock" | "outOfStock" | "all";
  page?: number;
  sortBy?: "name" | "category" | "price" | "stock" | "expirationDate";
  sortOrder?: "asc" | "desc";
}

export const fetchProducts = async (
  filters: ProductFilters = {}
): Promise<Product[]> => {
  const queryParams = new URLSearchParams();
  if (filters.name) queryParams.append("search", filters.name);
  if (filters.category) queryParams.append("category", filters.category);
  if (filters.availability) queryParams.append("stock", filters.availability);
  if (filters.page) queryParams.append("page", filters.page.toString());
  if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
  if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder);

  const response = await fetch(`${API_BASE_URL}/products/all?${queryParams}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (
  id: number,
  product: Partial<Product>
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const markOutOfStock = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}/outofstock`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to mark product as out of stock");
};

export const markInStock = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}/instock`, {
    method: "PUT",
  });
  if (!response.ok) throw new Error("Failed to mark product as in stock");
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
};
