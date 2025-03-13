package com.inventory_system.backend;

import com.inventory_system.backend.dto.PaginationRequestDTO;
import com.inventory_system.backend.entity.Product;
import com.inventory_system.backend.repository.InMemoryProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class InMemoryProductRepositoryTests {

    private InMemoryProductRepository repository;
    private Product testProduct1;
    private Product testProduct2;
    private Product testProduct3;

    @BeforeEach
    void setUp() {
        repository = new InMemoryProductRepository();

        // Create test products
        testProduct1 = new Product(null, "Apple", "Food", 2, LocalDate.now().plusMonths(1), 15);
        testProduct2 = new Product(null, "Banana", "Food", 1, LocalDate.now().plusMonths(2), 20);
        testProduct3 = new Product(null, "Laptop", "Electronics", 1000, LocalDate.now().plusYears(1), 0);

        // Save products to repository
        repository.save(testProduct1);
        repository.save(testProduct2);
        repository.save(testProduct3);
    }

    @Test
    void findByIdShouldReturnProductWhenExists() {
        // Arrange
        Long productId = testProduct1.getId();

        // Act
        Optional<Product> result = repository.findById(productId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(testProduct1.getName(), result.get().getName());
    }

    @Test
    void findByIdShouldReturnEmptyOptionalWhenProductDoesNotExist() {
        // Arrange
        Long nonExistentId = 999L;

        // Act
        Optional<Product> result = repository.findById(nonExistentId);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void saveShouldAssignIdAndStoreProduct() {
        // Arrange
        Product newProduct = new Product(null, "Orange", "Food", 3, LocalDate.now().plusMonths(1), 10);

        // Act
        Product savedProduct = repository.save(newProduct);

        // Assert
        assertNotNull(savedProduct.getId());
        assertEquals(newProduct.getName(), savedProduct.getName());

        // Verify it's in the repository
        Optional<Product> retrievedProduct = repository.findById(savedProduct.getId());
        assertTrue(retrievedProduct.isPresent());
    }

    @Test
    void updateShouldModifyExistingProduct() {
        // Arrange
        Long productId = testProduct1.getId();
        Product updatedProduct = new Product(productId, "Green Apple", "Organic Food", 3,
                LocalDate.now().plusMonths(2), 25);

        // Act
        Product result = repository.update(productId, updatedProduct);

        // Assert
        assertEquals("Green Apple", result.getName());
        assertEquals("Organic Food", result.getCategory());
        assertEquals(3, result.getPrice());
        assertEquals(25, result.getStock());

        // Verify changes persisted in repository
        Optional<Product> retrievedProduct = repository.findById(productId);
        assertTrue(retrievedProduct.isPresent());
        assertEquals("Green Apple", retrievedProduct.get().getName());
    }

    @Test
    void updateShouldThrowExceptionWhenProductDoesNotExist() {
        // Arrange
        Long nonExistentId = 999L;
        Product updatedProduct = new Product(nonExistentId, "Test", "Test", 1, LocalDate.now(), 1);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            repository.update(nonExistentId, updatedProduct);
        });
    }

    @Test
    void markOutOfStockByIdShouldSetStockToZero() {
        // Arrange
        Long productId = testProduct1.getId();

        // Act
        Product result = repository.markOutOfStockById(productId);

        // Assert
        assertEquals(0, result.getStock());

        // Verify changes persisted
        Optional<Product> retrievedProduct = repository.findById(productId);
        assertTrue(retrievedProduct.isPresent());
        assertEquals(0, retrievedProduct.get().getStock());
    }

    @Test
    void markInStockByIdShouldSetStockToTen() {
        // Arrange
        Long productId = testProduct3.getId(); // This product has 0 stock

        // Act
        Product result = repository.markInStockById(productId);

        // Assert
        assertEquals(10, result.getStock());

        // Verify changes persisted
        Optional<Product> retrievedProduct = repository.findById(productId);
        assertTrue(retrievedProduct.isPresent());
        assertEquals(10, retrievedProduct.get().getStock());
    }

    @Test
    void findAllShouldReturnAllProductsWhenNoFilters() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "name", "asc", null, null, null);

        // Act
        List<Product> results = repository.findAll(request);

        // Assert
        assertEquals(3, results.size());
        assertEquals("Apple", results.get(0).getName()); // Sorted by name asc
        assertEquals("Banana", results.get(1).getName());
        assertEquals("Laptop", results.get(2).getName());
    }

    @Test
    void findAllShouldFilterByInStock() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "name", "asc", "inStock", null, null);

        // Act
        List<Product> results = repository.findAll(request);

        // Assert
        assertEquals(2, results.size());
        assertTrue(results.stream().noneMatch(p -> p.getStock() == 0));
    }

    @Test
    void findAllShouldFilterByOutOfStock() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "name", "asc", "outOfStock", null, null);

        // Act
        List<Product> results = repository.findAll(request);

        // Assert
        assertEquals(1, results.size());
        assertEquals(0, results.get(0).getStock());
        assertEquals("Laptop", results.get(0).getName());
    }

    @Test
    void findAllShouldFilterByCategory() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "name", "asc", null, "Food", null);

        // Act
        List<Product> results = repository.findAll(request);

        // Assert
        assertEquals(2, results.size());
        assertTrue(results.stream().allMatch(p -> p.getCategory().equals("Food")));
    }

    @Test
    void findAllShouldFilterBySearchQuery() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "name", "asc", null, null, "ap");

        // Act
        List<Product> results = repository.findAll(request);

        // Assert
        assertEquals(2, results.size()); // "Apple" and "Laptop" contain "app"
        assertTrue(results.stream().anyMatch(p -> p.getName().equals("Apple")));
        assertTrue(results.stream().anyMatch(p -> p.getName().equals("Laptop")));
    }

    @Test
    void findAllShouldSortByPriceDesc() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "price", "desc", null, null, null);

        // Act
        List<Product> results = repository.findAll(request);

        // Assert
        assertEquals(3, results.size());
        assertEquals("Laptop", results.get(0).getName()); // Highest price
        assertEquals("Apple", results.get(1).getName());  // 2
        assertEquals("Banana", results.get(2).getName()); // 1
    }

    @Test
    void findAllShouldThrowExceptionForInvalidSortBy() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "invalid_field", "asc", null, null, null);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            repository.findAll(request);
        });
    }

    @Test
    void deleteByIdShouldRemoveProductFromRepository() {
        // Arrange
        Long productId = testProduct1.getId();

        // Act
        Product removedProduct = repository.deleteById(productId);

        // Assert
        assertEquals(testProduct1.getName(), removedProduct.getName());

        // Verify product no longer in repository
        Optional<Product> result = repository.findById(productId);
        assertFalse(result.isPresent());
    }

    @Test
    void combinedFiltersShouldWorkTogether() {
        // Arrange
        PaginationRequestDTO request = new PaginationRequestDTO(0, 10, "name", "asc", "inStock", "Food", "a");

        // Act
        List<Product> results = repository.findAll(request);

        // Assert
        assertEquals(2, results.size());
        assertEquals("Apple", results.get(0).getName());
        assertEquals("Banana", results.get(1).getName());
        assertTrue(results.stream().allMatch(p -> p.getStock() > 0));
        assertTrue(results.stream().allMatch(p -> p.getCategory().equals("Food")));
        assertTrue(results.stream().allMatch(p -> p.getName().toLowerCase().contains("a")));
    }
}