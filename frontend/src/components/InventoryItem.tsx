import React, { use } from "react";
import { Product } from "../models/Product";
import { productContext, ProductContextType } from "../context/productsContext";
import { deleteProduct } from "../utils/NetworkManager";

interface Props {
  product: Product;
  onToggleStock: (selectedProduct: Product) => void; // nuevo handler para modificar stock
}

export const InventoryItem = ({ product, onToggleStock }: Props) => {
  // Mover a utils
  const { getProducts, data, setData } = use(
    productContext
  ) as ProductContextType;

  const getStockCellClass = (stock: number) => {
    if (stock < 5) {
      return "bg-danger text-white fw-bold"; // Rojo
    } else if (stock >= 5 && stock <= 10) {
      return "bg-warning"; // Naranja
    } else {
      return ""; // Sin color
    }
  };

  const getRowClass = (expirationDate: string | null) => {
    if (!expirationDate) return "";
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffInDays = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 0) {
      return "table-danger"; // Expirado
    } else if (diffInDays <= 7) {
      return "table-danger"; // Menos de 1 semana
    } else if (diffInDays <= 14) {
      return "table-warning"; // Entre 1 y 2 semanas
    } else {
      return "table-success"; // Más de 2 semanas
    }
  };

  const rowClass = getRowClass(product.expirationDate);
  const stockCellClass = getStockCellClass(product.stock);
  const isOutOfStock = product.stock === 0;
  return (
    <tr className={rowClass}>
      <td className="text-center">
        <input
          type="checkbox"
          checked={isOutOfStock}
          onChange={() => onToggleStock(product)}
          disabled={data.isLoading}
        />
      </td>
      <td className={isOutOfStock ? "text-decoration-line-through" : ""}>
        {product.name}
      </td>
      <td>{product.category}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.expirationDate || "N/A"}</td>
      <td className={stockCellClass}>{product.stock}</td>
      <td>
        <button onClick={() => alert(`Edit ${product.name}`)}>Edit</button>
        <button
          onClick={() => {
            alert(`Delete ${product.name}`);
            deleteProduct(product.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
