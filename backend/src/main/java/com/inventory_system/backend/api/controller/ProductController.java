package com.inventory_system.backend.api.controller;

import com.inventory_system.backend.api.model.Product;
import com.inventory_system.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/product")
    public Product getProduct(@RequestParam Integer id) {
        Optional product = productService.getProduct(id);
        if (product.isPresent()) {
            return (Product) product.get();
        }

        return null;
    }

}
