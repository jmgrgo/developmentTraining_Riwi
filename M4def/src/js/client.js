// Import PapaParse for CSV parsing and Supabase client for database operations
import Papa from "papaparse";
import supabase from "../supabaseConfig";

// Get DOM references
const form = document.querySelector("#new-client-form form");
const clientSection = document.querySelector(".section--clients");

//Handle client form submision (add new client)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents reload from form submission

  // Get form values
  const client_id = parseInt(document.getElementById("client-id").value, 10);
  const full_name = document.getElementById("client-name").value.trim();
  const address = document.getElementById("client-address").value.trim();
  const phone = document.getElementById("client-phone").value.trim();
  const email = document.getElementById("client-email").value.trim();

  // Validate client id
  if (isNaN(client_id) || client_id <= 0) {
    alert("Client ID must be a valid positive number.");
    return;
  }
  // Validate full name
  if (full_name.length === 0 || full_name.length > 100) {
    alert("Please enter a valid full name (max 100 characters).");
    return;
  }

  // Validate address
  if (address.length === 0) {
    alert("Please enter an address.");
    return;
  }

  // Validate phone number (must be 10 digits)
  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  // Check if client already exists by email or id
  const { data: existingClient, error: fetchError } = await supabase
    .from("client")
    .select("client_id")
    .or(`email.eq.${email},client_id.eq.${client_id}`)
    .single();

  if (existingClient) {
    alert("A Client with that email or ID already exists.");
    return;
  }

  // Insert new client into database
  const { data, error } = await supabase.from("client").insert([
    {
      client_id,
      full_name,
      address,
      phone,
      email,
    },
  ]);

  // Show result and refresh list
  if (error) {
    alert("Error adding the client: " + error.message);
  } else {
    alert("Client added successfully!");
    form.reset(); // Clear form
    loadClients(); // Refresh client list
  }
});

// Create client card to display info
function createClientCard(client) {
  const card = document.createElement("div");
  card.className = "section__item item item--client";

  // Card HTML structure
  card.innerHTML = `
    <div class="item__header">
      <span class="item__value">${client.client_id}</span>
      <span class="item__value">${client.full_name}</span>
    </div>
    <div class="item__info">
      <div class="item__labels">
        <span class="item__label">Address:</span>
        <span class="item__label">Phone:</span>
        <span class="item__label">Email:</span>
      </div>
      <div class="item__values">
        <span class="item__value">${client.address}</span>
        <span class="item__value">${client.phone}</span>
        <span class="item__value">${client.email}</span>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__button btn-edit">Edit</button>
      <button class="item__button btn-remove">Remove</button>
    </div>
  `;

  // Remove client button handler
  const btnRemove = card.querySelector(".btn-remove");
  btnRemove.addEventListener("click", async () => {
    if (confirm(`Delete client ${client.full_name}?`)) {
      const { error } = await supabase
        .from("client")
        .delete()
        .eq("client_id", client.client_id);

      if (error) {
        // Foreign key constraint error (appointments assigned)
        if (
          error.message &&
          error.message.includes(
            'violates foreign key constraint "transaction_client_id_fkey"'
          )
        ) {
          alert(
            "Cannot delete client: There are transactions assigned to this client. Please delete or reassign those appointments first."
          );
        } else {
          alert("Error deleting client: " + error.message);
        }
      } else {
        alert("Client deleted successfully.");
        card.remove();
      }
    }
  });

  // Edit client button handler
  const btnEdit = card.querySelector(".btn-edit");
  btnEdit.addEventListener("click", () => {
    openEditForm(client, card);
  });

  return card;
}

// Render all clients
async function loadClients() {
  const { data: clients, error } = await supabase.from("client").select("*");

  if (error) {
    console.error("Error fetching clients:", error.message);
    return;
  }

  // Save the full client list in window for filtering
  window._allClients = clients || [];

  renderClients(window._allClients);
}

function renderClients(clients) {
  // Remove existing client cards
  const existingCards = clientSection.querySelectorAll(
    ".section__item.item--client"
  );
  existingCards.forEach((card) => card.remove());

  // Add new client cards
  clients.forEach((client) => {
    const card = createClientCard(client);
    clientSection.appendChild(card);
  });
}

// Search filter elements for client search
const searchInput = document.getElementById("client-search-input");
const searchBtn = document.getElementById("client-search-btn");

