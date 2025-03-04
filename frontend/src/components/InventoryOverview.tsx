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
    <div
      style={{ border: "1px solid black", padding: "16px", marginTop: "16px" }}
    >
      <table style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Products in Stock</th>
            <th>Total Value in Stock</th>
            <th>Average Price in Stock</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const { totalProducts, totalValue, averagePrice } =
              calculateCategoryStats(category);
            return (
              <tr key={category}>
                <td>{category}</td>
                <td>{totalProducts}</td>
                <td>${totalValue.toFixed(2)}</td>
                <td>${averagePrice.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr style={{ fontWeight: "bold" }}>
            <td>Overall</td>
            <td>{overallStats.totalProducts}</td>
            <td>${overallStats.totalValue.toFixed(2)}</td>
            <td>${averagePriceOverall.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryOverview;
