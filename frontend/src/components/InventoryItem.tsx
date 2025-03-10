import React, { use } from "react";
import { Product } from "../models/Product";
import { productContext, ProductContextType } from "../context/productsContext";
import { deleteProduct } from "../utils/NetworkManager";
import { getRowClass, getStockCellClass } from "../utils/TableColoring";

interface Props {
  product: Product;
  onToggleStock: (selectedProduct: Product) => void; // nuevo handler para modificar stock
}

export const InventoryItem = ({ product, onToggleStock }: Props) => {
  // Mover a utils
  const { getProducts, data, setData } = use(
    productContext
  ) as ProductContextType;

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
