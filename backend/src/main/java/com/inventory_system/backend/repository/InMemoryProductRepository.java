package com.inventory_system.backend.repository;

import com.inventory_system.backend.dto.PaginationRequestDTO;
import com.inventory_system.backend.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class InMemoryProductRepository  implements ProductRepository {
    private Map<Long, Product> productMap = new HashMap<>();
    private AtomicLong counter = new AtomicLong();

    public Optional<Product> findById(Long productId) {
        return Optional.ofNullable(productMap.get(productId));
    }

    public Product save(Product newProduct) {
        Long currId = counter.get();
        newProduct.setId(counter.getAndIncrement());
        productMap.put(currId, newProduct);

        return newProduct;
    }

    @Override
    public Product update(Long productId, Product updatedProduct) {
        if (updatedProduct == null || !productMap.containsKey(productId)) {
            throw new IllegalArgumentException("Inventory ID not found for update");
        }
        productMap.put(updatedProduct.getId(), updatedProduct);
        return updatedProduct;
    }

    @Override
    public Product markOutOfStockById(Long productId) {
        Product updatedProduct = productMap.get(productId);
        updatedProduct.setStock(0);
        return updatedProduct;
    }

    @Override
    public Product markInStockById(Long productId) {
        Product updatedProduct = productMap.get(productId);
        updatedProduct.setStock(10);
        return updatedProduct;
    }

    @Override
    public List<Product> findAll(PaginationRequestDTO paginationRequestDTO) {
        List<Product> filteredProducts = getFilteredProducts(paginationRequestDTO);
        return getSortedProducts(paginationRequestDTO, filteredProducts);
    }

    private List<Product> getFilteredProducts(PaginationRequestDTO paginationRequestDTO) {
        String searchQuery = Optional.ofNullable(paginationRequestDTO.getSearch()).orElse("").toLowerCase();
        int stockStatus = paginationRequestDTO.getStock();
        String category = paginationRequestDTO.getCategory();

        return productMap.values().stream()
                .filter(product -> stockStatus == 0 || product.getStock() > 0)  // Aplica filtro de stock
                .filter(product -> searchQuery.isEmpty() || product.getName().toLowerCase().contains(searchQuery))  // Búsqueda parcial
                .filter(product -> category == null || product.getCategory().equalsIgnoreCase(category))  // Filtro de categoría
                .collect(Collectors.toList());
    }

    private List<Product> getSortedProducts(PaginationRequestDTO paginationRequest, List<Product> productList) {
        Comparator<Product> comparator = switch (paginationRequest.getSortBy().toLowerCase()) {
            case "name" ->
                    Comparator.comparing(i -> i.getName(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "category" ->
                    Comparator.comparing(i -> i.getCategory(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "price" ->
                    Comparator.comparing(i -> i.getPrice(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "stock" ->
                    Comparator.comparing(i -> i.getStock(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "expirationDate" ->
                    Comparator.comparing(i -> i.getExpirationDate(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "creationDate" ->
                    Comparator.comparing(i -> i.getCreationDate(), Comparator.nullsLast(Comparator.naturalOrder()));
            default -> throw new IllegalArgumentException("Invalid sortBy field: " + paginationRequest.getSortBy());
        };

        if ("desc".equalsIgnoreCase(paginationRequest.getSortOrder())) {
            comparator = comparator.reversed();
        }

        productList.sort(comparator);

        return productList;
    }

    @Override
    public Product deleteById(Long productId) {
        Product removedProduct = productMap.get(productId);
        productMap.remove(productId);
        return removedProduct;
    }
}
