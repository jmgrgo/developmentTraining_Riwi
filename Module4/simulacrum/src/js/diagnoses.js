// Import PapaParse for CSV parsing and Supabase client for database operations
import Papa from "papaparse";
import supabase from "../supabaseConfig.js";

// Get references to the diagnosis form and section in the DOM
const form = document.querySelector("#new-diagnosis-form form");
const diagnosesSection = document.querySelector(".section--diagnoses");

// Handle diagnosis form submission (add new diagnosis)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get and sanitize form values
  const diagnosis_id = parseInt(form.diagnosis_id.value.trim(), 10);
  const appointment_id = parseInt(form.appointment_id.value.trim(), 10);
  const medical_instructions = form.medical_instructions.value.trim();
  const medicine_recipe = form.medicine_recipe.value.trim();

  // Validate diagnosis ID
  if (isNaN(diagnosis_id) || diagnosis_id <= 0) {
    alert("Diagnosis ID must be a positive number.");
    return;
  }
  // Validate appointment ID
  if (isNaN(appointment_id) || appointment_id <= 0) {
    alert("Appointment ID must be a positive number.");
    return;
  }

  // Check if diagnosis already exists by ID
  const { data: existingDiagnosis } = await supabase
    .from("diagnosis")
    .select("diagnosis_id")
    .eq("diagnosis_id", diagnosis_id)
    .single();
  if (existingDiagnosis) {
    alert("A diagnosis with that ID already exists.");
    return;
  }

  // Check if appointment exists by ID
  const { data: appointmentExists } = await supabase
    .from("appointment")
    .select("appointment_id")
    .eq("appointment_id", appointment_id)
    .single();
  if (!appointmentExists) {
    alert("Appointment ID does not exist.");
    return;
  }

  // Insert new diagnosis into Supabase
  const { error } = await supabase.from("diagnosis").insert([
    {
      diagnosis_id,
      appointment_id,
      medical_instructions,
      medicine_recipe,
    },
  ]);

  // Show result and refresh list
  if (error) {
    alert("Error adding diagnosis: " + error.message);
  } else {
    alert("Diagnosis created successfully.");
    form.reset(); // Clear form
    loadDiagnoses(); // Refresh diagnosis list
  }
});

/**
 * Creates a card element for a diagnosis and sets up edit/remove handlers.
 * @param {Object} diagnosis - The diagnosis object to display
 * @returns {HTMLElement} - The card element
 */
function createDiagnosisCard(diagnosis) {
  const card = document.createElement("div");
  card.className = "section__item item item--diagnosis";

  // Card HTML structure
  card.innerHTML = `
    <div class="item__header">
      <span class="item__value">${diagnosis.diagnosis_id}</span>
      <span class="item__value">${diagnosis.appointment_id}</span>
    </div>
    <div class="item__info">
      <div class="item__group">
        <span class="item__label">Medical Instructions:</span>
        <span class="item__value">${diagnosis.medical_instructions || "-"}</span>
      </div>
      <div class="item__group">
        <span class="item__label">Medicine Recipe:</span>
        <span class="item__value">${diagnosis.medicine_recipe || "-"}</span>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__button btn-edit">Edit</button>
      <button class="item__button btn-remove">Remove</button>
    </div>
  `;

  // Remove diagnosis button handler
  card.querySelector(".btn-remove").addEventListener("click", async () => {
    if (confirm(`Delete diagnosis ${diagnosis.diagnosis_id}?`)) {
      const { error } = await supabase
        .from("diagnosis")
        .delete()
        .eq("diagnosis_id", diagnosis.diagnosis_id);

      if (error) {
        alert("Error deleting: " + error.message);
      } else {
        card.remove();
      }
    }
  });

  // Edit diagnosis button handler
  card.querySelector(".btn-edit").addEventListener("click", () => {
    openEditForm(diagnosis, card);
  });

  return card;
}

/**
 * Loads all diagnoses from Supabase and renders them.
 */
async function loadDiagnoses() {
  const { data, error } = await supabase.from("diagnosis").select("*");

  if (error) {
    console.error("Error loading diagnoses:", error.message);
    return;
  }

  // Save the full diagnosis list in window for filtering
  window._allDiagnoses = data || [];

  renderDiagnoses(window._allDiagnoses);
}

/**
 * Renders diagnosis cards in the diagnoses section.
 * Removes old cards and adds new ones for each diagnosis.
 * @param {Array} diagnoses - Array of diagnosis objects
 */
function renderDiagnoses(diagnoses) {
  // Remove existing diagnosis cards
  const oldCards = diagnosesSection.querySelectorAll(".item--diagnosis");
  oldCards.forEach((c) => c.remove());

  // Add new diagnosis cards
  diagnoses.forEach((diagnosis) => {
    const card = createDiagnosisCard(diagnosis);
    diagnosesSection.appendChild(card);
  });
}

// Search filter elements for diagnosis search
const searchInput = document.getElementById("diagnosis-search-input");
const searchBtn = document.getElementById("diagnosis-search-btn");

/**
 * Filters diagnoses by search query and renders the filtered list.
 */
