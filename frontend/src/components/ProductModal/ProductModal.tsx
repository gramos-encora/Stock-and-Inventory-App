import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../../utils/NetworkManager";
import { Product } from "../../models/Product";
import "../../styles/modal.css";

interface Props {
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

const ProductModal: React.FC<Props> = ({ onClose, onSave, productToEdit }) => {
  const isEditing = !!productToEdit;

  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    category: "food",
    stock: 0,
    price: 0,
    expirationDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productToEdit) {
      // Verifica si productToEdit tiene un 'id' válido
      const { id, ...productWithoutId } = productToEdit;
      // No alteres el 'id', solo lo omitimos para evitar que sea editado en el formulario
      setFormData(productWithoutId);
    } else {
      setFormData({
        name: "",
        category: "food",
        stock: 0,
        price: 0,
        expirationDate: "",
      });
    }
  }, [productToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Si estamos editando, pasamos el 'id' junto con los datos del formulario
      const savedProduct = isEditing
        ? await updateProduct(productToEdit?.id, {
            ...formData,
            id: productToEdit?.id,
          })
        : await createProduct(formData);

      onSave(savedProduct); // Llamamos a la función de guardado
      onClose(); // Cerramos el modal
    } catch (err) {
      setError(
        `Failed to ${
          isEditing ? "update" : "create"
        } product. Please try again.`
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Category:</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
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
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </label>

          <label>
            <span>Unit Price:</span>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>

          <label>
            <span>Expiration Date:</span>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
            />
          </label>

          <div className="buttons">
            <button
              type="button"
              onClick={onClose}
              className="button"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="button" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
