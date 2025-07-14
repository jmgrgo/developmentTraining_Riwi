
// Fetch all users from the API
async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
}


// Handle the login form submission
document.getElementById("logInForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Fetch all users from the API
  const users = await getUsers();

  // Get the entered email and password
  const email = document.getElementById("logInForm__email").value.trim();
  const password = document.getElementById("logInForm__password").value.trim();

  // Find a user with matching email and password
  const existingUser = users.find(
    (user) => user.email == email && user.password == password
  );

  if (!existingUser) {
    // If no user found, show error
    alert("Incorrect email or password.");
  } else {
    // If user found, store user info in localStorage
    localStorage.setItem("auth", "true");
    localStorage.setItem("name", existingUser.name);
    localStorage.setItem("email", existingUser.email);
    localStorage.setItem("password", existingUser.password);
    localStorage.setItem("role", existingUser.role);
    localStorage.setItem("phone", existingUser.phone);
    localStorage.setItem("enrollNumber", existingUser.enrollNumber);
    localStorage.setItem("dateOfAdmission", existingUser.dateOfAdmission);

    alert(`Welcome ${existingUser.name}!`);

    // Redirect to the home page
    loadRoute("/");
  }
});
