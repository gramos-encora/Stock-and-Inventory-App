import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchForm from "./components/SearchForm";
import InventoryPage from "./components/InventoryPage";
import { Product } from "./models/Product";

const initialProducts: Product[] = [
  {
    id: 1,
    category: "food",
    name: "Watermelon",
    price: 1.5,
    expirationDate: "2024-12-25",
    stock: 50,
  },
  {
    id: 2,
    category: "electronics",
    name: "Samsung TV",
    price: 900,
    expirationDate: "2025-01-01",
    stock: 0,
  },
  {
    id: 3,
    category: "clothing",
    name: "Jeans",
    price: 60,
    expirationDate: "2026-06-30",
    stock: 50,
  },
  {
    id: 4,
    category: "clothing",
    name: "T-Shirt",
    price: 30,
    expirationDate: "2025-03-15",
    stock: 50,
  },
];

export type Category = "food" | "electronics" | "clothing";
export type Availability = "inStock" | "outOfStock" | "all";

const App: React.FC = () => {
  const [filters, setFilters] = useState({
    name: "",
    categories: [] as Category[],
    availability: "all" as Availability,
  });

  return (
    <div className="App">
      <SearchForm onSearch={setFilters} />
      <InventoryPage products={initialProducts} filters={filters} />
    </div>
  );
};

export default App;
