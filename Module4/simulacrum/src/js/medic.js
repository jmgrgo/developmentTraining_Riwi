
// Import PapaParse for CSV parsing and Supabase client for database operations
import Papa from "papaparse";
import supabase from "../supabaseConfig";

// Get the medic form element from the DOM
const form = document.querySelector("#new-medic-form form");

// Handle medic form submission (add new medic)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get and sanitize form values
  const medic_id = parseInt(document.getElementById("medic-id").value, 10);
  const full_name = document.getElementById("medic-name").value.trim();
  const specialty = document.getElementById("medic-specialty").value.trim();
  const phone = document.getElementById("medic-phone").value.trim();
  const email = document.getElementById("medic-email").value.trim();
  const experience_years = parseInt(
    document.getElementById("medic-experience").value,
    10
  );
  const salary = parseFloat(document.getElementById("medic-salary").value);

  // Validate medic ID
  if (isNaN(medic_id) || medic_id <= 0) {
    alert("Medic ID must be a valid positive number.");
    return;
  }
  // Validate full name
  if (full_name.length === 0 || full_name.length > 100) {
    alert("Please enter a valid full name (max 100 characters).");
    return;
  }
  // Validate specialty
  if (specialty.length === 0 || specialty.length > 50) {
    alert("Please enter a valid specialty (max 50 characters).");
    return;
  }
  // Validate phone number (must be 10 digits)
  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }
  // Validate years of experience
  if (experience_years < 0 || isNaN(experience_years)) {
    alert("Please enter a valid number of years of experience.");
    return;
  }
  // Validate salary
  if (salary < 0 || isNaN(salary)) {
    alert("Please enter a valid salary.");
    return;
  }

  // Check if medic already exists by email or ID
  const { data: existingMedic, error: fetchError } = await supabase
    .from("medic")
    .select("medic_id")
    .or(`email.eq.${email},medic_id.eq.${medic_id}`)
    .single();

  if (existingMedic) {
    alert("A medic with that email or ID already exists.");
    return;
  }

  // Insert new medic into Supabase
  const { data, error } = await supabase.from("medic").insert([
    {
      medic_id,
      full_name,
      specialty,
      phone,
      email,
      experience_years,
      salary,
    },
  ]);

  // Show result and refresh list
  if (error) {
    alert("Error adding the medic: " + error.message);
  } else {
    alert("Medic added successfully!");
    form.reset(); // Clear form
    loadMedics(); // Refresh medic list
  }
});

// Get the medic section element from the DOM
const medicSection = document.querySelector(".section--medics");

/**
 * Creates a card element for a medic and sets up edit/remove handlers.
 * @param {Object} medic - The medic object to display
 * @returns {HTMLElement} - The card element
 */
function createMedicCard(medic) {
  const card = document.createElement("div");
  card.className = "section__item item item--medic";

  // Card HTML structure
  card.innerHTML = `
    <div class="item__header">
      <span class="item__value">${medic.medic_id}</span>
      <span class="item__value">${medic.full_name}</span>
      <span class="item__value">${medic.specialty}</span>
    </div>
    <div class="item__info">
      <div class="item__labels">
        <span class="item__label">Phone:</span>
        <span class="item__label">Email:</span>
        <span class="item__label">Years of experience:</span>
        <span class="item__label">Salary:</span>
      </div>
      <div class="item__values">
        <span class="item__value">${medic.phone}</span>
        <span class="item__value">${medic.email}</span>
        <span class="item__value">${medic.experience_years}</span>
        <span class="item__value">$${medic.salary.toFixed(2)}</span>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__button btn-edit">Edit</button>
      <button class="item__button btn-remove">Remove</button>
    </div>
  `;

  // Remove medic button handler
  const btnRemove = card.querySelector(".btn-remove");
  btnRemove.addEventListener("click", async () => {
    if (confirm(`Delete medic ${medic.full_name}?`)) {
      const { error } = await supabase
        .from("medic")
        .delete()
        .eq("medic_id", medic.medic_id);

      if (error) {
        // Foreign key constraint error (appointments assigned)
        if (
          error.message &&
          error.message.includes(
            'violates foreign key constraint "appointment_medic_id_fkey"'
          )
        ) {
          alert("Cannot delete medic: There are appointments assigned to this medic. Please delete or reassign those appointments first.");
        } else {
          alert("Error deleting medic: " + error.message);
        }
      } else {
        alert("Medic deleted successfully.");
        card.remove();
      }
    }
  });

  // Edit medic button handler
  const btnEdit = card.querySelector(".btn-edit");
  btnEdit.addEventListener("click", () => {
    openEditForm(medic, card);
  });

  return card;
}

/**
 * Loads all medics from Supabase and renders them.
 */
async function loadMedics() {
  const { data: medics, error } = await supabase.from("medic").select("*");

  if (error) {
    console.error("Error fetching medics:", error.message);
    return;
  }

  // Save the full medic list in window for filtering
  window._allMedics = medics || [];

  renderMedics(window._allMedics);
}

/**
 * Renders medic cards in the medic section.
 * Removes old cards and adds new ones for each medic.
 * @param {Array} medics - Array of medic objects
 */
function renderMedics(medics) {
  // Remove existing medic cards
  const existingCards = medicSection.querySelectorAll(
    ".section__item.item--medic"
  );
  existingCards.forEach((card) => card.remove());

  // Add new medic cards
  medics.forEach((medic) => {
    const card = createMedicCard(medic);
    medicSection.appendChild(card);
  });
}

// Search filter elements for medic search
const searchInput = document.getElementById("medic-search-input");
const searchBtn = document.getElementById("medic-search-btn");

