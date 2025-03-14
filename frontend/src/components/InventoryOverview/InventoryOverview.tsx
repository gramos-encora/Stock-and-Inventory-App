import React, { useContext } from "react";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";

const InventoryOverview: React.FC = () => {
  // 🔹 Obtener las estadísticas desde el contexto
  const {
    data: { stats },
  } = useContext(productContext) as ProductContextType;

  // 🔹 Calcular totales generales
  const overallStats = stats.reduce(
    (acc, category) => {
      acc.totalProducts += category.totalProducts;
      acc.totalValue += category.totalValue;
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
          {stats.map(
            ({ category, totalProducts, totalValue, averagePrice }) => (
              <tr key={category}>
                <td>{category}</td>
                <td className="text-end">{totalProducts}</td>
                <td className="text-end">${totalValue.toFixed(2)}</td>
                <td className="text-end">${averagePrice.toFixed(2)}</td>
              </tr>
            )
          )}
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
