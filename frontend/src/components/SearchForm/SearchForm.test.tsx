import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  productContext,
  ProductContextType,
} from "../../context/productsContext";
import SearchForm from "./SearchForm";

describe("SearchForm Component", () => {
  const mockContextValue: ProductContextType = {
    getProducts: jest.fn(), // Mock de la función getProducts
    setData: jest.fn(), // Mock de la función setData
    getStats: jest.fn(),
    data: {
      isLoading: false,
      error: "",
      data: [], // Aquí se asignan los productos correctamente
      filters: {
        name: "",
        category: "",
        availability: "all",
      },
      stats: [],
    },
  };

  beforeEach(() => {
    render(
      <productContext.Provider value={mockContextValue}>
        <SearchForm onSearch={jest.fn()} />
      </productContext.Provider>
    );
  });

  test("Updates 'name' input when user types", () => {
    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Laptop" } });
    expect(nameInput.value).toBe("Laptop");
  });

  test("Updates 'category' when user selects an option", () => {
    const categorySelect = screen.getByLabelText(
      /Category:/i
    ) as HTMLSelectElement;
    fireEvent.change(categorySelect, { target: { value: "electronics" } });
    expect(categorySelect.value).toBe("electronics");
  });

  test("Updates 'availability' when user selects an option", () => {
    const availabilitySelect = screen.getByLabelText(
      /Availability:/i
    ) as HTMLSelectElement;
    fireEvent.change(availabilitySelect, { target: { value: "inStock" } });
    expect(availabilitySelect.value).toBe("inStock");
  });

  test("Resets all fields when 'Reset' button is clicked", () => {
    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    const categorySelect = screen.getByLabelText(
      /Category:/i
    ) as HTMLSelectElement;
    const availabilitySelect = screen.getByLabelText(
      /Availability:/i
    ) as HTMLSelectElement;

    fireEvent.change(nameInput, { target: { value: "Laptop" } });
    fireEvent.change(categorySelect, { target: { value: "electronics" } });
    fireEvent.change(availabilitySelect, { target: { value: "inStock" } });

    fireEvent.click(screen.getByText("Reset"));

    expect(nameInput.value).toBe("");
    expect(categorySelect.value).toBe("");
    expect(availabilitySelect.value).toBe("all");
  });
});
