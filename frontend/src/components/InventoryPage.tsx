import React, { useState, useEffect } from "react";
import InventoryTable from "./InventoryTable";
import InventoryOverview from "./InventoryOverview";
import NewProductModal from "./NewProductForm";
import { Product } from "../models/Product";
import { Category, Availability } from "../App";

interface Props {
  products: Product[];
  filters: { name: string; categories: Category[]; availability: Availability };
}

const InventoryPage: React.FC<Props> = ({
  products: initialProducts,
  filters,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Actualiza productos si el padre (App) resetea el listado inicial.
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Handler para cambiar el stock cuando se activa/desactiva checkbox
  const handleToggleStock = (productId: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, stock: product.stock === 0 ? 10 : 0 }
          : product
      )
    );
  };

  // Handler para agregar un nuevo producto desde el modal
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    setIsModalOpen(false); // Cerrar modal después de guardar
  };

  return (
    <div className="inventory-page">
      {/* Encabezado con botón para agregar producto */}
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-xl font-bold">Product Inventory</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          New Product
        </button>
      </div>

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
