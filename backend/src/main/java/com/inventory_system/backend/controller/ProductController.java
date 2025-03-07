package com.inventory_system.backend.controller;

import com.inventory_system.backend.entity.Product;
import com.inventory_system.backend.service.ProductService;
import com.inventory_system.backend.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Build Get Products REST API
    @GetMapping("{id}")
    public ResponseEntity<ProductDTO> getProductById (@PathVariable("id") Long productId) {
        ProductDTO productDTO = productService.getProductById(productId);
        return ResponseEntity.ok(productDTO);
    }

    //Build Add Product REST API
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO savedProduct = productService.createProduct(productDTO);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    // Build Update Products REST API
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable("id") Long productId,
                                                    @RequestBody ProductDTO updatedProduct) {
        ProductDTO productDto = productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.ok(productDto);
    }

    @PostMapping("/{id}/outofstock")
    public ResponseEntity<ProductDTO> updateProductOutOfStock(@PathVariable("id") Long productId) {
        ProductDTO productDTO = productService.updateProductOutOfStock(productId);
        return ResponseEntity.ok(productDTO);
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<ProductDTO> updateProductInStock(@PathVariable("id") Long productId) {
        ProductDTO productDTO = productService.updateProductInStock(productId);
        return ResponseEntity.ok(productDTO);
    }

    // Build Delete Product REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }
}