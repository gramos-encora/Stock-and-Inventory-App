import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductModal from "./ProductModal";
import { Product } from "../../models/Product";

describe("ProductModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  test("renders correctly when adding a new product", () => {
    render(<ProductModal onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toHaveValue("");
    expect(screen.getByLabelText(/Category:/i)).toHaveValue("food");
    expect(screen.getByLabelText(/Stock:/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Unit Price:/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Expiration Date:/i)).toHaveValue("");
  });

  test("renders correctly when editing an existing product", () => {
    const existingProduct: Product = {
      id: 1,
      name: "Laptop",
      category: "electronics",
      stock: 10,
      price: 999.99,
      expirationDate: "2025-12-31",
    };

    render(
      <ProductModal
        onClose={mockOnClose}
        onSave={mockOnSave}
        productToEdit={existingProduct}
      />
    );

    expect(screen.getByText("Edit Product")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toHaveValue("Laptop");
    expect(screen.getByLabelText(/Category:/i)).toHaveValue("electronics");
    expect(screen.getByLabelText(/Stock:/i)).toHaveValue(10);
    expect(screen.getByLabelText(/Unit Price:/i)).toHaveValue(999.99);
    expect(screen.getByLabelText(/Expiration Date:/i)).toHaveValue(
      "2025-12-31"
    );
  });

  test("updates state when input values change", () => {
    render(<ProductModal onClose={mockOnClose} onSave={mockOnSave} />);

    const nameInput = screen.getByLabelText(/Name:/i);
    fireEvent.change(nameInput, { target: { value: "Smartphone" } });
    expect(nameInput).toHaveValue("Smartphone");

    const categorySelect = screen.getByLabelText(/Category:/i);
    fireEvent.change(categorySelect, { target: { value: "clothing" } });
    expect(categorySelect).toHaveValue("clothing");

    const stockInput = screen.getByLabelText(/Stock:/i);
    fireEvent.change(stockInput, { target: { value: 20 } });
    expect(stockInput).toHaveValue(20);

    const priceInput = screen.getByLabelText(/Unit Price:/i);
    fireEvent.change(priceInput, { target: { value: 49.99 } });
    expect(priceInput).toHaveValue(49.99);

    const dateInput = screen.getByLabelText(/Expiration Date:/i);
    fireEvent.change(dateInput, { target: { value: "2026-01-01" } });
    expect(dateInput).toHaveValue("2026-01-01");
  });

  test("calls onClose when clicking Cancel", () => {
    render(<ProductModal onClose={mockOnClose} onSave={mockOnSave} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
