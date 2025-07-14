document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signUpForm__name").value.trim();
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
    alert("El nombre solo puede contener letras y espacios.");
    return;
  }

  const email = document.getElementById("signUpForm__email").value.trim();
  const phone = document.getElementById("signUpForm__phone").value.trim();
  const password = document.getElementById("signUpForm__password").value.trim();
  const confirmPassword = document
    .getElementById("signUpForm__confirmPassword")
    .value.trim();
  const role = document.getElementById("signUpForm__role").value;

  if (password != confirmPassword) {
    alert("Password doesn't match, please verify again.");
    return;
  }

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

  loadRoute("/logIn");
});
