// Import PapaParse for CSV parsing and Supabase client for database operations
import Papa from "papaparse";
import supabase from "../supabaseConfig.js";

// Get DOM references
const form = document.querySelector("#new-transaction-form form");
const transactionsSection = document.querySelector(".section--transactions");

//Submit event listener
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents reload from form submission

  // Get form values
  const transaction_id = parseInt(
    document.getElementById("transaction-id").value,
    10
  );
  const client_id = parseInt(document.getElementById("client-id").value, 10);
  const bill_number = parseInt(
    document.getElementById("bill-number").value,
    10
  );
  const datetime = document
    .getElementById("transaction-datetime")
    .value.replace("T", " ");
  const state = document.getElementById("transaction-state").value;
  const type = document.getElementById("transaction-type").value;

  // Validate transaction id
  if (isNaN(transaction_id) || transaction_id <= 0) {
    alert("Client ID must be a valid positive number.");
    return;
  }

  // Validate client id
  if (isNaN(client_id) || client_id <= 0) {
    alert("Client ID must be a valid positive number.");
    return;
  }

  // Validate bill number
  if (isNaN(bill_number) || bill_number <= 0) {
    alert("Bill number must be a valid positive number.");
    return;
  }

  // Validate date
  if (!datetime) {
    alert("Please enter a date.");
    return;
  }

  // Validate state
  if (!state) {
    alert("Please enter a date.");
    return;
  }

  // Check if client already exists by id
  const { data: existClient } = await supabase
    .from("client")
    .select("client_id")
    .eq("client_id", client_id)
    .single();
  if (!existClient) {
    alert("Client does not exist.");
    return;
  }

  // Check if bill already exists by bill number
  const { data: existBill } = await supabase
    .from("bill")
    .select("bill_number")
    .eq("bill_number", bill_number)
    .single();

  if (!existBill) {
    alert("Bill does not exist.");
    return;
  }

  // Insert new transaction into database
  const { error } = await supabase.from("transaction").insert([
    {
      transaction_id,
      client_id,
      bill_number,
      datetime,
      state,
      type,
    },
  ]);

  // Show result and refresh list
  if (error) {
    alert("Error creating transaction: " + error.message);
  } else {
    alert("Transaction created successfully.");
    form.reset(); // Clear form
    loadTransactions(); // Refresh transaction list
  }
});

/**
 * Creates a card element for an transaction and sets up edit/remove handlers.
 * @param {Object} transaction - The transaction object to display
 * @returns {HTMLElement} - The card element
 */
function createTransactionCard(transaction) {
  const card = document.createElement("div");
  card.className = "section__item item item--transaction";

  // Card HTML structure
  card.innerHTML = `
    <div class="item__header">
      <span class="item__value">${transaction.transaction_id}</span>
      <span class="item__value">${transaction.client_id}</span>
      <span class="item__value">${transaction.bill_number}</span>
    </div>
    <div class="item__info">
      <div class="item__labels">
        <span class="item__label">Date:</span>
        <span class="item__label">State:</span>
        <span class="item__label">Type:</span>
      </div>
      <div class="item__values">
        <span class="item__value">${transaction.datetime}</span>
        <span class="item__value">${transaction.state}</span>
        <span class="item__value">${transaction.type}</span>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__button btn-edit">Edit</button>
      <button class="item__button btn-remove">Remove</button>
    </div>
  `;

  // Remove transaction button handler
  card.querySelector(".btn-remove").addEventListener("click", async () => {
    if (confirm(`Delete transaction ${transaction.transaction_id}?`)) {
      const { error } = await supabase
        .from("transaction")
        .delete()
        .eq("transaction_id", transaction.transaction_id);

      if (error) {
        alert("Error deleting: " + error.message);
      } else {
        alert("Transaction deleted successfully.");
        card.remove();
      }
    }
  });

  // Edit transaction button handler
  card.querySelector(".btn-edit").addEventListener("click", () => {
    openEditForm(transaction, card);
  });

  return card;
}

