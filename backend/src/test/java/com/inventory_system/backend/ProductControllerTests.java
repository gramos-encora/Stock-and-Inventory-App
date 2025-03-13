package com.inventory_system.backend;

import com.inventory_system.backend.controller.ProductController;
import com.inventory_system.backend.dto.PaginationRequestDTO;
import com.inventory_system.backend.dto.ProductDTO;
import com.inventory_system.backend.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

@ExtendWith(MockitoExtension.class)
class ProductControllerTests {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private ProductDTO sampleProduct;

    @BeforeEach
    void setUp() {
        sampleProduct = new ProductDTO(
                2L,
                "Product 2",
                "Category",
                50,
                LocalDate.now(),
                5,
                LocalDate.now(),
                LocalDate.now()
        );
    }

    @Test
    void getProductById_ReturnsProduct() {
        when(productService.getProductById(1L)).thenReturn(sampleProduct);

        ResponseEntity<ProductDTO> response = productController.getProductById(1L);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody()).isEqualTo(sampleProduct);
        verify(productService, times(1)).getProductById(1L);
    }

    @Test
    void createProduct_ReturnsCreatedProduct() {
        when(productService.createProduct(any(ProductDTO.class))).thenReturn(sampleProduct);

        ResponseEntity<ProductDTO> response = productController.createProduct(sampleProduct);

        assertThat(response.getStatusCode()).isEqualTo(CREATED);
        assertThat(response.getBody()).isEqualTo(sampleProduct);
        verify(productService, times(1)).createProduct(sampleProduct);
    }

    @Test
    void updateProduct_ReturnsUpdatedProduct() {
        when(productService.updateProduct(eq(1L), any(ProductDTO.class))).thenReturn(sampleProduct);

        ResponseEntity<ProductDTO> response = productController.updateProduct(1L, sampleProduct);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody()).isEqualTo(sampleProduct);
        verify(productService, times(1)).updateProduct(1L, sampleProduct);
    }

    @Test
    void updateProductOutOfStock_ReturnsUpdatedProduct() {
        when(productService.updateProductOutOfStock(1L)).thenReturn(sampleProduct);

        ResponseEntity<ProductDTO> response = productController.updateProductOutOfStock(1L);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody()).isEqualTo(sampleProduct);
        verify(productService, times(1)).updateProductOutOfStock(1L);
    }

    @Test
    void updateProductInStock_ReturnsUpdatedProduct() {
        when(productService.updateProductInStock(1L)).thenReturn(sampleProduct);

        ResponseEntity<ProductDTO> response = productController.updateProductInStock(1L);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody()).isEqualTo(sampleProduct);
        verify(productService, times(1)).updateProductInStock(1L);
    }

    @Test
    void findAllProducts_ReturnsListOfProducts() {
        List<ProductDTO> productList = Arrays.asList(sampleProduct, new ProductDTO(
                2L,
                "Product 2",
                "Category",
                50,
                LocalDate.now(),
                5,
                LocalDate.now(),
                LocalDate.now()
        ));
        when(productService.getProducts(any(PaginationRequestDTO.class))).thenReturn(productList);

        ResponseEntity<List<ProductDTO>> response = productController.findAllProducts(0, 10, "name", "asc", "all", null, null);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody()).hasSize(2);
        verify(productService, times(1)).getProducts(any(PaginationRequestDTO.class));
    }

    @Test
    void deleteProduct_ReturnsDeletedProduct() {
        when(productService.deleteProduct(1L)).thenReturn(sampleProduct);

        ResponseEntity<String> response = productController.deleteProduct(1L);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody()).isEqualTo("Product deleted successfully");
        verify(productService, times(1)).deleteProduct(1L);
    }
}
