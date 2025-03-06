package com.inventory_system.backend.mapper;

import com.inventory_system.backend.dto.ProductDTO;
import com.inventory_system.backend.entity.Product;

import java.time.LocalDate;

public class ProductMapper {
    public static ProductDTO mapToProductDto(Product product){
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getExpirationDate(),
                product.getStock(),
                product.getCreationDate(),
                product.getUpdateDate()
        );
    }

    public static Product mapToProduct(ProductDTO productDTO) {
        return new Product(
                productDTO.getId(),
                productDTO.getName(),
                productDTO.getCategory(),
                productDTO.getPrice(),
                productDTO.getExpirationDate(),
                productDTO.getStock()
        );
    }
}
