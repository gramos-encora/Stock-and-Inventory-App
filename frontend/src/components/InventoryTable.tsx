import React, { use, useContext, useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Category, Availability } from "../App";
import { deleteProduct } from "../utils/NetworkManager";

import { productContext, ProductContextType } from "../context/productsContext";
import { InventoryItem } from "./InventoryItem";
import "../styles/InventoryTable.css";

interface Props {
  products: Product[];
  filters: { name: string; categories: Category[]; availability: Availability };
  onToggleStock: (selectedProduct: Product) => void; // nuevo handler para modificar stock
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

  const { getProducts, data, setData } = use(
    productContext
  ) as ProductContextType;

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

  const handleSort = async (key: SortKey) => {
    const isSameColumn = key === sortKey;
    const sortOrderNewValue =
      isSameColumn && sortOrder === "asc" ? "desc" : "asc";
    setData((prev) => ({
      ...prev,
      filters: { sortBy: key as any, sortOrder: sortOrderNewValue },
    }));
    // await getProducts();
    setSortKey(key);
    setSortOrder(sortOrderNewValue);
  };

  return (
    <div className="inventory-table">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>
              <input type="checkbox" disabled />
            </th>
            {/* price=asc */}
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
          {data.data?.map((product) => (
            <InventoryItem
              key={product.id}
              product={product}
              onToggleStock={onToggleStock}
            />
          ))}
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
