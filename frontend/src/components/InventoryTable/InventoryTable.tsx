import React, { useContext, useState } from "react";
import { Product } from "../../models/Product";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";
import { InventoryItem } from "../InventoryItem/InventoryItem";
import "../../styles/InventoryTable.css";

interface Props {
  //filters: { name: string; categories: Category[]; availability: Availability };
  onToggleStock: (selectedProduct: Product) => void;
}

type SortKey = keyof Product;
const PAGE_SIZE = 10;

//const InventoryTable: React.FC<Props> = ({ filters, onToggleStock }) => {
const InventoryTable: React.FC<Props> = ({ onToggleStock }) => {
  const { data, setData } = useContext(productContext) as ProductContextType;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil((data.data?.length || 0) / PAGE_SIZE);
  const paginatedProducts =
    data.data?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE) ||
    [];

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
            {["name", "category", "price", "expirationDate", "stock"].map(
              (key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as SortKey)}
                  className="cursor-pointer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  {data.filters.sortBy === key &&
                    (data.filters.sortOrder === "asc" ? "↑" : "↓")}
                </th>
              )
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
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
