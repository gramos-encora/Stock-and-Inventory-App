package com.inventory_system.backend.entity;
import java.time.LocalDate;

public class Product {
    private int id;
    private String name;
    private String category;
    private int price;
    private LocalDate expirationDate;
    private int stock;
    private LocalDate creationDate;
    private LocalDate updateDate;

    public Product(int id,
                   String name,
                   String category,
                   int price,
                   LocalDate expirationDate,
                   int stock
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.expirationDate = expirationDate;
        this.stock = stock;
        this.creationDate = LocalDate.now();
        this.updateDate = LocalDate.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public static Product sample(){
        return new Product(1, "Apple", "food", 2, LocalDate.now(), 15);
    }
}
