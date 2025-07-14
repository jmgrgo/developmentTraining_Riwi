// Log In form submission
  document.getElementById("logInForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get users data from the database
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();;
  
    // Get the entered email and password
    const name = document.getElementById("logInForm__name").value.trim();
    const password = document.getElementById("logInForm__password").value.trim();
  
    // Find a user with matching email and password
    const existingUser = users.find(
      (user) => user.name == name && user.password == password
    );
  
    if (!existingUser) {
      // If no user found, show error
      alert("Incorrect name or password.");
    } else {
      // If user found, store user info in localStorage
      localStorage.setItem("auth", "true");
      localStorage.setItem("name", existingUser.name);
      localStorage.setItem("password", existingUser.password);
      localStorage.setItem("role", existingUser.role);
  
      // Success message
      alert(`Welcome ${existingUser.name}!`);
  
      // Redirect to the home page
      loadRoute("/");
    }
  });
  