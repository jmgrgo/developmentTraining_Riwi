# Product Inventory App

A simple web-based application to manage products. Users can add, edit, and delete product information using an intuitive interface.

## Project Structure

project-root/
├── index.html # Main HTML file
├── css/
│ └── styles.css # Styles for the application
├── js/
│ └── script.js # JavaScript for product CRUD operations
└── db.json

## Features

- **Add Product**: Enter product name and price to add it to the table.
- **Edit Product**: Modify existing product name and price.
- **Delete Product**: Remove a product from the list.
- **Display Products**: Automatically displays the product list on page load.

## Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (Vanilla)**  
- **JSON Server**

## How to Use

### Start JSON Server (Optional Backend)

You can simulate a backend using "json-server":

1. npm install -g json-server
2. json-server --watch ./json/db.json

Open the project:

3. Open "index.html" in your browser.