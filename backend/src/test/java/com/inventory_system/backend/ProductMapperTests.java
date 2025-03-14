package com.inventory_system.backend;

import com.inventory_system.backend.dto.ProductDTO;
import com.inventory_system.backend.entity.Product;
import com.inventory_system.backend.mapper.ProductMapper;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ProductMapperTests {

    @Test
    void mapToProductDtoShouldCorrectlyMapAllFields() {
        // Arrange
        Long id = 1L;
        String name = "Test Product";
        String category = "Test Category";
        int price = 100;
        LocalDate expirationDate = LocalDate.of(2025, 12, 31);
        int stock = 10;
        LocalDate creationDate = LocalDate.of(2023, 1, 1);
        LocalDate updateDate = LocalDate.of(2023, 2, 1);

        Product product = new Product(id, name, category, price, expirationDate, stock);

        // Need to set these explicitly as they're initialized with LocalDate.now() in constructor
        product.setCreationDate(creationDate);
        product.setUpdateDate(updateDate);

        // Act
        ProductDTO productDTO = ProductMapper.mapToProductDto(product);

        // Assert
        assertEquals(id, productDTO.getId());
        assertEquals(name, productDTO.getName());
        assertEquals(category, productDTO.getCategory());
        assertEquals(price, productDTO.getPrice());
        assertEquals(expirationDate, productDTO.getExpirationDate());
        assertEquals(stock, productDTO.getStock());
        assertEquals(creationDate, productDTO.getCreationDate());
        assertEquals(updateDate, productDTO.getUpdateDate());
    }

    @Test
    void mapToProductShouldCorrectlyMapRequiredFields() {
        // Arrange
        Long id = 2L;
        String name = "DTO Product";
        String category = "DTO Category";
        int price = 200;
        LocalDate expirationDate = LocalDate.of(2026, 6, 30);
        int stock = 20;
        LocalDate creationDate = LocalDate.of(2024, 1, 1);
        LocalDate updateDate = LocalDate.of(2024, 2, 1);

        ProductDTO productDTO = new ProductDTO(id, name, category, price, expirationDate, stock, creationDate, updateDate);

        // Act
        Product product = ProductMapper.mapToProduct(productDTO);

        // Assert
        assertEquals(id, product.getId());
        assertEquals(name, product.getName());
        assertEquals(category, product.getCategory());
        assertEquals(price, product.getPrice());
        assertEquals(expirationDate, product.getExpirationDate());
        assertEquals(stock, product.getStock());

        // These fields are set by the Product constructor, not from DTO
        assertNotEquals(creationDate, product.getCreationDate());
        assertNotEquals(updateDate, product.getUpdateDate());

        // They should be set to the current date instead
        LocalDate today = LocalDate.now();
        assertEquals(today, product.getCreationDate());
        assertEquals(today, product.getUpdateDate());
    }

    @Test
    void shouldHandleNullValues() {
        // Arrange
        Product nullProduct = null;
        ProductDTO nullDTO = null;

        // Act & Assert
        assertThrows(NullPointerException.class, () -> ProductMapper.mapToProductDto(nullProduct));
        assertThrows(NullPointerException.class, () -> ProductMapper.mapToProduct(nullDTO));
    }

    @Test
    void shouldHandleProductWithNullFields() {
        // Arrange
        Product product = new Product(null, null, null, 0, null, 0);
        LocalDate today = LocalDate.now();

        // Act
        ProductDTO productDTO = ProductMapper.mapToProductDto(product);

        // Assert
        assertNull(productDTO.getId());
        assertNull(productDTO.getName());
        assertNull(productDTO.getCategory());
        assertEquals(0, productDTO.getPrice());
        assertNull(productDTO.getExpirationDate());
        assertEquals(0, productDTO.getStock());
        assertEquals(today, productDTO.getCreationDate());
        assertEquals(today, productDTO.getUpdateDate());
    }

    @Test
    void shouldHandleDTOWithNullFields() {
        // Arrange
        ProductDTO productDTO = new ProductDTO(null, null, null, 0, null, 0, null, null);

        // Act
        Product product = ProductMapper.mapToProduct(productDTO);

        // Assert
        assertNull(product.getId());
        assertNull(product.getName());
        assertNull(product.getCategory());
        assertEquals(0, product.getPrice());
        assertNull(product.getExpirationDate());
        assertEquals(0, product.getStock());

        // These are always set by the constructor
        assertNotNull(product.getCreationDate());
        assertNotNull(product.getUpdateDate());
    }
}