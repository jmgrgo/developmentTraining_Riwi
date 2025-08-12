// Import PapaParse for CSV parsing and Supabase client for database operations
import Papa from "papaparse";
import supabase from "../supabaseConfig";

// Get the patient form element (by querySelector or getElementById)
const form =
  document.querySelector("#new-patient-form form") ||
  document.getElementById("new-patient-form");

// Handle patient form submission (add new patient)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get and sanitize form values
  const patient_id = parseInt(document.getElementById("patient-id").value, 10);
  const full_name = document.getElementById("patient-name").value.trim();
  const birth_date = document.getElementById("patient-birth").value;
  const gender = document.getElementById("patient-gender").value;
  const phone = document.getElementById("patient-phone").value.trim();
  const email = document.getElementById("patient-email").value.trim();
  const address = document.getElementById("patient-address").value.trim();
  const blood_type = document.getElementById("patient-blood").value;

  // Validate patient ID
  if (isNaN(patient_id) || patient_id <= 0) {
    alert("Patient ID must be a valid positive number.");
    return;
  }
  // Validate full name
  if (!full_name || full_name.length > 100) {
    alert("Please enter a valid full name (max 100 characters).");
    return;
  }
  // Validate birth date
  if (!birth_date) {
    alert("Please select a birth date.");
    return;
  }
  const today = new Date();
  const birthDateObj = new Date(birth_date);
  today.setHours(0, 0, 0, 0);
  birthDateObj.setHours(0, 0, 0, 0);
  if (birthDateObj >= today) {
    alert("Birth date must be before today.");
    return;
  }
  // Validate gender
  if (!["M", "F", "Other"].includes(gender)) {
    alert("Please select a valid gender.");
    return;
  }
  // Validate phone number
  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }
  // Validate email
  if (!email || email.length > 50) {
    alert("Please enter a valid email (max 50 characters).");
    return;
  }

  // Check if patient already exists by email or ID
  const { data: existingPatient, error: fetchError } = await supabase
    .from("patient")
    .select("patient_id")
    .or(`email.eq.${email},patient_id.eq.${patient_id}`)
    .single();

  if (existingPatient) {
    alert("A patient with that email or ID already exists.");
    return;
  }

  // Insert new patient into Supabase
  const { data, error } = await supabase.from("patient").insert([
    {
      patient_id,
      full_name,
      birth_date,
      gender,
      phone,
      email,
      address,
      blood_type,
    },
  ]);

  // Show result and refresh patient list
  if (error) {
    alert("Error adding the patient: " + error.message);
  } else {
    alert("Patient added successfully!");
    form.reset(); // Clear form
    loadPatients(); // Refresh patient list
  }
});

// Get the patient section element from the DOM
const patientSection = document.querySelector(".section--patients");

/**
 * Creates a card element for a patient and sets up edit/remove handlers.
 * @param {Object} patient - The patient object to display
 * @returns {HTMLElement} - The card element
 */
function createPatientCard(patient) {
  const card = document.createElement("div");
  card.className = "section__item item item--patient";

  // Card HTML structure
  card.innerHTML = `
    <div class="item__header">
      <span class="item__value">${patient.blood_type || "-"}</span>
      <span class="item__value">${patient.full_name}</span>
      <span class="item__value">${patient.birth_date}</span>
    </div>
    <div class="item__info">
      <div class="item__labels">
        <span class="item__label">ID:</span>
        <span class="item__label">Gender:</span>
        <span class="item__label">Phone:</span>
        <span class="item__label">Email:</span>
        <span class="item__label">Address:</span>
      </div>
      <div class="item__values">
        <span class="item__value">${patient.patient_id}</span>
        <span class="item__value">${patient.gender}</span>
        <span class="item__value">${patient.phone}</span>
        <span class="item__value">${patient.email}</span>
        <span class="item__value">${patient.address || "-"}</span>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__button btn-edit">Edit</button>
      <button class="item__button btn-remove">Remove</button>
    </div>
  `;

  // Remove patient button handler
  card.querySelector(".btn-remove").addEventListener("click", async () => {
    if (confirm(`Delete patient ${patient.full_name}?`)) {
      const { error } = await supabase
        .from("patient")
        .delete()
        .eq("patient_id", patient.patient_id);

      if (error) {
        // Foreign key constraint error (appointments assigned)
        if (
          error.message &&
          error.message.includes(
            'violates foreign key constraint "appointment_patient_id_fkey"'
          )
        ) {
          alert("Cannot delete patient: There are appointments assigned to this patient. Please delete or reassign those appointments first.");
        } else {
          alert("Error deleting patient: " + error.message);
        }
      } else {
        alert("Patient deleted successfully.");
        card.remove();
      }
    }
  });

  // Edit patient button handler
  card.querySelector(".btn-edit").addEventListener("click", () => {
    openEditForm(patient, card);
  });

  return card;
}

