import React, { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Category, Availability } from "../App";

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

  return (
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
                  onChange={() => onToggleStock(product.id)} // Aquí sí modificamos
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
                <button onClick={() => alert(`Delete ${product.name}`)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default InventoryTable;
