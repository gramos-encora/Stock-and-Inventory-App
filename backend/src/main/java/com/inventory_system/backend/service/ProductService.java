package com.inventory_system.backend.service;

import com.inventory_system.backend.dto.ProductDTO;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
}
