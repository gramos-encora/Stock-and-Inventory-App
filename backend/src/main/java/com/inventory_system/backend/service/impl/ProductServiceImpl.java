package com.inventory_system.backend.service.impl;

import com.inventory_system.backend.dto.ProductDTO;
import com.inventory_system.backend.entity.Product;
import com.inventory_system.backend.mapper.ProductMapper;
import com.inventory_system.backend.repository.ProductRepository;
import com.inventory_system.backend.service.ProductService;
import org.springframework.stereotype.Service;

//@AllArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = ProductMapper.mapToProduct(productDTO);
        //Product savedProduct = productRepository.save(product)

        //return ProductMapper.mapToProductDto(savedProduct);
        return ProductMapper.mapToProductDto(product);
    }
}