// Render all transactions
async function loadTransactions() {
  const { data, error } = await supabase.from("transaction").select("*");

  if (error) {
    console.error("Error loading transactions:", error.message);
    return;
  }

  // Save the full transaction list in window for filtering
  window._allTransactions = data || [];

  renderTransactions(window._allTransactions);
}

// Render all transactions

function renderTransactions(transactions) {
  // Remove existing transaction cards
  transactionsSection
    .querySelectorAll(".item--transaction")
    .forEach((c) => c.remove());

  // Add new transaction cards
  transactions.forEach((transaction) =>
    transactionsSection.appendChild(createTransactionCard(transaction))
  );
}

// Search filter elements for transaction search
const searchInput = document.getElementById("transaction-search-input");
const searchBtn = document.getElementById("transaction-search-btn");

// Filters transactions by search query and renders the filtered list.
function filterTransactions() {
  const query = searchInput.value.trim().toLowerCase();
  if (!window._allTransactions) return;
  if (!query) {
    renderTransactions(window._allTransactions);
    return;
  }
  // Filter by transaction ID, client ID, bill number, date, state.
  const filtered = window._allTransactions.filter((transaction) => {
    return (
      transaction.transaction_id.includes(query) ||
      transaction.client_id.includes(query) ||
      transaction.bill_number.includes(query) ||
      transaction.datetime.includes(query) ||
      transaction.state.includes(query)
    );
  });
  renderTransactions(filtered);
}

// Search button click handler
searchBtn.addEventListener("click", filterTransactions);

// Search input Enter key handler
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    filterTransactions();
  }
});

// Load transactions when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
});

function openEditForm(transaction, card) {

  // Replace card content with an edit form
  card.innerHTML = `
    <form class="form__body edit-form">
      <div class="form__field">
        <label>ID:</label>
        <input class="form__input" name="transaction_id" value="${
          transaction.transaction_id
        }" disabled />
      </div>
      <div class="form__field">
        <label>Patient ID:</label>
        <input class="form__input" type="number" name="client_id" value="${
          transaction.client_id
        }" required />
      </div>
      <div class="form__field">
        <label>Medic ID:</label>
        <input class="form__input" type="number" name="bill_number" value="${
          transaction.bill_number
        }" required />
      </div>
      <div class="form__field">
        <label>Date:</label>
        <input class="form__input" type="datetime-local" name="datetime" value="${
          transaction.datetime
        }" required />
      </div>

      <div class="form__field">
        <label class="form__label">State:</label>
        <select class="form__input" name="state" required>
          <option value="Pendiente" ${
            transaction.state === "Pendiente" ? "selected" : ""
          }>Pendiente</option>
          <option value="Fallida" ${
            transaction.state === "Fallida" ? "selected" : ""
          }>Fallida</option>
          <option value="Completada" ${
            transaction.state === "Completada" ? "selected" : ""
          }>Completada</option>
        </select>
      </div>
            <div class="form__field">
        <label>State:</label>
        <input disabled class="form__input" type="time" name="state" value="${
          transaction.type
        }" required />
      </div>
      <div class="form__edit-buttons">
        <button type="submit" class="form__button">Save</button>
        <button type="button" class="form__button cancel-btn">Cancel</button>
      </div>
    </form>
  `;

  // Get references to the form and cancel button
  const editForm = card.querySelector("form");
  const cancelBtn = editForm.querySelector(".cancel-btn");

  // Cancel button handler (restore card view)
  cancelBtn.addEventListener("click", () => {
    card.replaceWith(createTransactionCard(app));
  });

  // Save button handler (submit form)
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get updated values from the form
    const formData = new FormData(editForm);
    const updatedTransaction = {
      client_id: parseInt(formData.get("client_id"), 10),
      bill_number: parseInt(formData.get("bill_number"), 10),
      datetime: formData.get("datetime"),
      state: formData.get("state") || null,
    };

    // Validate required fields
    if (
      !updatedTransaction.client_id ||
      updatedTransaction.client_id <= 0 ||
      !updatedTransaction.bill_number ||
      updatedTransaction.bill_number <= 0 ||
      !updatedTransaction.datetime ||
      !updatedTransaction.state
    ) {
      alert("Please complete the required fields correctly.");
      return;
    }

    // Check if client exists
    const { data: clientExist } = await supabase
      .from("client")
      .select("client_id")
      .eq("client_id", updated.client_id)
      .single();
    if (!clientExist) return alert("Client does not exist.");

    // Check if bill exists
    const { data: billExists } = await supabase
      .from("bill")
      .select("bill_number")
      .eq("bill_number", updated.bill_number)
      .single();
    if (!billExists) return alert("Bill does not exist.");

    // Update transaction in Supabase
    const { error } = await supabase
      .from("transaction")
      .update(updated)
      .eq("transaction_id", transaction.transaction_id);

    // Show result and update card
    if (error) {
      alert("Error updating: " + error.message);
    } else {
      alert("Transaction updated.");
      card.replaceWith(
        createTransactionCard({
          transaction_id: transaction.transaction_id,
          ...updated,
        })
      );
    }
  });
}

