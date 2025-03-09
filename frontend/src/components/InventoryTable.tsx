import React, { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Category, Availability } from "../App";

import "../styles/InventoryTable.css";

interface Props {
  products: Product[];
  filters: { name: string; categories: Category[]; availability: Availability };
  onToggleStock: (productId: number) => void; // nuevo handler para modificar stock
}

type SortKey = keyof Product;

const PAGE_SIZE = 10;

const InventoryTable: React.FC<Props> = ({
  products,
  filters,
  onToggleStock,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    let result = products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category.toLowerCase() as Category);
      const matchesAvailability =
        filters.availability === "all" ||
        (filters.availability === "inStock" && product.stock > 0) ||
        (filters.availability === "outOfStock" && product.stock === 0);
      return matchesName && matchesCategory && matchesAvailability;
    });

    result = result.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, filters, sortKey, sortOrder]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    const isSameColumn = key === sortKey;
    setSortKey(key);
    setSortOrder(isSameColumn && sortOrder === "asc" ? "desc" : "asc");
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

  const getStockCellClass = (stock: number) => {
    if (stock < 5) {
      return "bg-danger text-white fw-bold"; // Rojo
    } else if (stock >= 5 && stock <= 10) {
      return "bg-warning"; // Naranja
    } else {
      return ""; // Sin color
    }
  };

  return (
    <div className="inventory-table">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>
              <input type="checkbox" disabled />
            </th>
            {["name", "category", "price", "expirationDate", "stock"].map(
              (key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as SortKey)}
                  className="cursor-pointer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  {sortKey === key && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              )
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => {
            const rowClass = getRowClass(product.expirationDate);
            const stockCellClass = getStockCellClass(product.stock);
            const isOutOfStock = product.stock === 0;

            return (
              <tr key={product.id} className={rowClass}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={isOutOfStock}
                    onChange={() => onToggleStock(product.id)}
                  />
                </td>
                <td
                  className={isOutOfStock ? "text-decoration-line-through" : ""}
                >
                  {product.name}
                </td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.expirationDate || "N/A"}</td>
                <td className={stockCellClass}>{product.stock}</td>
                <td>
                  <button onClick={() => alert(`Edit ${product.name}`)}>
                    Edit
                  </button>
                  <button onClick={() => alert(`Delete ${product.name}`)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "font-bold" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;
