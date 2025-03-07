package com.inventory_system.backend.repository;

import com.inventory_system.backend.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

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
    public Product deleteById(Long productId) {
        Product removedProduct = productMap.get(productId);
        productMap.remove(productId);
        return removedProduct;
    }
}
