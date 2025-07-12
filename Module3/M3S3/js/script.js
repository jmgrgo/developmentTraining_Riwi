// API URL
const apiURL = "http://localhost:3000/products";

// DOM Elements
const productList = document.getElementById("productList");
const productForm = document.querySelector("form");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productTable = document.getElementById("productTable");

// Create a new product
productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = productName.value.trim();
  const price = parseFloat(productPrice.value);

  // Data validation.
  if (!name || isNaN(price)) {
    alert("Please enter valid product name and price.");
    return;
  }

  const newProduct = {
    name: name,
    price: price,
  };

  // POST request to create the product.
  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      return response.json();
    })
    .then(() => {
      productForm.reset();
      retrieveProducts();
    })
    .catch((error) => console.error("Add failed:", error));
});

// Show the products table when the page is loaded.
window.addEventListener("DOMContentLoaded", retrieveProducts);

// Get the product list from the API
function retrieveProducts() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => showProduct(product));
    })
    .catch((error) => {
      console.error("Failed to retrieve products: ", error);
    });
}

// Display each product on the page.
function showProduct(product) {
  const row = document.createElement("tr");

  // Cell creation for each data.
  const nameCell = document.createElement("td");
  nameCell.textContent = product.name;

  const priceCell = document.createElement("td");
  priceCell.textContent = product.price.toFixed(2);

  const actionsCell = document.createElement("td");

  // Edit button.
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editProduct(product.id));

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteProduct(product.id));

  // Add buttons to the actions cell.
  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(actionsCell);

  productList.appendChild(row);
}

// Edit product
function editProduct(productId) {
  // Fetch the product to get current values.
  fetch(`${apiURL}/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Producto not found");
      }
      return response.json();
    })
    .then((product) => {
      // Prompts for the new values.
      const newName = prompt("Enter new product name:", product.name);
      const newPrice = prompt("Enter new product price:", product.price);

      // Validation and PUT method for updating product values.
      if (newName && !isNaN(parseFloat(newPrice))) {
        fetch(`${apiURL}/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            name: newName,
            price: parseFloat(newPrice),
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update product");
            }
            return response.json();
          })
          .then(() => retrieveProducts())
          .catch((error) => console.error("Edit failed:", error));
      }
    })
    .catch((error) => console.error("Failed to fetch product:", error));
}

// Delete product
function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    // DELETE request
    fetch(`${apiURL}/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        retrieveProducts();
      })
      .catch((error) => console.error("Delete failed:", error));
  }
}
