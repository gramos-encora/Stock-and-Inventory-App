package com.inventory_system.backend.service;

import com.inventory_system.backend.dto.ProductDTO;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO getProductById(Long productId);

    ProductDTO updateProduct(Long productId, ProductDTO productDTO);
    ProductDTO updateProductOutOfStock(Long productId);
    ProductDTO updateProductInStock(Long productId);

    void deleteProduct(Long productId);
}
