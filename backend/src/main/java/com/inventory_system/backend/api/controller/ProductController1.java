package com.inventory_system.backend.api.controller;

import com.inventory_system.backend.service.ProductService;
import com.inventory_system.backend.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController1 {

    private ProductService productService;

    @Autowired
    public ProductController1(ProductService productService) {
        this.productService = productService;
    }

    //Build Add Product REST API
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO savedProduct = productService.createProduct(productDTO);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    // Build Get Employee REST API
    @GetMapping("{id}")
    public ResponseEntity<ProductDTO> getProductById (@PathVariable("id") int productId) {
        ProductDTO productDTO = productService.getProductById(productId);
        return ResponseEntity.ok(productDTO);
    }

    // Build Update Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable("id") int productId,
                                                    @RequestBody ProductDTO updatedProduct) {
        ProductDTO productDto = productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.ok(productDto);
    }
}
