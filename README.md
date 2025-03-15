# Inventory Management System

A web application to manage product inventory, view stock statistics, and track inventory in real-time using ReactJS (TypeScript) for the frontend and Spring Boot (Java) for the backend.

## Features
- **Product Management:** Add, edit, and delete products from inventory.
- **Category Statistics:** View total stock, value, and average price per category.
- **Backend API:** Provides endpoints for CRUD operations and stock statistics.
- **Live Updates:** Automatically refresh statistics when inventory is modified.
- **Pagination & Filtering:** Efficient product listing with sorting and filtering.
- **Testing:** Frontend and backend covered with unit tests.

# Technologies
## Frontend
- ReactJS (TypeScript)
- Context API for state management
- Bootstrap & CSS for UI styling
- Jest & React Testing Library for testing
## Backend
- Java + Spring Boot
- In-memory repository (HashMap)
- RESTful API
- JUnit & Mockito for testing

# Getting Started

1. **Clone the Repository**
```bash
git clone https://github.com/gramos-encora/Stock-and-Inventory-App.git
cd Stock-and-Inventory-App
```
2. **Backend Setup (Spring Boot)**
  - **Install Dependencies**
Ensure you have Java 17+ and Maven installed.
```bash
cd backend
mvn install
```
  - **Run the Backend Server**
```bash
mvn spring-boot:run
```
The API will run at `http://localhost:9090`

3. **Frontend Setup (React + TypeScript)**
  - **Install Dependencies**

```bash
cd frontend
npm install
```
  - **Run the Frontend**

```bash
npm run dev
```
The web app will be available at `http://localhost:8080`

# API Endpoints

- **Get page of products, sorted by category, order and filtered.** 
```
  GET /api/products/all
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `int` |  number of page to fetch |
| `size`      | `int` |  size of the page |
| `sortBy`      | `String` |  category that will be sorted |
| `sortOrder`      | `String` |  order of sorting "asc" or "desc" |
| `stock`      | `String` |  Filtering by "inStock", "outOfStock", "all" |
| `category`      | `String` |  Filtering by Category |
| `search`      | `String` |  Filtering by search term |

- **Add a new product.**
```
  POST /api/products
```

- **Update an existing product.**
```
  PUT /api/products/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required**Id of product to update |

- **Delete an existing product.** 
```
  DELETE /api/products/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required**Id of product to delete |

- **Get inventory stats.** 
```
  GET /api/products/stats
```

- **Mark an existing product out of stock.** 
```
  POST /api/products/{id}/outofstock
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required**Id of product to mark out of stock |

- **Mark an existing product in stock.** 
```
  PUT /api/products/{id}/instock
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required**Id of product to mark in stock |


# Running Tests

## Backend Tests (Spring Boot)
```bash
cd backend
mvn test
```
## Frontend Tests (Jest + React Testing Library)
```bash
cd frontend
npm test
```

**💡 Developed with ❤️ by Gerardo Ramos.**
