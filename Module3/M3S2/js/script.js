products = {};

// Function to verify ids. (it must be always the lowest possible number.)
function availableId() {
  let id = 1;
  while (products.hasOwnProperty(id)) {
    id++;
  }
  return id;
}

function clearLists() {
  // Clear the lists of previous info.
  const forInList = document.getElementById("forIn__list");
  const forOfList = document.getElementById("forOf__list");
  const forEachList = document.getElementById("forEach__list");
  forInList.innerHTML = "";
  forOfList.innerHTML = "";
  forEachList.innerHTML = "";
}

// Add product function

function addProduct(event) {
  // Prevent web reload
  event.preventDefault();

  // Get the value of each input from the html.
  const productName = document.getElementById("productForm__name").value;
  const productPrice = parseFloat(
    document.getElementById("productForm__price").value
  );
  const productCategory = document.getElementById(
    "productForm__category"
  ).value;
  const eventMessage = document.getElementById("eventMessage");

  eventMessage.style.color = "red";

  // Name validation.
  if (
    !productName ||
    typeof productName !== "string" ||
    !/[a-zA-Z]/.test(productName) ||
    /^\s*$/.test(productName)
  ) {
    eventMessage.textContent = "Please enter a valid name.";
    return;
  }

  // Price validation
  if (!productPrice || productPrice <= 0) {
    eventMessage.textContent = "Please enter a valid price.";
    return;
  }

  if (!productCategory) {
    eventMessage.textContent = "Please select a category.";
    return;
  }

  // Get the idea from the "availableId" function.

  const productId = availableId();

  // Add the product to the main object.

  products[productId] = {
    name: productName,
    price: productPrice,
    category: productCategory,
  };

  // Success message

  eventMessage.style.color = "green";
  eventMessage.textContent = "¡Product added succesfully!";
  document.getElementById("idMessage").textContent =
    "Product ID assigned: " + productId + ".";

  // Clean the form.

  document.getElementById("productForm__name").value = "";
  document.getElementById("productForm__price").value = "";
  document.getElementById("productForm__category").selectedIndex = 0;

  console.log(products);
}

// Event listener for the add product button.

document.getElementById("productForm").addEventListener("submit", addProduct);

// Function to delete product

function deleteProduct(event) {
  // Prevent web reload
  event.preventDefault();

  // Get the values from the html
  const searchType = document.getElementById("deleteForm__searchType").value;
  const searchValue = document.getElementById("deleteForm__searchValue").value;
  const deleteMessage = document.getElementById("deleteMessage");

  deleteMessage.style.color = "red";

  // Input validation

  if (!searchValue) {
    deleteMessage.textContent = "Please enter a value to search.";
    return;
  }

  let deleted = false;

  // Delete using ID

  if (searchType === "deleteForm__id") {
    const id = parseInt(searchValue, 10);
    if (isNaN(id) || !products.hasOwnProperty(id)) {
      deleteMessage.textContent = "No product found with that ID.";
      return;
    }
    delete products[id];
    deleted = true;
  }

  // Delete using name
  else if (searchType === "deleteForm__name") {
    const keys = Object.keys(products);
    for (const key of keys) {
      if (products[key].name.toLowerCase() === searchValue.toLowerCase()) {
        delete products[key];
        deleted = true;
        break;
      }
    }

    if (!deleted) {
      deleteMessage.textContent = "No product found with that name.";
      return;
    }
  }

  // Success message

  if (deleted) {
    deleteMessage.style.color = "green";
    deleteMessage.textContent = "Product deleted successfully.";
    document.getElementById("deleteForm__searchValue").value = "";
    console.log(products);
  }
}

// Event listener for the delete product button.

document.getElementById("deleteForm").addEventListener("submit", deleteProduct);

// Print productos function using each method.

function printProducts() {
  // Get the elements from the html.
  const forInList = document.getElementById("forIn__list");
  const forOfList = document.getElementById("forOf__list");
  const forEachList = document.getElementById("forEach__list");
  const printMessage = document.getElementById("printMessage");

  // Array length validation, it cannot be empty.
  if (Object.keys(products).length === 0) {
    printMessage.textContent = "There are no products to show.";
    return;
  }

  clearLists();

  // For in method
  for (let id in products) {
    const product = products[id];
    const li = document.createElement("li");
    li.textContent = `ID: ${id}, Name: ${
      product.name
    }, Price: $${product.price.toFixed(2)}, Category: ${product.category}`;
    forInList.appendChild(li);
  }

  // For of method
  for (let [id, product] of Object.entries(products)) {
    const li = document.createElement("li");
    li.textContent = `ID: ${id}, Name: ${
      product.name
    }, Price: $${product.price.toFixed(2)}, Category: ${product.category}`;
    forOfList.appendChild(li);
  }

  // ForEach method
  Object.entries(products).forEach(([id, product]) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${id}, Name: ${
      product.name
    }, Price: $${product.price.toFixed(2)}, Category: ${product.category}`;
    forEachList.appendChild(li);
  });

  // Event message reset
  printMessage.textContent = "";
}

// Event listener for the print products button.
document
  .getElementById("print__button")
  .addEventListener("click", printProducts);

// Functions to display the different menus.

// Display the add product menu.

function showAdd() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("delete").style.display = "none";
  document.getElementById("print").style.display = "none";
  document.getElementById("add").style.display = "block";
}

// Display the add delete menu.

function showDelete() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("add").style.display = "none";
  document.getElementById("print").style.display = "none";
  document.getElementById("delete").style.display = "block";
}

// Display the show product menu.

function showPrint() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("add").style.display = "none";
  document.getElementById("delete").style.display = "none";
  document.getElementById("print").style.display = "block";
  clearLists();
}
