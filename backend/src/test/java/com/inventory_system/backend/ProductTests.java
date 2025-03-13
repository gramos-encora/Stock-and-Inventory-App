package com.inventory_system.backend;

import com.inventory_system.backend.entity.Product;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ProductTests {

    @Test
    void constructorShouldInitializeAllFields() {
        // Arrange
        Long id = 1L;
        String name = "Test Product";
        String category = "Test Category";
        int price = 100;
        LocalDate expirationDate = LocalDate.of(2025, 12, 31);
        int stock = 10;

        // Act
        Product product = new Product(id, name, category, price, expirationDate, stock);

        // Assert
        assertEquals(id, product.getId());
        assertEquals(name, product.getName());
        assertEquals(category, product.getCategory());
        assertEquals(price, product.getPrice());
        assertEquals(expirationDate, product.getExpirationDate());
        assertEquals(stock, product.getStock());
        assertEquals(LocalDate.now(), product.getCreationDate());
        assertEquals(LocalDate.now(), product.getUpdateDate());
    }

    @Test
    void gettersAndSettersShouldWorkAsExpected() {
        // Arrange
        Product product = new Product(null, null, null, 0, null, 0);
        Long id = 2L;
        String name = "Updated Product";
        String category = "Updated Category";
        int price = 200;
        LocalDate expirationDate = LocalDate.of(2026, 6, 30);
        int stock = 20;
        LocalDate creationDate = LocalDate.of(2023, 1, 1);
        LocalDate updateDate = LocalDate.of(2023, 2, 1);

        // Act
        product.setId(id);
        product.setName(name);
        product.setCategory(category);
        product.setPrice(price);
        product.setExpirationDate(expirationDate);
        product.setStock(stock);
        product.setCreationDate(creationDate);
        product.setUpdateDate(updateDate);

        // Assert
        assertEquals(id, product.getId());
        assertEquals(name, product.getName());
        assertEquals(category, product.getCategory());
        assertEquals(price, product.getPrice());
        assertEquals(expirationDate, product.getExpirationDate());
        assertEquals(stock, product.getStock());
        assertEquals(creationDate, product.getCreationDate());
        assertEquals(updateDate, product.getUpdateDate());
    }

    @Test
    void sampleMethodShouldReturnValidProduct() {
        // Act
        Product sampleProduct = Product.sample();

        // Assert
        assertEquals(1L, sampleProduct.getId());
        assertEquals("Apple", sampleProduct.getName());
        assertEquals("food", sampleProduct.getCategory());
        assertEquals(2, sampleProduct.getPrice());
        assertEquals(15, sampleProduct.getStock());
        assertNotNull(sampleProduct.getExpirationDate());
        assertNotNull(sampleProduct.getCreationDate());
        assertNotNull(sampleProduct.getUpdateDate());
    }

    @Test
    void creationDateAndUpdateDateShouldBeSetOnConstruction() {
        // Act
        Product product = new Product(1L, "Test", "Category", 100, LocalDate.now(), 5);

        // Assert
        LocalDate today = LocalDate.now();
        assertEquals(today, product.getCreationDate());
        assertEquals(today, product.getUpdateDate());
    }

    @Test
    void priceAndStockShouldAcceptZeroValues() {
        // Act
        Product product = new Product(1L, "Zero Product", "Test", 0, LocalDate.now(), 0);

        // Assert
        assertEquals(0, product.getPrice());
        assertEquals(0, product.getStock());
    }
}