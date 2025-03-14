import { fireEvent, render, screen } from "@testing-library/react";
import { InventoryItem } from "./InventoryItem";
import React from "react";
import { Product } from "../../models/Product";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";
import { deleteProduct } from "../../utils/NetworkManager";

// Mock del deleteProduct
jest.mock("../../utils/NetworkManager", () => ({
  deleteProduct: jest.fn(),
}));

describe("InventoryItem Component", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test",
    category: "food",
    stock: 5,
    price: 10,
    expirationDate: "2025-12-31",
  };

  const mockToggleStock = jest.fn();

  const mockContextValue: ProductContextType = {
    getProducts: jest.fn(), // Mock de la función getProducts
    setData: jest.fn(), // Mock de la función setData
    data: {
      isLoading: false,
      error: "",
      data: [mockProduct], // Aquí se asignan los productos correctamente
      filters: {
        name: "",
        category: "",
        availability: "all",
      },
    },
  };

  const renderComponent = () => {
    return render(
      <productContext.Provider value={mockContextValue}>
        <table>
          <tbody>
            <InventoryItem
              product={mockProduct}
              onToggleStock={mockToggleStock}
            />
          </tbody>
        </table>
      </productContext.Provider>
    );
  };

  test("Render correctly the product", () => {
    renderComponent();

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("2025-12-31")).toBeInTheDocument();
  });

  test("Checkbox working correctly", () => {
    renderComponent();

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test("If checkbox is checked, ToggleStock should be called with the product", () => {
    renderComponent();

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(mockToggleStock).toHaveBeenCalledWith(mockProduct);
  });

  test("Edit Modal should open when Edit button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Edit Product")).toBeInTheDocument(); // Título del modal
  });

  test("Call deleteProduct when Delete button is clicked", () => {
    renderComponent();

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(deleteProduct).toHaveBeenCalledWith(1);
  });
});
