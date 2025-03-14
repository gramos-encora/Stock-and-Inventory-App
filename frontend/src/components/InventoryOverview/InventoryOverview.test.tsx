import React from "react";
import { render, screen } from "@testing-library/react";
import { productContext } from "../../context/productsContext";
import InventoryOverview from "./InventoryOverview";
import { ProductContextType } from "../../context/productsContext";
import { Product } from "../../models/Product";

// Mocks de datos para el contexto
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Apple",
    category: "food",
    stock: 10,
    price: 2,
    expirationDate: "2025-12-31",
  },
  {
    id: 2,
    name: "Laptop",
    category: "electronics",
    stock: 5,
    price: 1000,
    expirationDate: "2026-06-15",
  },
  {
    id: 3,
    name: "T-Shirt",
    category: "clothing",
    stock: 20,
    price: 15,
    expirationDate: "2027-01-01",
  },
  {
    id: 4,
    name: "Banana",
    category: "food",
    stock: 15,
    price: 1,
    expirationDate: "2025-10-10",
  },
];

const mockContextValue: ProductContextType = {
  data: {
    isLoading: false,
    error: "",
    data: mockProducts,
    filters: {},
  },
  setData: jest.fn(),
  getProducts: jest.fn(),
};

describe("InventoryOverview Component", () => {
  test("renders table headers correctly", () => {
    render(
      <productContext.Provider value={mockContextValue}>
        <InventoryOverview />
      </productContext.Provider>
    );

    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Total Products in Stock")).toBeInTheDocument();
    expect(screen.getByText("Total Value in Stock")).toBeInTheDocument();
    expect(screen.getByText("Average Price in Stock")).toBeInTheDocument();
  });

  test("displays correct category totals", () => {
    render(
      <productContext.Provider value={mockContextValue}>
        <InventoryOverview />
      </productContext.Provider>
    );

    expect(screen.getByText("food")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("clothing")).toBeInTheDocument();

    // Verificar totales
    expect(screen.getByText("25")).toBeInTheDocument(); // Total food stock (10+15)
    expect(screen.getByText("5")).toBeInTheDocument(); // Total electronics stock
    expect(screen.getByText("20")).toBeInTheDocument(); // Total clothing stock
  });

  test("calculates overall totals correctly", () => {
    render(
      <productContext.Provider value={mockContextValue}>
        <InventoryOverview />
      </productContext.Provider>
    );

    // Suma total de productos en stock
    expect(screen.getByText("Overall")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument(); // (10+5+20+15)

    // Valor total en stock: (10*2) + (5*1000) + (20*15) + (15*1) = 20 + 5000 + 300 + 15 = 5335
    expect(screen.getByText("$5335.00")).toBeInTheDocument();

    // Precio promedio total = 5335 / 50 = 106.7
    expect(screen.getByText("$106.70")).toBeInTheDocument();
  });
});