// Array to hold parsed CSV data before import
let parsedData = [];

// Event listener for CSV file input change
document.getElementById("csv-upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  Papa.parse(file, {
    header: true, 
    skipEmptyLines: true,
    complete: function (results) {
      parsedData = results.data;
      console.log("Parsed transaction data:", parsedData);
    },
    error: function (err) {

      // Log any error that occurs during parsing
      console.error("Error reading transaction CSV:", err);
    },
  });
});

// Event listener for CSV upload button click
document
  .getElementById("upload-btn")
  .addEventListener("click", async function () {

    // If no parsed data, show alert and stop
    if (!parsedData.length) {
      alert("Please select a valid CSV file first.");
      return;
    }

    // Validate and clean the data before inserting
    // Only rows with valid transaction_id, client_id, bill_number, date, time, reason, and state are kept
    const validRows = [];
    for (const row of parsedData) {
      // Basic field validation
      if (
        row.transaction_id &&
        !isNaN(parseInt(row.transaction_id)) &&
        row.client_id &&
        !isNaN(parseInt(row.client_id)) &&
        row.bill_number &&
        !isNaN(parseInt(row.bill_number)) &&
        row.date &&
        row.time &&
        typeof row.reason === "string" &&
        ["Pendiente", "Fallida", "Completada"].includes(row.state)
      ) {

        // Check existence of client and bill_number
        const { data: existClient } = await supabase
          .from("client")
          .select("client_id")
          .eq("client_id", parseInt(row.client_id))
          .single();

        const { data: existBill } = await supabase
          .from("bill")
          .select("bill_number")
          .eq("bill_number", parseInt(row.bill_number))
          .single();

        if (!existClient) {
          alert(`Client ID ${row.patient_id} does not exist. Row skipped.`);
          continue;
        }
        if (!existBill) {
          alert(`Bill number ${row.medic_id} does not exist. Row skipped.`);
          continue;
        }

        validRows.push({
          transaction_id: parseInt(row.transaction_id),
          client_id: parseInt(row.client_id),
          bill_number: parseInt(row.bill_number),
          datetime: row.datetime,
          state: row.state,
          state: row.type,
        });
      }
    }

    // If no valid rows, show alert and stop
    if (!validRows.length) {
      alert("There are no valid rows to import.");
      return;
    }

    // Insert valid rows into the database transaction table
    const { data, error } = await supabase
      .from("transaction")
      .insert(validRows);

    // Show result and refresh transaction list
    if (error) {
      console.error(
        "Error inserting into Supabase transaction:",
        error.message
      );
      alert("Error uploading data: " + error.message);
    } else {
      console.log("Transaction data uploaded successfully:", data);
      alert("Transaction data uploaded successfully to Supabase.");
      loadTransactions();
    }
  });