/**
 * Loads all patients from Supabase and renders them.
 */
async function loadPatients() {
  const { data: patients, error } = await supabase.from("patient").select("*");

  if (error) {
    console.error("Error fetching patients:", error.message);
    return;
  }

  // Save the full patient list in window for filtering
  window._allPatients = patients || [];

  renderPatients(window._allPatients);
}

/**
 * Renders patient cards in the patient section.
 * Removes old cards and adds new ones for each patient.
 * @param {Array} patients - Array of patient objects
 */
function renderPatients(patients) {
  // Remove existing patient cards
  patientSection
    .querySelectorAll(".section__item.item--patient")
    .forEach((el) => el.remove());

  // Add new patient cards
  patients.forEach((patient) => {
    const card = createPatientCard(patient);
    patientSection.appendChild(card);
  });
}

// Search filter elements for patient search
const searchInput = document.getElementById("patient-search-input");
const searchBtn = document.getElementById("patient-search-btn");

/**
 * Filters patients by search query and renders the filtered list.
 */
function filterPatients() {
  const query = searchInput.value.trim().toLowerCase();
  if (!window._allPatients) return;
  if (!query) {
    renderPatients(window._allPatients);
    return;
  }
  // Filter by name, email, phone, or ID
  const filtered = window._allPatients.filter(patient => {
    return (
      patient.full_name.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.phone.toLowerCase().includes(query) ||
      String(patient.patient_id).includes(query)
    );
  });
  renderPatients(filtered);
}

// Search button click handler
searchBtn.addEventListener("click", filterPatients);
// Search input Enter key handler
searchInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    filterPatients();
  }
});

// Load patients when the page is loaded
document.addEventListener("DOMContentLoaded", loadPatients);

/**
 * Opens the edit form for a patient card.
 * Replaces the card's HTML with a form pre-filled with the patient's data.
 * Allows editing and saving changes, or cancelling to restore the original card.
 * @param {Object} patient - The patient object to edit
 * @param {HTMLElement} card - The card element to replace
 */
