// Sign up form submission
document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the values form the DOM
  const name = document.getElementById("signUpForm__name").value.trim();

  // Validate if entered name contains only letters (JS RegEx)
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
    alert("Name can only contain letters and spaces.");
    return;
  }

  // Get the rest of the form values
  const password = document.getElementById("signUpForm__password").value.trim();
  const confirmPassword = document
    .getElementById("signUpForm__confirmPassword")
    .value.trim();
  const role = document.getElementById("signUpForm__role").value;

  // Check if the name is unique
  // Get data from the database
  try {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    const userExists = users.some((user) => user.name === name);

    // Validate existing user
    if (userExists) {
      alert("User is already registered. Use another name.");
      return;
    }
  } catch (err) {
    alert("Error checking user. Please try again.");
    return;
  }

  // Check if passwords match
  if (password != confirmPassword) {
    alert("Password doesn't match, please verify again.");
    return;
  }

  // Send the new user data to the database
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      password,
      role,
    }),
  });

  // Success message
  alert("User created succesfully!");

  // Redirect to login page
  loadRoute("/logIn");
});