// Filters clients by search query and renders the filtered list.
function filterClients() {
  const query = searchInput.value.trim().toLowerCase();
  if (!window._allClients) return;
  if (!query) {
    renderClients(window._allClients);
    return;
  }
  // Filter by name, email, phone, or specialty
  const filtered = window._allClients.filter((client) => {
    return (
      client.full_name.toLowerCase().includes(query) ||
      client.address.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.phone.toLowerCase().includes(query) ||
      client.specialty.toLowerCase().includes(query)
    );
  });
  renderClients(filtered);
}

// Search button click handler
searchBtn.addEventListener("click", filterClients);
// Search input Enter key handler

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    filterClients();
  }
});

// Load clients when the page is loaded
document.addEventListener("DOMContentLoaded", loadClients);

function openEditForm(client, card) {
  // Replace card content with an edit form
  card.innerHTML = `
    <form class="form__body edit-form">
      <div class="form__field">
        <label class="form__label">ID:</label>
        <input class="form__input" type="number" name="client_id" value="${client.client_id}" disabled />
      </div>
      <div class="form__field">
        <label class="form__label">Full Name:</label>
        <input class="form__input" type="text" name="full_name" value="${client.full_name}" required maxlength="100" />
      </div>
      <div class="form__field">
        <label class="form__label" for="client-address">Address</label>
        <textarea
          class="form__input"
          id="client-address"
          name="address"
          required>${client.address}
        </textarea>
      </div>
      <div class="form__field">
        <label class="form__label">Phone:</label>
        <input class="form__input" type="tel" name="phone" value="${client.phone}" pattern="\\d{10}" required />
      </div>
      <div class="form__field">
        <label class="form__label">Email:</label>
        <input class="form__input" type="email" name="email" value="${client.email}" required maxlength="50" />
      </div>
      <div class="form__edit-buttons">
        <button type="submit" class="form__button">Save</button>
        <button type="button" class="form__button cancel-btn">Cancel</button>
      </div>
    </form>
  `;

  // Get references to the form and cancel button
  const form = card.querySelector(".edit-form");
  const cancelBtn = form.querySelector(".cancel-btn");

  // Cancel button handler
  cancelBtn.addEventListener("click", () => {
    const newCard = createClientCard(client);
    card.replaceWith(newCard);
  });

  // Save button handler (submit form)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get updated values from the form
    const formData = new FormData(form);
    const updatedClient = {
      full_name: formData.get("full_name").trim(),
      address: formData.get("address").trim(),
      phone: formData.get("phone").trim(),
      email: formData.get("email").trim(),
    };

    // Validate required fields
    if (
      !updatedClient.full_name ||
      updatedClient.full_name.length > 100 ||
      !updatedClient.address ||
      updatedClient.address.length <= 0 ||
      !/^\d{10}$/.test(updatedClient.phone) ||
      !updatedClient.email
    ) {
      alert("Please check that all data is correct.");
      return;
    }

    // Update transaction in Supabase
    const { error } = await supabase
      .from("client")
      .update(updatedClient)
      .eq("client_id", client.client_id);

    // Show result and update card
    if (error) {
      alert("Error updating client: " + error.message);
      return;
    } else {
      alert("Client updated successfully.");

      const newCard = createClientCard({
        client_id: client.client_id,
        ...updatedClient,
      });
      card.replaceWith(newCard);
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
      console.log("Parsed client data:", parsedData);
    },
    error: function (err) {

      // Log any error that occurs during parsing
      console.error("Error reading client CSV:", err);
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

    // Validate and clean data before inserting
    // Only rows with valid client_id, full_name, address, phone, and email are kept
    const validRows = parsedData.filter((row) => {
      return (
        row.client_id &&
        !isNaN(parseInt(row.client_id)) &&
        row.full_name &&
        row.full_name.length <= 100 &&
        row.address &&
        row.address.length > 0 &&
        row.phone &&
        /^\d{10}$/.test(row.phone) &&
        row.email &&
        row.email.length <= 50
      );
    });

    // If no valid rows, show alert and stop
    if (!validRows.length) {
      alert("There are no valid rows to import.");
      return;
    }

    // Insert valid rows into the database client table
    const { data, error } = await supabase.from("client").insert(validRows);

    // Show result and refresh client list
    if (error) {
      console.error("Error inserting into Supabase client:", error.message);
      alert("Error uploading data: " + error.message);
    } else {
      console.log("Client data uploaded successfully:", data);
      alert("Client data uploaded successfully to Supabase.");
      loadClients();
    }
  });