function openEditForm(patient, card) {
  card.innerHTML = `
    <form class="form__body edit-form">
      <div class="form__field">
        <label class="form__label">ID:</label>
        <input class="form__input" type="number" name="patient_id" value="${patient.patient_id}" disabled />
      </div>
      <div class="form__field">
        <label class="form__label">Full Name:</label>
        <input class="form__input" type="text" name="full_name" value="${patient.full_name}" required maxlength="100" />
      </div>
      <div class="form__field">
        <label class="form__label">Birth Date:</label>
        <input class="form__input" type="date" name="birth_date" value="${patient.birth_date}" required />
      </div>
      <div class="form__field">
        <label class="form__label">Gender:</label>
        <select class="form__input" name="gender" required>
          <option value="M" ${patient.gender === "M" ? "selected" : ""}>M</option>
          <option value="F" ${patient.gender === "F" ? "selected" : ""}>F</option>
          <option value="Other" ${patient.gender === "Other" ? "selected" : ""}>Other</option>
        </select>
      </div>
      <div class="form__field">
        <label class="form__label">Phone:</label>
        <input class="form__input" type="tel" name="phone" value="${patient.phone}" pattern="[0-9]{10}" required />
      </div>
      <div class="form__field">
        <label class="form__label">Email:</label>
        <input class="form__input" type="email" name="email" value="${patient.email}" required maxlength="50" />
      </div>
      <div class="form__field">
        <label class="form__label">Address:</label>
        <textarea class="form__input" name="address">${patient.address || ""}</textarea>
      </div>
      <div class="form__field">
        <label class="form__label">Blood Type:</label>
        <select class="form__input" name="blood_type">
          <option value="" ${!patient.blood_type ? "selected" : ""}>Select blood type</option>
          <option value="A+" ${patient.blood_type === "A+" ? "selected" : ""}>A+</option>
          <option value="A-" ${patient.blood_type === "A-" ? "selected" : ""}>A-</option>
          <option value="AB+" ${patient.blood_type === "AB+" ? "selected" : ""}>AB+</option>
          <option value="AB-" ${patient.blood_type === "AB-" ? "selected" : ""}>AB-</option>
          <option value="O+" ${patient.blood_type === "O+" ? "selected" : ""}>O+</option>
          <option value="O-" ${patient.blood_type === "O-" ? "selected" : ""}>O-</option>
        </select>
      </div>
      <div class="form__edit-buttons">
        <button type="submit" class="form__button">Save</button>
        <button type="button" class="form__button cancel-btn">Cancel</button>
      </div>
    </form>
  `;

  // Cancel button handler (restore card view)
  const form = card.querySelector(".edit-form");
  const cancelBtn = card.querySelector(".cancel-btn");

  cancelBtn.addEventListener("click", () => {
    const newCard = createPatientCard(patient);
    card.replaceWith(newCard);
  });

  // Save button handler (submit form)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const updatedPatient = {
      full_name: formData.get("full_name").trim(),
      birth_date: formData.get("birth_date"),
      gender: formData.get("gender"),
      phone: formData.get("phone").trim(),
      email: formData.get("email").trim(),
      address: formData.get("address").trim(),
      blood_type: formData.get("blood_type") || null,
    };

    // Validate updated data
    if (
      !updatedPatient.full_name ||
      updatedPatient.full_name.length > 100 ||
      !updatedPatient.birth_date ||
      !["M", "F", "Other"].includes(updatedPatient.gender) ||
      !/^\d{10}$/.test(updatedPatient.phone) ||
      !updatedPatient.email ||
      updatedPatient.email.length > 50
    ) {
      alert("Please check that all data is correct.");
      return;
    }

    // Update patient in Supabase
    const { error } = await supabase
      .from("patient")
      .update(updatedPatient)
      .eq("patient_id", patient.patient_id);

    if (error) {
      alert("Error updating patient: " + error.message);
      return;
    }

    alert("Patient updated successfully.");
    // Replace card with updated info
    const newCard = createPatientCard({
      patient_id: patient.patient_id,
      ...updatedPatient,
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
      console.log("Parsed patient data:", parsedData); // Log parsed data for debugging
    },
    error: function (err) {
      // Log any error that occurs during parsing
      console.error("Error reading patient CSV:", err);
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
  // Only rows with valid patient_id, full_name, birth_date, gender, phone, and email are kept
  const validRows = parsedData.filter(row => {
    return (
      row.patient_id && !isNaN(parseInt(row.patient_id)) &&
      row.full_name && row.full_name.length <= 100 &&
      row.birth_date &&
      ["M", "F", "Other"].includes(row.gender) &&
      row.phone && /^\d{10}$/.test(row.phone) &&
      row.email && row.email.length <= 50
    );
  });

  // If no valid rows, show alert and stop
  if (!validRows.length) {
    alert("There are no valid rows to import.");
    return;
  }

  // Insert valid rows into Supabase patient table
  const { data, error } = await supabase
    .from("patient")
    .insert(validRows);

  // Show result and refresh patient list
  if (error) {
    console.error("Error inserting into Supabase patient:", error.message);
    alert("Error uploading data: " + error.message);
  } else {
    console.log("Patient data uploaded successfully:", data);
    alert("Patient data uploaded successfully to Supabase.");
    loadPatients(); // Refresh patient list
  }
});
