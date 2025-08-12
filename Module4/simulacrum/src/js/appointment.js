// Import PapaParse for CSV parsing and Supabase client for database operations
import Papa from "papaparse";
import supabase from "../supabaseConfig.js";

// Get references to the appointment form and section in the DOM
const form = document.querySelector("#new-appointment-form form");
const appointmentsSection = document.querySelector(".section--appointments");

// Handle appointment form submission (add new appointment)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get and sanitize form values
  const appointment_id = parseInt(form.appointment_id.value.trim(), 10);
  const patient_id = parseInt(form.patient_id.value.trim(), 10);
  const medic_id = parseInt(form.medic_id.value.trim(), 10);
  const date = form.date.value;
  const time = form.time.value;
  const reason = form.reason.value.trim();
  const state = form.state.value.trim();

  // Validate required fields
  if (
    isNaN(appointment_id) ||
    appointment_id <= 0 ||
    isNaN(patient_id) ||
    patient_id <= 0 ||
    isNaN(medic_id) ||
    medic_id <= 0 ||
    !date ||
    !time
  ) {
    alert("Please complete all required fields with valid data.");
    return;
  }

  // Check if appointment already exists by ID
  const { data: existApp } = await supabase
    .from("appointment")
    .select("appointment_id")
    .eq("appointment_id", appointment_id)
    .single();
  if (existApp) {
    alert("An appointment with that ID already exists.");
    return;
  }

  // Check if patient exists by ID
  const { data: existPatient } = await supabase
    .from("patient")
    .select("patient_id")
    .eq("patient_id", patient_id)
    .single();
  if (!existPatient) {
    alert("Patient ID does not exist.");
    return;
  }

  // Check if medic exists by ID
  const { data: existMedic } = await supabase
    .from("medic")
    .select("medic_id")
    .eq("medic_id", medic_id)
    .single();

  if (!existMedic) {
    alert("Medic ID does not exist.");
    return;
  }

  // Insert new appointment into Supabase
  const { error } = await supabase.from("appointment").insert([
    {
      appointment_id,
      patient_id,
      medic_id,
      date,
      time,
      reason,
      state: state || null,
    },
  ]);

  // Show result and refresh list
  if (error) {
    alert("Error creating appointment: " + error.message);
  } else {
    alert("Appointment created successfully.");
    form.reset(); // Clear form
    loadAppointments(); // Refresh appointment list
  }
});

/**
 * Creates a card element for an appointment and sets up edit/remove handlers.
 * @param {Object} app - The appointment object to display
 * @returns {HTMLElement} - The card element
 */
function createAppointmentCard(app) {
  const card = document.createElement("div");
  card.className = "section__item item item--appointment";

  // Card HTML structure
  card.innerHTML = `
    <div class="item__header">
      <span class="item__value">${app.appointment_id}</span>
      <span class="item__value">${app.patient_id}</span>
      <span class="item__value">${app.medic_id}</span>
    </div>
    <div class="item__info">
      <div class="item__labels">
        <span class="item__label">Date:</span>
        <span class="item__label">Time:</span>
        <span class="item__label">Reason:</span>
        <span class="item__label">State:</span>
      </div>
      <div class="item__values">
        <span class="item__value">${app.date}</span>
        <span class="item__value">${app.time}</span>
        <span class="item__value">${app.reason || "-"}</span>
        <span class="item__value">${app.state || "-"}</span>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__button btn-edit">Edit</button>
      <button class="item__button btn-remove">Remove</button>
    </div>
  `;

  // Remove appointment button handler
  card.querySelector(".btn-remove").addEventListener("click", async () => {
    if (confirm(`Delete appointment ${app.appointment_id}?`)) {
      const { error } = await supabase
        .from("appointment")
        .delete()
        .eq("appointment_id", app.appointment_id);

      if (error) {
        alert("Error deleting: " + error.message);
      } else {
        alert("Appointment deleted successfully.");
        card.remove();
      }
    }
  });

  // Edit appointment button handler
  card.querySelector(".btn-edit").addEventListener("click", () => {
    openEditForm(app, card);
  });

  return card;
}

