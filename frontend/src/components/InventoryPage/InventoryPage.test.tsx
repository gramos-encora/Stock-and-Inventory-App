import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InventoryPage from "./InventoryPage";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";
import { Product } from "../../models/Product";
import { Category, Availability } from "../../App";

// Mock de productos iniciales
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop",
    category: "electronics",
    stock: 10,
    price: 1000,
    expirationDate: "2025-12-31",
  },
  {
    id: 2,
    name: "Apple",
    category: "food",
    stock: 5,
    price: 2,
    expirationDate: "2024-06-15",
  },
];

// Mock del contexto
const mockContextValue: ProductContextType = {
  data: {
    isLoading: false,
    error: "",
    data: [],
    filters: {},
    stats: [],
  },
  getProducts: jest.fn(),
  setData: jest.fn(),
  getStats: jest.fn(),
};

describe("InventoryPage Component", () => {
  beforeEach(() => {
    render(
      <productContext.Provider value={mockContextValue}>
        <InventoryPage
          products={mockProducts}
          filters={{ name: "", categories: [], availability: "all" }}
        />
      </productContext.Provider>
    );
  });

  test("renders InventoryTable and InventoryOverview", () => {
    expect(screen.getByText("Product Inventory")).toBeInTheDocument();
    expect(screen.getByText("Inventory Overview")).toBeInTheDocument();
  });

  test("opens modal when clicking 'New Product'", () => {
    const newProductButton = screen.getByText("New Product");
    fireEvent.click(newProductButton);
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  test("closes modal when saving a new product", async () => {
    const newProductButton = screen.getByText("New Product");
    fireEvent.click(newProductButton);

    // Simular que el producto se ha guardado y el modal se cierra
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText("Add New Product")).not.toBeInTheDocument();
    });
  });
});
