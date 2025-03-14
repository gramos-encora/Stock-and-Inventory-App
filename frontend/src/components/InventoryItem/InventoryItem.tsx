import React, { use, useState } from "react";
import { Product } from "../../models/Product";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";
import { deleteProduct } from "../../utils/NetworkManager";
import { getRowClass, getStockCellClass } from "../../utils/TableColoring";
import ProductModal from "../ProductModal/ProductModal"; // Importa el modal

interface Props {
  product: Product;
  onToggleStock: (selectedProduct: Product) => void; // nuevo handler para modificar stock
}

export const InventoryItem = ({ product, onToggleStock }: Props) => {
  const { getProducts, data, getStats } = use(
    productContext
  ) as ProductContextType;

  const rowClass = getRowClass(product.expirationDate);
  const stockCellClass = getStockCellClass(product.stock);
  const isOutOfStock = product.stock === 0;

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal

  const handleEditClick = (product: Product) => {
    setIsModalOpen(true); // Muestra el modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setIsModalOpen(false); // Cierra el modal
    getProducts({});
    getStats();
  };

  const handleDeleteProduct = async (product: Product) => {
    await deleteProduct(product.id);
    getProducts({});
    getStats();
  };

  return (
    <>
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
          <button onClick={() => handleEditClick(product)}>Edit</button>
          <button onClick={() => handleDeleteProduct(product)}>Delete</button>
        </td>
      </tr>

      {/* Mostrar el modal cuando el estado isModalOpen sea true */}
      {isModalOpen && (
        <ProductModal
          onClose={handleModalClose}
          onSave={handleSaveProduct}
          productToEdit={product}
        />
      )}
    </>
  );
};
