import React, { useState } from "react";

import "../styles/SearchForm.css";

type Category = "food" | "electronics" | "clothing";
type Availability = "inStock" | "outOfStock" | "all";

interface SearchFormProps {
  onSearch: (filters: {
    name: string;
    categories: Category[];
    availability: Availability;
  }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [availability, setAvailability] = useState<Availability>("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ name, categories, availability });
  };

  return (
    <div className="search-form-container">
      <h2 className="search-form-title">Search Product</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <span>Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            <span>Category:</span>
            <select
              multiple
              value={categories}
              onChange={(e) =>
                setCategories(
                  Array.from(
                    e.target.selectedOptions,
                    (o) => o.value as Category
                  )
                )
              }
            >
              <option value="food">Food</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            <span>Availability:</span>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as Availability)}
            >
              <option value="all">All</option>
              <option value="inStock">In stock</option>
              <option value="outOfStock">Out of stock</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
