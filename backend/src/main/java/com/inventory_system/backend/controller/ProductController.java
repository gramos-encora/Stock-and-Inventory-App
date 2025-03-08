package com.inventory_system.backend.controller;

import com.inventory_system.backend.dto.PaginationRequestDTO;
import com.inventory_system.backend.entity.Product;
import com.inventory_system.backend.service.ProductService;
import com.inventory_system.backend.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping()
    public ResponseEntity<List<ProductDTO>> findAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestParam(required = false) int stock,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search
    ) {
        PaginationRequestDTO paginationRequestDTO = new PaginationRequestDTO(
                page,
                size,
                sortBy,
                sortOrder,
                stock,
                category,
                search
        );

        List<ProductDTO> products = productService.getProducts(paginationRequestDTO);
        return ResponseEntity.ok(products);
    }

    // Build Delete Product REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }
}