import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchForm from "./components/SearchForm";
import InventoryTable from "./components/ProductTable";
import InventoryOverview from "./components/InventoryOverview";
import { Product } from "./models/Product";

// Datos mock para empezar
const mockProducts: Product[] = [
  {
    id: 1,
    category: "Food",
    name: "Watermelon",
    price: 1.5,
    expirationDate: "12/25/2024",
    stock: 50,
  },
  {
    id: 2,
    category: "Electronics",
    name: "Samsung TV",
    price: 900,
    expirationDate: "N/A",
    stock: 0,
  },
  {
    id: 3,
    category: "Clothing",
    name: "Jeans",
    price: 60,
    expirationDate: "N/A",
    stock: 50,
  },
  {
    id: 4,
    category: "Clothing",
    name: "T-Shirt",
    price: 30,
    expirationDate: "N/A",
    stock: 50,
  },
];

function App() {
  return (
    <div className="App">
      <SearchForm></SearchForm>
      <InventoryTable products={mockProducts}></InventoryTable>
      <InventoryOverview products={mockProducts}></InventoryOverview>
    </div>
  );
}

export default App;
