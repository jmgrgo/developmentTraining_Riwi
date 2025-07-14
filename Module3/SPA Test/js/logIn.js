async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
}

document.getElementById("logInForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const users = await getUsers();

  const email = document.getElementById("logInForm__email").value.trim();
  const password = document.getElementById("logInForm__password").value.trim();

  const existingUser = users.find(
    (user) => user.email == email && user.password == password
  );

  if (!existingUser) {
    alert("Incorrect email or password.");
  } else {
    localStorage.setItem("auth", "true");
    localStorage.setItem("name", existingUser.name);
    localStorage.setItem("email", existingUser.email);
    localStorage.setItem("password", existingUser.password);
    localStorage.setItem("role", existingUser.role);
    localStorage.setItem("phone", existingUser.phone);
    localStorage.setItem("enrollNumber", existingUser.enrollNumber);
    localStorage.setItem("dateOfAdmission", existingUser.dateOfAdmission);

    alert(`Welcome ${existingUser.name}!`);

    loadRoute("/");
  }
});
