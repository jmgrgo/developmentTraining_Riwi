// Import PapaParse for CSV parsing and Supabase bill for database operations
import Papa from "papaparse";
import supabase from "../supabaseConfig";

// Get DOM references
const form = document.querySelector("#new-bill-form form");

// Handle bill form submission (add new bill)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents reload from form submission

  // Get form values
  const bill_number = parseInt(document.getElementById("bill-number").value, 10);
  const billing_period = document.getElementById("bill-period").value;
  const invoiced_amount = parseInt(document.getElementById("bill-invoiced").value);
  const paid_amount = parseInt(document.getElementById("bill-paid").value);

  // Validate bill number
  if (isNaN(bill_number) || bill_number <= 0) {
    alert("Please introduce a valid bill number.");
    return;
  }

  // Validate date
  if (!billing_period) {
    alert("Please introduce a billing period.");
    return;
  }

  // Validate invoiced amount
  if (isNaN(invoiced_amount) || invoiced_amount <= 0) {
    alert("Please introduce a valid invoiced amount.");
    return;
  }

  // Validate paid amount
  if (isNaN(paid_amount) || paid_amount <= 0) {
    alert("Please introduce a valid paid amount.");
    return;
  }

  // Check if appointment already exists by id
  const { data: existBill } = await supabase
    .from("bull")
    .select("bill_number")
    .eq("bill_number", bill_number)
    .single();
  if (existBill) {
    alert("A bill with that number already exists.");
    return;
  }

  // Insert new bill into database
  const { data, error } = await supabase.from("bill").insert([
    {
      bill_number,
      billing_period,
      invoiced_amount,
      paid_amount
    },
  ]);

  // Show result and refresh list
  if (error) {
    alert("Error adding the bill: " + error.message);
  } else {
    alert("Bill added successfully!");
    form.reset(); // Clear form
    loadBills(); // Refresh bill list
  }
});

// Get the bill section element from the DOM
const billSection = document.querySelector(".section--bills");

// Create bill card to display info
function createBillCard(bill) {
  const card = document.createElement("div");
  card.className = "section__item item item--bill";

  // Card HTML structure
  card.innerHTML = `
    <div class="item__header">
      <span class="item__value">${bill.bill_number}</span>
    </div>
    <div class="item__info">
      <div class="item__labels">
        <span class="item__label">Billing period:</span>
        <span class="item__label">Invoiced amount:</span>
        <span class="item__label">Paid amount:</span>
      </div>
      <div class="item__values">
        <span class="item__value">${bill.billing_period}</span>
        <span class="item__value">${bill.invoiced_amount}</span>
        <span class="item__value">${bill.paid_amount}</span>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__button btn-edit">Edit</button>
      <button class="item__button btn-remove">Remove</button>
    </div>
  `;

  // Remove bill button handler
  const btnRemove = card.querySelector(".btn-remove");
  btnRemove.addEventListener("click", async () => {
    if (confirm(`Delete bill ${bill.bill_number}?`)) {
      const { error } = await supabase
        .from("bill")
        .delete()
        .eq("bill_number", bill.bill_number);

      if (error) {
        // Foreign key constraint error (appointments assigned)
        if (
          error.message &&
          error.message.includes(
            'violates foreign key constraint "transaction_bill_number_fkey"'
          )
        ) {
          alert(
            "Cannot delete bill: There are transactions assigned to this bill. Please delete or reassign those appointments first."
          );
        } else {
          alert("Error deleting bill: " + error.message);
        }
      } else {
        alert("Bill deleted successfully.");
        card.remove();
      }
    }
  });

  // Edit bill button handler
  const btnEdit = card.querySelector(".btn-edit");
  btnEdit.addEventListener("click", () => {
    openEditForm(bill, card);
  });

  return card;
}


// Render all clients
async function loadBills() {
  const { data: bills, error } = await supabase.from("bill").select("*");

  if (error) {
    console.error("Error fetching bills:", error.message);
    return;
  }

  // Save the full bill list in window for filtering
  window._allBills = bills || [];

  renderBills(window._allBills);
}

function renderBills(bills) {
  // Remove existing bill cards
  const existingCards = billSection.querySelectorAll(
    ".section__item.item--bill"
  );
  existingCards.forEach((card) => card.remove());

  // Add new bill cards
  bills.forEach((bill) => {
    const card = createBillCard(bill);
    billSection.appendChild(card);
  });
}

// Search filter elements for bill search
const searchInput = document.getElementById("bill-search-input");
const searchBtn = document.getElementById("bill-search-btn");

/**
 * Filters bills by search query and renders the filtered list.
 */
function filterBills() {
  const query = searchInput.value.trim().toLowerCase();
  if (!window._allBills) return;
  if (!query) {
    renderBills(window._allBills);
    return;
  }
  // Filter by name, email, phone, or specialty
  const filtered = window._allBills.filter((bill) => {
    return (
      bill.bill_number.includes(query) ||
      bill.billing_period.includes(query)
    );
  });

  renderBills(filtered);
}

