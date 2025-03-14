package com.inventory_system.backend.service.impl;

import com.inventory_system.backend.dto.CategoryStatsDTO;
import com.inventory_system.backend.dto.PaginationRequestDTO;
import com.inventory_system.backend.dto.ProductDTO;
import com.inventory_system.backend.entity.Product;
import com.inventory_system.backend.exception.ResourceNotFoundException;
import com.inventory_system.backend.mapper.ProductMapper;
import com.inventory_system.backend.repository.ProductRepository;
import com.inventory_system.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

//@AllArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = ProductMapper.mapToProduct(productDTO);
        Product savedProduct = productRepository.save(product);

        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Product product = Product.sample(); // this should be replaced with the below comment
        //Product product = productRepository.findById(productId)
        //      .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        return ProductMapper.mapToProductDto(product);
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {

        Product product = ProductMapper.mapToProduct(productDTO);
        Product updatedProduct = productRepository.update(productId, product);

        return ProductMapper.mapToProductDto(updatedProduct);
    }

    @Override
    public ProductDTO updateProductOutOfStock(Long productId) {
        Product updatedProduct = productRepository.markOutOfStockById(productId);
        return ProductMapper.mapToProductDto(updatedProduct);
    }

    @Override
    public ProductDTO updateProductInStock(Long productId) {
        Product updatedProduct = productRepository.markInStockById(productId);
        return ProductMapper.mapToProductDto(updatedProduct);
    }

    @Override
    public List<ProductDTO> getProducts(PaginationRequestDTO paginationRequestDTO) {
        List<Product> products = productRepository.findAll(paginationRequestDTO);
        return products.stream().map((product) -> ProductMapper.mapToProductDto(product)).collect(Collectors.toList());
    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        Product removedProduct = productRepository.deleteById(productId);
        return ProductMapper.mapToProductDto(removedProduct);
    }

    public List<CategoryStatsDTO> getCategoryStats() {
        return productRepository.getCategoryStats().stream()
                .map(record -> new CategoryStatsDTO(
                        (String) record[0],
                        ((Number) record[1]).intValue(),
                        ((Number) record[2]).doubleValue(),
                        ((Number) record[3]).doubleValue()
                ))
                .collect(Collectors.toList());
    }
}
