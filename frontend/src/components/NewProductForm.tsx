import React, { useState } from "react";
import { Product } from "../models/Product";
import "../App.css";

type Category = "food" | "electronics" | "clothing";

interface Props {
  onClose: () => void;
  onSave: (product: Product) => void;
}

const NewProductModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("food");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now(),
      name,
      category,
      stock,
      price,
      expirationDate,
    };

    onSave(newProduct);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 className="text-lg font-bold mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex justify-between items-center">
            <span className="w-24">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1 flex-1"
              required
            />
          </label>

          <label className="flex justify-between items-center">
            <span className="w-24">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="border p-1 flex-1"
            >
              <option value="food">Food</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </label>

          <label className="flex justify-between items-center">
            <span className="w-24">Stock:</span>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="border p-1 flex-1"
            />
          </label>

          <label className="flex justify-between items-center">
            <span className="w-24">Unit Price:</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border p-1 flex-1"
            />
          </label>

          <label className="flex justify-between items-center">
            <span className="w-24">Expiration Date:</span>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="border p-1 flex-1"
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-black px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
