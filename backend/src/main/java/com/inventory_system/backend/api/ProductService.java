package com.inventory_system.backend.api;

import com.inventory_system.backend.api.model.Product;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private List<Product> productList;

    public ProductService() {
        productList = new ArrayList<>();

        Product product1 = new Product(1, "Apple", "food", 2, LocalDate.now(), 15);
        Product product2 = new Product(2, "Orange", "food", 1, LocalDate.now(), 15);
        Product product3 = new Product(3, "Tshirt", "clothing", 20, LocalDate.now(), 30);
        Product product4 = new Product(4, "Boots", "clothing", 50, LocalDate.now(), 5);
        Product product5 = new Product(5, "blender", "electronics", 15, LocalDate.now(), 7);

        productList.addAll(Arrays.asList(product1,product2,product3,product4,product5));
    }

    public Optional<Product> getProduct(Integer id) {
        Optional optional = Optional.empty();

        for (Product product: productList) {
            if (id == product.getId()) {
                optional = Optional.of(product);
                return optional;
            }
        }
        return optional;
    }
}
