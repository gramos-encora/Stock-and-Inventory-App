import React, { useState, useEffect, use } from "react";
import InventoryTable from "./InventoryTable";
import InventoryOverview from "./InventoryOverview";
import NewProductModal from "./NewProductModal";
import { Product } from "../models/Product";
import { Category, Availability } from "../App";
import { markInStock, markOutOfStock } from "../utils/NetworkManager";

import "../styles/InventoryPage.css";
import { productContext, ProductContextType } from "../context/productsContext";

interface Props {
  products: Product[];
  filters: { name: string; categories: Category[]; availability: Availability };
}

const InventoryPage: React.FC<Props> = ({
  products: initialProducts,
  filters,
}) => {
  const { getProducts, data, setData } = use(
    productContext
  ) as ProductContextType;

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Actualiza productos si el padre (App) resetea el listado inicial.
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Handler para cambiar el stock cuando se activa/desactiva checkbox
  const handleToggleStock = async (selectedProduct: Product) => {
    try {
      if (selectedProduct.stock === 0) {
        await markInStock(selectedProduct.id);
      } else {
        await markOutOfStock(selectedProduct.id);
      }
    } catch (error) {
    } finally {
      getProducts({});
    }
  };

  // Handler para agregar un nuevo producto desde el modal
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    setIsModalOpen(false); // Cerrar modal después de guardar
  };

  return (
    <div className="inventory-page">
      {/* Encabezado con botón para agregar producto */}
      <div className="inventory-header">
        <button onClick={() => setIsModalOpen(true)}>New Product</button>
      </div>
      <h2>Product Inventory</h2>
      {/* Tabla de productos con paginación, sorting y filtros aplicados */}
      <InventoryTable
        products={products}
        filters={filters}
        onToggleStock={handleToggleStock}
      />

      {/* Resumen general */}

      <InventoryOverview products={products} />

      {/* Modal para añadir nuevo producto */}
      {isModalOpen && (
        <NewProductModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
};

export default InventoryPage;