function filterDiagnoses() {
  const query = searchInput.value.trim().toLowerCase();
  if (!window._allDiagnoses) return;
  if (!query) {
    renderDiagnoses(window._allDiagnoses);
    return;
  }
  // Filter by diagnosis ID, appointment ID, medical instructions, or medicine recipe
  const filtered = window._allDiagnoses.filter(diagnosis => {
    return (
      String(diagnosis.diagnosis_id).includes(query) ||
      String(diagnosis.appointment_id).includes(query) ||
      (diagnosis.medical_instructions && diagnosis.medical_instructions.toLowerCase().includes(query)) ||
      (diagnosis.medicine_recipe && diagnosis.medicine_recipe.toLowerCase().includes(query))
    );
  });
  renderDiagnoses(filtered);
}

// Search button click handler
searchBtn.addEventListener("click", filterDiagnoses);
// Search input Enter key handler
searchInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    filterDiagnoses();
  }
});

/**
 * Opens the edit form for a diagnosis card.
 * Replaces the card's HTML with a form pre-filled with the diagnosis's data.
 * Allows editing and saving changes, or cancelling to restore the original card.
 * @param {Object} diagnosis - The diagnosis object to edit
 * @param {HTMLElement} card - The card element to replace
 */
function openEditForm(diagnosis, card) {
  // Replace card content with an edit form
  card.innerHTML = `
    <form class="form__body edit-form">
      <div class="form__field">
        <label class="form__label">Diagnosis ID:</label>
        <input class="form__input" type="text" name="diagnosis_id" value="${diagnosis.diagnosis_id}" disabled />
      </div>
      <div class="form__field">
        <label class="form__label">Appointment ID:</label>
        <input class="form__input" type="number" name="appointment_id" value="${diagnosis.appointment_id}" required />
      </div>
      <div class="form__field">
        <label class="form__label">Medical Instructions:</label>
        <textarea class="form__input" name="medical_instructions">${diagnosis.medical_instructions || ""}</textarea>
      </div>
      <div class="form__field">
        <label class="form__label">Medicine Recipe:</label>
        <textarea class="form__input" name="medicine_recipe">${diagnosis.medicine_recipe || ""}</textarea>
      </div>
      <div class="form__edit-buttons">
        <button type="submit" class="form__button">Save</button>
        <button type="button" class="form__button cancel-btn">Cancel</button>
      </div>
    </form>
  `;

  // Get references to the form and cancel button
  const form = card.querySelector("form");
  const cancelBtn = form.querySelector(".cancel-btn");

  // Cancel button handler (restore card view)
  cancelBtn.addEventListener("click", () => {
    const newCard = createDiagnosisCard(diagnosis);
    card.replaceWith(newCard);
  });

  // Save button handler (submit form)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get updated values from the form
    const formData = new FormData(form);
    const updatedAppointmentId = parseInt(formData.get("appointment_id"), 10);
    const updatedDiagnosis = {
      appointment_id: updatedAppointmentId,
      medical_instructions: formData.get("medical_instructions").trim(),
      medicine_recipe: formData.get("medicine_recipe").trim(),
    };

    // Validate updated appointment ID
    if (isNaN(updatedAppointmentId) || updatedAppointmentId <= 0) {
      alert("Invalid Appointment ID.");
      return;
    }

    // Check if appointment exists
    const { data: appointmentExists } = await supabase
      .from("appointment")
      .select("appointment_id")
      .eq("appointment_id", updatedAppointmentId)
      .single();

    if (!appointmentExists) {
      alert("Appointment ID does not exist.");
      return;
    }

    // Update diagnosis in Supabase
    const { error } = await supabase
      .from("diagnosis")
      .update(updatedDiagnosis)
      .eq("diagnosis_id", diagnosis.diagnosis_id);

    // Show result and update card
    if (error) {
      alert("Error updating: " + error.message);
    } else {
      alert("Diagnosis updated.");
      const newCard = createDiagnosisCard({
        diagnosis_id: diagnosis.diagnosis_id,
        ...updatedDiagnosis,
      });
      card.replaceWith(newCard);
    }
  });
}

// Load diagnoses when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadDiagnoses();
});


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
      console.log("Parsed diagnosis data:", parsedData); // Log parsed data for debugging
    },
    error: function (err) {
      // Log any error that occurs during parsing
      console.error("Error reading diagnosis CSV:", err);
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

  // Validate and clean the data before inserting
  // Only rows with valid diagnosis_id, appointment_id, and string fields are kept
  const validRows = parsedData.filter(row => {
    return (
      row.diagnosis_id && !isNaN(parseInt(row.diagnosis_id)) &&
      row.appointment_id && !isNaN(parseInt(row.appointment_id)) &&
      typeof row.medical_instructions === "string" &&
      typeof row.medicine_recipe === "string"
    );
  });

  // If no valid rows, show alert and stop
  if (!validRows.length) {
    alert("There are no valid rows to import.");
    return;
  }

  // Insert valid rows into Supabase diagnosis table
  const { data, error } = await supabase
    .from("diagnosis")
    .insert(validRows);

  // Show result and refresh diagnosis list
  if (error) {
    console.error("Error inserting into Supabase diagnosis:", error.message);
    alert("Error uploading data: " + error.message);
  } else {
    console.log("Diagnosis data uploaded successfully:", data);
    alert("Diagnosis data uploaded successfully to Supabase.");
    loadDiagnoses(); // Refresh diagnosis list
  }
});
