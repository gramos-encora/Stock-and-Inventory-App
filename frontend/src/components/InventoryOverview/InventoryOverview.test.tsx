import React from "react";
import { render, screen } from "@testing-library/react";
import { productContext } from "../../context/productsContext";
import InventoryOverview from "./InventoryOverview";
import { ProductContextType } from "../../context/productsContext";

const mockStats = [
  {
    category: "electronics",
    totalProducts: 10,
    totalValue: 5000,
    averagePrice: 500,
  },
  {
    category: "clothing",
    totalProducts: 20,
    totalValue: 3000,
    averagePrice: 150,
  },
];

const mockContextValue: ProductContextType = {
  data: {
    isLoading: false,
    error: "",
    data: [],
    filters: {},
    stats: mockStats,
  },
  setData: jest.fn(),
  getProducts: jest.fn(),
  getStats: jest.fn(),
};

const renderWithContext = () =>
  render(
    <productContext.Provider value={mockContextValue}>
      <InventoryOverview />
    </productContext.Provider>
  );

describe("InventoryOverview Component", () => {
  test("renders Inventory Overview title", () => {
    renderWithContext();
    expect(screen.getByText(/Inventory Overview/i)).toBeInTheDocument();
  });

  test("displays category statistics correctly", () => {
    renderWithContext();

    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("$5000.00")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();

    expect(screen.getByText("clothing")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("$3000.00")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
  });

  test("calculates overall statistics correctly", () => {
    renderWithContext();

    const totalProductsOverall = mockStats.reduce(
      (acc, c) => acc + c.totalProducts,
      0
    );
    const totalValueOverall = mockStats.reduce(
      (acc, c) => acc + c.totalValue,
      0
    );
    const averagePriceOverall = totalProductsOverall
      ? totalValueOverall / totalProductsOverall
      : 0;

    expect(screen.getByText("Overall")).toBeInTheDocument();
    expect(screen.getByText(`${totalProductsOverall}`)).toBeInTheDocument();
    expect(
      screen.getByText(`$${totalValueOverall.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`$${averagePriceOverall.toFixed(2)}`)
    ).toBeInTheDocument();
  });
});
