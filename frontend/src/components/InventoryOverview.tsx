import { Product, ProductListProps } from "../models/Product";

import React from "react";

const InventoryOverview: React.FC<ProductListProps> = ({ products }) => {
  // Agrupamos por categoría
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Función para calcular los totales por categoría
  const calculateCategoryStats = (category: string) => {
    const filteredProducts = products.filter((p) => p.category === category);
    const totalProducts = filteredProducts.reduce((sum, p) => sum + p.stock, 0);
    const totalValue = filteredProducts.reduce(
      (sum, p) => sum + p.stock * p.price,
      0
    );
    const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

    return { totalProducts, totalValue, averagePrice };
  };

  // Calcular totales generales
  const overallStats = products.reduce(
    (acc, product) => {
      acc.totalProducts += product.stock;
      acc.totalValue += product.stock * product.price;
      return acc;
    },
    { totalProducts: 0, totalValue: 0 }
  );

  const averagePriceOverall =
    overallStats.totalProducts > 0
      ? overallStats.totalValue / overallStats.totalProducts
      : 0;

  return (
    <div className="inventory-overview container-fluid mt-3 p-3 border rounded bg-white shadow-sm">
      <h5 className="mb-3">Inventory Overview</h5>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-light">
          <tr>
            <th>Category</th>
            <th className="text-end">Total Products in Stock</th>
            <th className="text-end">Total Value in Stock</th>
            <th className="text-end">Average Price in Stock</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const { totalProducts, totalValue, averagePrice } =
              calculateCategoryStats(category);
            return (
              <tr key={category}>
                <td>{category}</td>
                <td className="text-end">{totalProducts}</td>
                <td className="text-end">${totalValue.toFixed(2)}</td>
                <td className="text-end">${averagePrice.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr className="fw-bold table-info">
            <td>Overall</td>
            <td className="text-end">{overallStats.totalProducts}</td>
            <td className="text-end">${overallStats.totalValue.toFixed(2)}</td>
            <td className="text-end">${averagePriceOverall.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryOverview;
