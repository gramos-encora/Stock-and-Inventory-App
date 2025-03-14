package com.inventory_system.backend.repository;
import com.inventory_system.backend.dto.PaginationRequestDTO;
import com.inventory_system.backend.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository{
    Optional<Product> findById(Long productId);
    Product save(Product newProduct);
    Product update(Long productId, Product updatedProduct);
    Product markOutOfStockById(Long productId);
    Product markInStockById(Long productId);
    List<Product> findAll(PaginationRequestDTO paginationRequestDTO);
    Product deleteById(Long productId);
    List<Object[]> getCategoryStats();

}