// Search button click handler
searchBtn.addEventListener("click", filterBills);
// Search input Enter key handler
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    filterBills();
  }
});

// Load bills when the page is loaded
document.addEventListener("DOMContentLoaded", loadBills);

/**
 * Opens the edit form for a bill card.
 * Replaces the card's HTML with a form pre-filled with the bill's data.
 * Allows editing and saving changes, or cancelling to restore the original card.
 * @param {Object} bill - The bill object to edit
 * @param {HTMLElement} card - The card element to replace
 */
function openEditForm(bill, card) {
  // Replace card content with an edit form
  card.innerHTML = `
    <form class="form__body edit-form">
      <div class="form__field">
        <label class="form__label">Bill number:</label>
        <input class="form__input" type="number" name="bill_number" value="${bill.bill_number}" disabled />
      </div>
      <div class="form__field">
        <label class="form__label">Billing period:</label>
        <input class="form__input" type="month" name="billing_period" value="${bill.billing_period}" />
      </div>
      <div class="form__field">
        <label class="form__label">Invoiced amount: </label>
        <input class="form__input" type="number" name="invoiced_amount" value="${bill.invoiced_amount}" pattern="\\d{10}" required />
      </div>
      <div class="form__field">
        <label class="form__label">Paid amount:</label>
        <input class="form__input" type="number" name="paid_amount" value="${bill.paid_amount}" required maxlength="50" />
      </div>
      <div class="form__edit-buttons">
        <button type="submit" class="form__button">Save</button>
        <button type="button" class="form__button cancel-btn">Cancel</button>
      </div>
    </form>
  `;

  const form = card.querySelector(".edit-form");
  const cancelBtn = form.querySelector(".cancel-btn");

  cancelBtn.addEventListener("click", () => {
    const newCard = createBillCard(bill);
    card.replaceWith(newCard);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const updatedBill = {
      billing_period: formData.get("billing_period"),
      invoiced_amount: parseInt(formData.get("invoiced_amount")),
      paid_amount: parseInt(formData.get("paid_amount")),
    };

    if (
      !updatedBill.billing_period ||
      !updatedBill.invoiced_amount ||
      updatedBill.invoiced_amount <= 0 ||
      !updatedBill.paid_amount ||
      updatedBill.paid_amount <= 0
    ) {
      alert("Please check that all data is correct.");
      return;
    }

    const { error } = await supabase
      .from("bill")
      .update(updatedBill)
      .eq("bill_number", bill.bill_number);

    if (error) {
      alert("Error updating bill: " + error.message);
      return;
    }

    alert("Bill updated successfully.");

    const newCard = createBillCard({
      bill_number: bill.bill_number,
      ...updatedBill,
    });
    card.replaceWith(newCard);
  });
}

// Array to hold parsed CSV data before import
let parsedData = [];

// Event listener for CSV file input change
// When a file is selected, parse it using PapaParse
document.getElementById("csv-upload").addEventListener("change", function (e) {
  const file = e.target.files[0]; // Get the selected file
  if (!file) return; // If no file, do nothing
  Papa.parse(file, {
    header: true, // Treat first row as header
    skipEmptyLines: true, // Ignore empty lines
    complete: function (results) {
      // Save parsed data to array
      parsedData = results.data;
      console.log("Parsed bill data:", parsedData); // Log parsed data for debugging
    },
    error: function (err) {
      // Log any error that occurs during parsing
      console.error("Error reading bill CSV:", err);
    },
  });
});

// Event listener for CSV upload button click
// When clicked, validate and import the parsed data into Supabase
document
  .getElementById("upload-btn")
  .addEventListener("click", async function () {
    // If no parsed data, show alert and stop
    if (!parsedData.length) {
      alert("Please select a valid CSV file first.");
      return;
    }

    // Validate and clean data before inserting
    // Only rows with valid client_id, full_name, address, phone, and email are kept
    const validRows = parsedData.filter((row) => {
      return (
        row.bill_number &&
        !isNaN(parseInt(row.bill_number)) &&
        row.billing_period &&
        row.invoiced_amount &&
        !isNaN(parseInt(row.invoiced_amount)) &&
        row.paid_amount &&
        !isNaN(parseInt(row.paid_amount)) 
      );
    });

    // If no valid rows, show alert and stop
    if (!validRows.length) {
      alert("There are no valid rows to import.");
      return;
    }

    // Insert valid rows into Supabase bill table
    const { data, error } = await supabase.from("bill").insert(validRows);

    // Show result and refresh bill list
    if (error) {
      console.error("Error inserting into Supabase bill:", error.message);
      alert("Error uploading data: " + error.message);
    } else {
      console.log("Bill data uploaded successfully:", data);
      alert("Bill data uploaded successfully to Supabase.");
      loadBills();
    }
  });