/**
 * Filters medics by search query and renders the filtered list.
 */
function filterMedics() {
  const query = searchInput.value.trim().toLowerCase();
  if (!window._allMedics) return;
  if (!query) {
    renderMedics(window._allMedics);
    return;
  }
  // Filter by name, email, phone, or specialty
  const filtered = window._allMedics.filter(medic => {
    return (
      medic.full_name.toLowerCase().includes(query) ||
      medic.email.toLowerCase().includes(query) ||
      medic.phone.toLowerCase().includes(query) ||
      medic.specialty.toLowerCase().includes(query)
    );
  });
  renderMedics(filtered);
}

// Search button click handler
searchBtn.addEventListener("click", filterMedics);
// Search input Enter key handler
searchInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    filterMedics();
  }
});

// Load medics when the page is loaded
document.addEventListener("DOMContentLoaded", loadMedics);

/**
 * Opens the edit form for a medic card.
 * Replaces the card's HTML with a form pre-filled with the medic's data.
 * Allows editing and saving changes, or cancelling to restore the original card.
 * @param {Object} medic - The medic object to edit
 * @param {HTMLElement} card - The card element to replace
 */
function openEditForm(medic, card) {
  // Replace card content with an edit form
  card.innerHTML = `
    <form class="form__body edit-form">
      <div class="form__field">
        <label class="form__label">ID:</label>
        <input class="form__input" type="number" name="medic_id" value="${medic.medic_id}" disabled />
      </div>
      <div class="form__field">
        <label class="form__label">Full Name:</label>
        <input class="form__input" type="text" name="full_name" value="${medic.full_name}" required maxlength="100" />
      </div>
      <div class="form__field">
        <label class="form__label">Specialty:</label>
        <input class="form__input" type="text" name="specialty" value="${medic.specialty}" required maxlength="50" />
      </div>
      <div class="form__field">
        <label class="form__label">Phone:</label>
        <input class="form__input" type="tel" name="phone" value="${medic.phone}" pattern="\\d{10}" required />
      </div>
      <div class="form__field">
        <label class="form__label">Email:</label>
        <input class="form__input" type="email" name="email" value="${medic.email}" required maxlength="50" />
      </div>
      <div class="form__field">
        <label class="form__label">Years of Experience:</label>
        <input class="form__input" type="number" name="experience_years" value="${medic.experience_years}" min="0" required />
      </div>
      <div class="form__field">
        <label class="form__label">Salary:</label>
        <input class="form__input" type="number" step="0.01" name="salary" value="${medic.salary}" min="0" required />
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
    const newCard = createMedicCard(medic);
    card.replaceWith(newCard);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const updatedMedic = {
      full_name: formData.get("full_name").trim(),
      specialty: formData.get("specialty").trim(),
      phone: formData.get("phone").trim(),
      email: formData.get("email").trim(),
      experience_years: parseInt(formData.get("experience_years"), 10),
      salary: parseFloat(formData.get("salary")),
    };

    if (
      !updatedMedic.full_name ||
      updatedMedic.full_name.length > 100 ||
      !updatedMedic.specialty ||
      updatedMedic.specialty.length > 50 ||
      !/^\d{10}$/.test(updatedMedic.phone) ||
      !updatedMedic.email ||
      isNaN(updatedMedic.experience_years) ||
      updatedMedic.experience_years < 0 ||
      isNaN(updatedMedic.salary) ||
      updatedMedic.salary < 0
    ) {
      alert("Please check that all data is correct.");
      return;
    }

    const { error } = await supabase
      .from("medic")
      .update(updatedMedic)
      .eq("medic_id", medic.medic_id);

    if (error) {
      alert("Error updating medic: " + error.message);
      return;
    }

    alert("Medic updated successfully.");

    const newCard = createMedicCard({
      medic_id: medic.medic_id,
      ...updatedMedic,
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
      console.log("Parsed medic data:", parsedData); // Log parsed data for debugging
    },
    error: function (err) {
      // Log any error that occurs during parsing
      console.error("Error reading medic CSV:", err);
    },
  });
});

// Event listener for CSV upload button click
// When clicked, validate and import the parsed data into Supabase
document.getElementById("upload-btn").addEventListener("click", async function () {
  // If no parsed data, show alert and stop
  if (!parsedData.length) {
    alert("Please select a valid CSV file first.");
    return;
  }

  // Validate and clean data before inserting
  // Only rows with valid medic_id, full_name, specialty, phone, email, experience_years, and salary are kept
  const validRows = parsedData.filter(row => {
    return (
      row.medic_id && !isNaN(parseInt(row.medic_id)) &&
      row.full_name && row.full_name.length <= 100 &&
      row.specialty && row.specialty.length <= 50 &&
      row.phone && /^\d{10}$/.test(row.phone) &&
      row.email && row.email.length <= 50 &&
      row.experience_years && !isNaN(parseInt(row.experience_years)) &&
      row.salary && !isNaN(parseFloat(row.salary))
    );
  });

  // If no valid rows, show alert and stop
  if (!validRows.length) {
    alert("There are no valid rows to import.");
    return;
  }

  // Insert valid rows into Supabase medic table
  const { data, error } = await supabase
    .from("medic")
    .insert(validRows);

  // Show result and refresh medic list
  if (error) {
    console.error("Error inserting into Supabase medic:", error.message);
    alert("Error uploading data: " + error.message);
  } else {
    console.log("Medic data uploaded successfully:", data);
    alert("Medic data uploaded successfully to Supabase.");
    loadMedics();
  }
});
