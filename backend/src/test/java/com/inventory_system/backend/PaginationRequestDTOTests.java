package com.inventory_system.backend;

import com.inventory_system.backend.dto.PaginationRequestDTO;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PaginationRequestDTOTests {

    @Test
    void defaultConstructorShouldCreateEmptyObject() {
        // Act
        PaginationRequestDTO dto = new PaginationRequestDTO();

        // Assert
        assertEquals(0, dto.getPage());
        assertEquals(0, dto.getSize());
        assertNull(dto.getSortBy());
        assertNull(dto.getSortOrder());
        assertNull(dto.getStock());
        assertNull(dto.getCategory());
        assertNull(dto.getSearch());
    }

    @Test
    void parameterizedConstructorShouldInitializeAllFields() {
        // Arrange
        int page = 1;
        int size = 10;
        String sortBy = "name";
        String sortOrder = "asc";
        String stock = "inStock";
        String category = "electronics";
        String search = "laptop";

        // Act
        PaginationRequestDTO dto = new PaginationRequestDTO(page, size, sortBy, sortOrder, stock, category, search);

        // Assert
        assertEquals(page, dto.getPage());
        assertEquals(size, dto.getSize());
        assertEquals(sortBy, dto.getSortBy());
        assertEquals(sortOrder, dto.getSortOrder());
        assertEquals(stock, dto.getStock());
        assertEquals(category, dto.getCategory());
        assertEquals(search, dto.getSearch());
    }

    @Test
    void gettersAndSettersShouldWorkAsExpected() {
        // Arrange
        PaginationRequestDTO dto = new PaginationRequestDTO();
        int page = 2;
        int size = 20;
        String sortBy = "price";
        String sortOrder = "desc";
        String stock = "outOfStock";
        String category = "food";
        String search = "apple";

        // Act
        dto.setPage(page);
        dto.setSize(size);
        dto.setSortBy(sortBy);
        dto.setSortOrder(sortOrder);
        dto.setStock(stock);
        dto.setCategory(category);
        dto.setSearch(search);

        // Assert
        assertEquals(page, dto.getPage());
        assertEquals(size, dto.getSize());
        assertEquals(sortBy, dto.getSortBy());
        assertEquals(sortOrder, dto.getSortOrder());
        assertEquals(stock, dto.getStock());
        assertEquals(category, dto.getCategory());
        assertEquals(search, dto.getSearch());
    }

    @Test
    void shouldHandleNullValuesForStringFields() {
        // Arrange
        PaginationRequestDTO dto = new PaginationRequestDTO(0, 0, "name", "asc", "all", "all", "test");

        // Act
        dto.setSortBy(null);
        dto.setSortOrder(null);
        dto.setStock(null);
        dto.setCategory(null);
        dto.setSearch(null);

        // Assert
        assertNull(dto.getSortBy());
        assertNull(dto.getSortOrder());
        assertNull(dto.getStock());
        assertNull(dto.getCategory());
        assertNull(dto.getSearch());
    }

    @Test
    void shouldHandleZeroAndNegativeValuesForNumericFields() {
        // Arrange
        PaginationRequestDTO dto = new PaginationRequestDTO();

        // Act & Assert - Zero values
        dto.setPage(0);
        dto.setSize(0);
        assertEquals(0, dto.getPage());
        assertEquals(0, dto.getSize());

        // Act & Assert - Negative values
        dto.setPage(-1);
        dto.setSize(-10);
        assertEquals(-1, dto.getPage());
        assertEquals(-10, dto.getSize());
    }
}