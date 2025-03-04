import React, { useState, useEffect } from "react";
import { Product } from "../models/Product";

type Props = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

type SortKey = keyof Product;

const InventoryTable: React.FC<Props> = ({ products, setProducts }) => {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const toggleStock = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock === 0 ? 10 : 0 }
          : product
      )
    );
  };

  const handleSort = (key: SortKey) => {
    const isAsc = sortKey === key && sortOrder === "asc";
    setSortKey(key);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedProducts = [...products].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <>
      <button>New product</button>
      <div className="inventory-table">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th>
                <input type="checkbox" disabled />
              </th>
              {["category", "name", "price", "expirationDate", "stock"].map(
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
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={product.stock === 0}
                    onChange={() => toggleStock(product.id)}
                  />
                </td>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.expirationDate}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => alert(`Edit ${product.name}`)}>
                    Edit
                  </button>{" "}
                  /{" "}
                  <button
                    onClick={() => {
                      setProducts(products.filter((p) => p.id !== product.id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination mt-4 flex justify-center items-center gap-2">
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
    </>
  );
};

export default InventoryTable;
