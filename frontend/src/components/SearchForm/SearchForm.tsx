import React, { useState, use } from "react";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";
import { ProductFilters } from "../../utils/NetworkManager";
import "../../styles/SearchForm.css";
import { Category, Availability } from "../../App";

interface SearchFormProps {
  onSearch: (filters: {
    name: string;
    categories: Category[];
    availability: Availability;
  }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<{
    name: string;
    category?: Category; // Ahora `category` puede ser `undefined`
    availability: Availability;
  }>({
    name: "",
    category: undefined,
    availability: "all",
  });

  const { data, setData } = use(productContext) as ProductContextType;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData((prev) => ({
      ...prev,
      filters: {
        ...data.filters,
        ...search,
      } as ProductFilters,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value === "" ? undefined : e.target.value,
    }));
  };

  const handleReset = () => {
    setSearch({
      name: "",
      category: undefined,
      availability: "all",
    });

    setData((prev) => ({
      ...prev,
      filters: {
        name: "",
        category: undefined,
        availability: "all",
      } as ProductFilters,
    }));
  };

  return (
    <div className="search-form-container">
      <h2 className="search-form-title">Search Product</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <span>Name:</span>
            <input
              name="name"
              type="text"
              value={search.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            <span>Category:</span>
            <select
              name="category"
              value={search.category || ""}
              onChange={handleChange}
            >
              <option value="">All</option>
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
              name="availability"
              value={search.availability}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="inStock">In stock</option>
              <option value="outOfStock">Out of stock</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
