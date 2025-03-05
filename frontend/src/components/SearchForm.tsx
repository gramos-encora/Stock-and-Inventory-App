import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <select
        multiple
        value={categories}
        onChange={(e) =>
          setCategories(
            Array.from(e.target.selectedOptions, (o) => o.value as Category)
          )
        }
      >
        <option value="food">Food</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value as Availability)}
      >
        <option value="all">All</option>
        <option value="inStock">In stock</option>
        <option value="outOfStock">Out of stock</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
