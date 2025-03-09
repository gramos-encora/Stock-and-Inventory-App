package com.inventory_system.backend.service;

import com.inventory_system.backend.dto.PaginationRequestDTO;
import com.inventory_system.backend.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO getProductById(Long productId);

    ProductDTO updateProduct(Long productId, ProductDTO productDTO);
    ProductDTO updateProductOutOfStock(Long productId);
    ProductDTO updateProductInStock(Long productId);
    List<ProductDTO> getProducts(PaginationRequestDTO paginationRequestDTO);

    ProductDTO deleteProduct(Long productId);
}
