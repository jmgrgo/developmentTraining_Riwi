// Sign up form
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // DOM elements
  const signUpForm = document.getElementById("signUpForm");
  const signUpNameInput = document.getElementById("signUpForm__name");
  const signUpAgeInput = document.getElementById("signUpForm__age");
  const errorSpans = signUpForm.querySelectorAll(".errorMessage");

  // Remove all error messages and reset input borders
  errorSpans.forEach((span) => {
    span.textContent = "";
    span.classList.remove("active");
  });

  signUpNameInput.style.boxShadow = "0px 1px 3px black";
  signUpAgeInput.style.boxShadow = "0px 1px 3px black";

  // Input values
  const name = signUpNameInput.value.trim();
  const age = signUpAgeInput.value;

  // Input validations
  let hasError = false;

  // Name Validation
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const nameErrorMessage = !name
    ? "Please enter a name."
    : !nameRegex.test(name)
    ? "Only letters allowed."
    : "";
  if (nameErrorMessage) {
    errorSpans[0].textContent = nameErrorMessage;
    errorSpans[0].classList.add("active");
    signUpNameInput.style.boxShadow = "0px 1px 4px red";
    hasError = true;
  }

  // Age validation
  const ageErrorMessage = !age
    ? "Please enter an age."
    : (age < 0 || age > 200)
    ? "Use a valid age."
    : "";
  if (ageErrorMessage) {
    errorSpans[1].textContent = ageErrorMessage;
    errorSpans[1].classList.add("active");
    signUpAgeInput.style.boxShadow = "0px 1px 4px red";
    hasError = true;
  }

  // Stop if any error
  if (hasError) {
    return;
  }

  // Send the data to local storage
  localStorage.setItem("name", name);
  localStorage.setItem("age", age);

  // Increment counter in sessionStorage
  let counter = sessionStorage.getItem("usageCounter");
  counter = counter ? parseInt(counter) + 1 : 1;
  sessionStorage.setItem("usageCounter", counter);

  // Show a success message
  alert("Sign up successful!");

  // Clear form fields
  signUpForm.reset();

  // Update shown values
  showStoredInfo();
  showCounter();
});

// Clear local storage
const clearStorageButton = document.getElementById("clearStorage");

clearStorageButton.addEventListener("click", () => {
  // Validate if there is data storaged
  const hasInfo = localStorage.getItem("name") && localStorage.getItem("age");

  // Remove data from local storage
  localStorage.removeItem("name");
  localStorage.removeItem("age");

  // Update showed info
  showStoredInfo();

  if (hasInfo) {
    alert("User information cleared!");
  } else {
    alert("No user information to clear.");
  }
});

// Show stored info function
function showStoredInfo() {
  // DOM elements
  const appUserTitles = document.querySelectorAll(".appUser__title");
  const appUserName = document.getElementById("appUser__name");
  const appUserAge = document.getElementById("appUser__age");

  // Clear printed info
  appUserName.textContent = "";
  appUserAge.textContent = "";

  // Check if theres stored data
  if (localStorage.getItem("name") && localStorage.getItem("age")) {
    // Display "titles"
    appUserTitles.forEach((title) => (title.style.display = "inline"));
    // Push info to the DOM
    appUserName.textContent = localStorage.getItem("name");
    appUserAge.textContent = localStorage.getItem("age");

    // Show clear button
    clearStorageButton.style.display = "block";
  } else {
    // When there is no info
    // Hide titles
    appUserTitles.forEach((title) => (title.style.display = "none"));

    // Show message
    appUserName.textContent = "No user information found.";
    appUserAge.textContent = "";

    // Hide clear button
    clearStorageButton.style.display = "none";
  }
}

// Show counter function
function showCounter() {
  const appCounterValue = document.getElementById("appCounter__value");

  // Push info
  appCounterValue.textContent = sessionStorage.getItem("usageCounter") || 0;
}

// Show stored info
showStoredInfo();

// Show counter info
showCounter();
