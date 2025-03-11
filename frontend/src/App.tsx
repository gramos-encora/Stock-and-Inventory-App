import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchForm from "./components/SearchForm";
import InventoryPage from "./components/InventoryPage";
import { Product } from "./models/Product";
import { ProductContext } from "./context/productsContext";

const initialProducts: Product[] = [];

export type Category = "all" | "food" | "electronics" | "clothing";
export type Availability = "inStock" | "outOfStock" | "all";

const App: React.FC = () => {
  const [filters, setFilters] = useState({
    name: "",
    categories: [] as Category[],
    availability: "all" as Availability,
  });

  return (
    <div className="App">
      <ProductContext>
        <SearchForm onSearch={setFilters} />
        <InventoryPage products={initialProducts} filters={filters} />
      </ProductContext>
    </div>
  );
};

export default App;
