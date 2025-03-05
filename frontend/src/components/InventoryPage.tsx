import React, { useState, useEffect } from "react";
import InventoryTable from "./InventoryTable";
import InventoryOverview from "./InventoryOverview";
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

  // Calcular overview dinámico (puede ser una función o efecto)
  const overview = {
    totalProducts: products.length,
    inStock: products.filter((p) => p.stock > 0).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  return (
    <div className="inventory-page">
      {/* Tabla de productos con paginación, sorting y filtros aplicados */}
      <InventoryTable
        products={products}
        filters={filters}
        onToggleStock={handleToggleStock}
      />

      {/* Resumen general */}
      <InventoryOverview products={products} />
    </div>
  );
};

export default InventoryPage;
