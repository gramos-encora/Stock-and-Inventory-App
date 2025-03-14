import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InventoryTable from "./InventoryTable";
import { Product } from "../../models/Product";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";

describe("InventoryTable Component", () => {
  const mockOnToggleStock = jest.fn();
  const mockSetData = jest.fn();

  const mockContextValue: ProductContextType = {
    getProducts: jest.fn(), // Mock de la función getProducts
    setData: mockSetData, // Mock de la función setData
    getStats: jest.fn(),
    data: {
      isLoading: false,
      error: "",
      data: [
        {
          id: 1,
          name: "Laptop",
          category: "electronics",
          price: 999,
          stock: 5,
          expirationDate: "2025-12-31",
        },
        {
          id: 2,
          name: "Shirt",
          category: "clothing",
          price: 29,
          stock: 20,
          expirationDate: "2026-01-15",
        },
      ],
      filters: { sortBy: "name", sortOrder: "asc" },
      stats: [],
    },
  };

  const renderWithContext = () =>
    render(
      <productContext.Provider value={mockContextValue}>
        <InventoryTable onToggleStock={mockOnToggleStock} />
      </productContext.Provider>
    );

  test("renders table headers and products", () => {
    renderWithContext();

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("ExpirationDate")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Shirt")).toBeInTheDocument();
  });

  test("pagination buttons work correctly", () => {
    renderWithContext();

    const nextButton = screen.getByText("»");
    fireEvent.click(nextButton);
    expect(screen.getByText("1")).toHaveClass("font-bold");
  });
});
