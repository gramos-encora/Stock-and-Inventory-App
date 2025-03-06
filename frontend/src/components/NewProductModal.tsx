import React, { useState } from "react";
import { Product } from "../models/Product";
import "../styles/modal.css";

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
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="food">Food</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </label>

          <label>
            <span>Stock:</span>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </label>

          <label>
            <span>Unit Price:</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>

          <label>
            <span>Expiration Date:</span>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </label>

          <div className="buttons">
            <button type="button" onClick={onClose} className="button">
              Cancel
            </button>
            <button type="submit" className="button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
