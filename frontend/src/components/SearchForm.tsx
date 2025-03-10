import React, { useState, use } from "react";
import { productContext, ProductContextType } from "../context/productsContext";
import { ProductFilters } from "../utils/NetworkManager";
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
  // const [name, setName] = useState('');
  // const [categories, setCategories] = useState<Category[]>([]);
  // const [availability, setAvailability] = useState<Availability>('all');

  const [search, setSearch] = useState({
    name: "",
    category: "food",
    availability: "all",
  });

  const { data, setData } = use(productContext) as ProductContextType;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData((prev) => ({
      ...prev,
      filters: {
        ...data.filters,
        // name: search.name,
        // availability: search.availability,
        // category:search.categories
        ...search,
      } as ProductFilters,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("Select", e);
    console.log("Name:", e.target.name);
    console.log("Value:", e.target.value);

    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // setSearch((prev) => ({
    //   ...prev,
    //   name: e.target.value,
    //   availability: e.target.value,
    //   categories: e.target.value,
    // }));
  };

  console.log(search);

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
              // multiple
              name="category"
              value={search.category}
              onChange={handleChange}
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
              name="availability"
              value={search.availability}
              onChange={handleChange}

              // onChange={(e) => setAvailability(e.target.value as Availability)}
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
