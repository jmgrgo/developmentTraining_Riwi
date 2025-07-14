// Handle the sign up form submission
document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the entered name and validate it only contains letters and spaces
  const name = document.getElementById("signUpForm__name").value.trim();
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
    alert("Name can only contain letters and spaces.");
    return;
  }

  // Get the rest of the form values
  const email = document.getElementById("signUpForm__email").value.trim();
  const phone = document.getElementById("signUpForm__phone").value.trim();
  const password = document.getElementById("signUpForm__password").value.trim();
  const confirmPassword = document
    .getElementById("signUpForm__confirmPassword")
    .value.trim();
  const role = document.getElementById("signUpForm__role").value;

  // Check that the email and phone are unique
  try {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    const emailExists = users.some(u => u.email === email);
    if (emailExists) {
      alert("Email is already registered. Use another email.");
      return;
    }
    const phoneExists = users.some(u => u.phone === phone);
    if (phoneExists) {
      alert("Phone number is already registered. Use another number.");
      return;
    }
  } catch (err) {
    alert("Error checking email/phone. Please try again.");
    return;
  }

  // Check that passwords match
  if (password != confirmPassword) {
    alert("Password doesn't match, please verify again.");
    return;
  }

  // Generate date of admission and enroll number
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const dateOfAdmission = `${String(now.getDate()).padStart(2, "0")}-${
    months[now.getMonth()]
  }-${now.getFullYear()}`;

  const enrollNumber = Math.floor(
    10000000000000 + Math.random() * 90000000000000
  ).toString();

  // Send the new user data to the API
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      password,
      role,
      enrollNumber,
      dateOfAdmission,
    }),
  });

  alert("User created succesfully!");

  // Redirect to the login page
  loadRoute("/logIn");
});
