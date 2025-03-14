package com.inventory_system.backend;

import com.inventory_system.backend.dto.ProductDTO;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ProductDTOTests {

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
        ProductDTO product = new ProductDTO(id, name, category, price, expirationDate, stock, LocalDate.now(), LocalDate.now());

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
        ProductDTO productDto = new ProductDTO(null, null, null, 0, null, 0,null,null);
        Long id = 2L;
        String name = "Updated Product";
        String category = "Updated Category";
        int price = 200;
        LocalDate expirationDate = LocalDate.of(2026, 6, 30);
        int stock = 20;
        LocalDate creationDate = LocalDate.of(2023, 1, 1);
        LocalDate updateDate = LocalDate.of(2023, 2, 1);

        // Act
        productDto.setId(id);
        productDto.setName(name);
        productDto.setCategory(category);
        productDto.setPrice(price);
        productDto.setExpirationDate(expirationDate);
        productDto.setStock(stock);
        productDto.setCreationDate(creationDate);
        productDto.setUpdateDate(updateDate);

        // Assert
        assertEquals(id, productDto.getId());
        assertEquals(name, productDto.getName());
        assertEquals(category, productDto.getCategory());
        assertEquals(price, productDto.getPrice());
        assertEquals(expirationDate, productDto.getExpirationDate());
        assertEquals(stock, productDto.getStock());
        assertEquals(creationDate, productDto.getCreationDate());
        assertEquals(updateDate, productDto.getUpdateDate());
    }

    @Test
    void creationDateAndUpdateDateShouldBeSetOnConstruction() {
        // Arrange
        Long id = 1L;
        String name = "Test Product";
        String category = "Test Category";
        int price = 100;
        LocalDate expirationDate = LocalDate.of(2025, 12, 31);
        int stock = 10;

        // Act
        ProductDTO product = new ProductDTO(id, name, category, price, expirationDate, stock, LocalDate.now(), LocalDate.now());

        // Assert
        LocalDate today = LocalDate.now();
        assertEquals(today, product.getCreationDate());
        assertEquals(today, product.getUpdateDate());
    }

    @Test
    void priceAndStockShouldAcceptZeroValues() {
        // Arrange
        Long id = 1L;
        String name = "Test Product";
        String category = "Test Category";
        int price = 0;
        LocalDate expirationDate = LocalDate.of(2025, 12, 31);
        int stock = 0;

        // Act
        ProductDTO product = new ProductDTO(id, name, category, price, expirationDate, stock, LocalDate.now(), LocalDate.now());

        // Assert
        assertEquals(0, product.getPrice());
        assertEquals(0, product.getStock());
    }
}