/**
 * Loads all appointments from Supabase and renders them.
 */
async function loadAppointments() {
  const { data, error } = await supabase.from("appointment").select("*");

  if (error) {
    console.error("Error loading appointments:", error.message);
    return;
  }

  // Save the full appointment list in window for filtering
  window._allAppointments = data || [];

  renderAppointments(window._allAppointments);
}

/**
 * Renders appointment cards in the appointments section.
 * Removes old cards and adds new ones for each appointment.
 * @param {Array} appointments - Array of appointment objects
 */
function renderAppointments(appointments) {
  // Remove existing appointment cards
  appointmentsSection
    .querySelectorAll(".item--appointment")
    .forEach((c) => c.remove());

  // Add new appointment cards
  appointments.forEach((app) =>
    appointmentsSection.appendChild(createAppointmentCard(app))
  );
}

// Search filter elements for appointment search
const searchInput = document.getElementById("appointment-search-input");
const searchBtn = document.getElementById("appointment-search-btn");

/**
 * Filters appointments by search query and renders the filtered list.
 */
function filterAppointments() {
  const query = searchInput.value.trim().toLowerCase();
  if (!window._allAppointments) return;
  if (!query) {
    renderAppointments(window._allAppointments);
    return;
  }
  // Filter by appointment ID, patient ID, medic ID, date, time, reason, or state
  const filtered = window._allAppointments.filter(app => {
    return (
      String(app.appointment_id).includes(query) ||
      String(app.patient_id).includes(query) ||
      String(app.medic_id).includes(query) ||
      (app.date && app.date.toLowerCase().includes(query)) ||
      (app.time && app.time.toLowerCase().includes(query)) ||
      (app.reason && app.reason.toLowerCase().includes(query)) ||
      (app.state && app.state.toLowerCase().includes(query))
    );
  });
  renderAppointments(filtered);
}

// Search button click handler
searchBtn.addEventListener("click", filterAppointments);
// Search input Enter key handler
searchInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    filterAppointments();
  }
});

/**
 * Opens the edit form for an appointment card.
 * Replaces the card's HTML with a form pre-filled with the appointment's data.
 * Allows editing and saving changes, or cancelling to restore the original card.
 * @param {Object} app - The appointment object to edit
 * @param {HTMLElement} card - The card element to replace
 */
