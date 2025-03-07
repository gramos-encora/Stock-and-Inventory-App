package com.inventory_system.backend.service.impl;

import com.inventory_system.backend.dto.ProductDTO;
import com.inventory_system.backend.entity.Product;
import com.inventory_system.backend.exception.ResourceNotFoundException;
import com.inventory_system.backend.mapper.ProductMapper;
import com.inventory_system.backend.repository.ProductRepository;
import com.inventory_system.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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

    @Override
    public ProductDTO getProductById(int productId) {
        Product product = Product.sample(); // this should be replaced with the below comment
        //Product product = productRepository.findById(productId)
        //      .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        return ProductMapper.mapToProductDto(product);
    }

    @Override
    public ProductDTO updateProduct(int productId, ProductDTO updatedProduct) {
        Product product = Product.sample(); // this should be replaced with the below comment
        //Product product = productRepository.findById(productId).orElseThrow(
        //        () -> new ResourceNotFoundException("Product does not exists with given id: " + productId)
        //);

        product.setName(updatedProduct.getName());
        product.setCategory(updatedProduct.getCategory());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());
        product.setExpirationDate(updatedProduct.getExpirationDate());
        product.setUpdateDate(LocalDate.now());

        Product updatedProductObj= Product.sample(); // this should be replaced with the below comment
        //Product updatedProductObj = productRepository.save(product);
        return ProductMapper.mapToProductDto(updatedProductObj);
    }

    @Override
    public void deleteProduct(int productId) {
        Product product = Product.sample(); // this should be replaced with the below comment
        //Product product = productRepository.findById(productId).orElseThrow(
        //        () -> new ResourceNotFoundException("Product does not exists with given id: " + productId)
        //);

        //productRepository.deleteById(productId);

    }
}
