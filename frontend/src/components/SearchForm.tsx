import React, { useState } from "react";
import InventoryTable from "./ProductTable";
import "bootstrap/dist/css/bootstrap.css";
import "../SearchForm.css";

type Category = "food" | "electronics" | "clothing";
type Availability = "inStock" | "outOfStock" | "all";

export default function SearchForm() {
  const [name, setName] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [availability, setAvailability] = useState<Availability>("all");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value as Category
    );
    setCategories(selectedValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, categories, availability });
    // Aquí puedes disparar una búsqueda real o llamar a un servicio.
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label className="w-24">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-1 flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24">Category:</label>
          <select
            multiple
            value={categories}
            onChange={handleCategoryChange}
            className="border p-1 flex-1"
          >
            <option value="food">Food</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24">Availability:</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value as Availability)}
            className="border p-1 flex-1"
          >
            <option value="all">All</option>
            <option value="inStock">In stock</option>
            <option value="outOfStock">Out of stock</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-gray-500 text-black px-4 py-1">
            Search
          </button>
        </div>
      </form>

      <button>New product</button>

      <InventoryTable></InventoryTable>
    </>
  );
}