function openEditForm(app, card) {
  // Replace card content with an edit form
  card.innerHTML = `
    <form class="form__body edit-form">
      <div class="form__field">
        <label>ID:</label>
        <input class="form__input" name="appointment_id" value="${app.appointment_id}" disabled />
      </div>
      <div class="form__field">
        <label>Patient ID:</label>
        <input class="form__input" type="number" name="patient_id" value="${app.patient_id}" required />
      </div>
      <div class="form__field">
        <label>Medic ID:</label>
        <input class="form__input" type="number" name="medic_id" value="${app.medic_id}" required />
      </div>
      <div class="form__field">
        <label>Date:</label>
        <input class="form__input" type="date" name="date" value="${app.date}" required />
      </div>
      <div class="form__field">
        <label>Time:</label>
        <input class="form__input" type="time" name="time" value="${app.time}" required />
      </div>
      <div class="form__field">
        <label>Reason:</label>
        <textarea class="form__input" name="reason">${app.reason || ""}</textarea>
      </div>
      <div class="form__field">
        <label class="form__label">State:</label>
        <select class="form__input" name="state" required>
          <option value="Pending" ${app.state === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Completed" ${app.state === "Completed" ? "selected" : ""}>Completed</option>
          <option value="Canceled" ${app.state === "Canceled" ? "selected" : ""}>Canceled</option>
        </select>
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
    card.replaceWith(createAppointmentCard(app));
  });

  // Save button handler (submit form)
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get updated values from the form
    const fdata = new FormData(editForm);
    const updated = {
      patient_id: parseInt(fdata.get("patient_id"), 10),
      medic_id: parseInt(fdata.get("medic_id"), 10),
      date: fdata.get("date"),
      time: fdata.get("time"),
      reason: fdata.get("reason").trim(),
      state: fdata.get("state").trim() || null,
    };

    // Validate required fields
    if (
      isNaN(updated.patient_id) ||
      updated.patient_id <= 0 ||
      isNaN(updated.medic_id) ||
      updated.medic_id <= 0 ||
      !updated.date ||
      !updated.time
    ) {
      alert("Please complete the required fields correctly.");
      return;
    }

    // Check if patient exists
    const { data: patExist } = await supabase
      .from("patient")
      .select("patient_id")
      .eq("patient_id", updated.patient_id)
      .single();
    if (!patExist) return alert("Patient ID does not exist.");

    // Check if medic exists
    const { data: medExist } = await supabase
      .from("medic")
      .select("medic_id")
      .eq("medic_id", updated.medic_id)
      .single();
    if (!medExist) return alert("Medic ID does not exist.");

    // Update appointment in Supabase
    const { error } = await supabase
      .from("appointment")
      .update(updated)
      .eq("appointment_id", app.appointment_id);

    // Show result and update card
    if (error) {
      alert("Error updating: " + error.message);
    } else {
      alert("Appointment updated.");
      card.replaceWith(
        createAppointmentCard({
          appointment_id: app.appointment_id,
          ...updated,
        })
      );
    }
  });
}

// Load appointments when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadAppointments();
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
      console.log("Parsed appointment data:", parsedData); // Log parsed data for debugging
    },
    error: function (err) {
      // Log any error that occurs during parsing
      console.error("Error reading appointment CSV:", err);
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
  // Only rows with valid appointment_id, patient_id, medic_id, date, time, reason, and state are kept
  const validRows = [];
  for (const row of parsedData) {
    // Basic field validation
    if (
      row.appointment_id && !isNaN(parseInt(row.appointment_id)) &&
      row.patient_id && !isNaN(parseInt(row.patient_id)) &&
      row.medic_id && !isNaN(parseInt(row.medic_id)) &&
      row.date && row.time &&
      typeof row.reason === "string" &&
      ["Pending", "Completed", "Canceled"].includes(row.state)
    ) {
      // Check existence of patient and medic
      const { data: existPatient } = await supabase
        .from("patient")
        .select("patient_id")
        .eq("patient_id", parseInt(row.patient_id))
        .single();
      const { data: existMedic } = await supabase
        .from("medic")
        .select("medic_id")
        .eq("medic_id", parseInt(row.medic_id))
        .single();
      const { data: existApp } = await supabase
        .from("appointment")
        .select("appointment_id")
        .eq("appointment_id", parseInt(row.appointment_id))
        .single();
      if (!existPatient) {
        alert(`Patient ID ${row.patient_id} does not exist. Row skipped.`);
        continue;
      }
      if (!existMedic) {
        alert(`Medic ID ${row.medic_id} does not exist. Row skipped.`);
        continue;
      }
      if (existApp) {
        alert(`Appointment ID ${row.appointment_id} already exists. Row skipped.`);
        continue;
      }
      validRows.push({
        appointment_id: parseInt(row.appointment_id),
        patient_id: parseInt(row.patient_id),
        medic_id: parseInt(row.medic_id),
        date: row.date,
        time: row.time,
        reason: row.reason,
        state: row.state
      });
    }
  }

  // If no valid rows, show alert and stop
  if (!validRows.length) {
    alert("There are no valid rows to import.");
    return;
  }

  // Insert valid rows into Supabase appointment table
  const { data, error } = await supabase
    .from("appointment")
    .insert(validRows);

  // Show result and refresh appointment list
  if (error) {
    console.error("Error inserting into Supabase appointment:", error.message);
    alert("Error uploading data: " + error.message);
  } else {
    console.log("Appointment data uploaded successfully:", data);
    alert("Appointment data uploaded successfully to Supabase.");
    loadAppointments();
  }
});
