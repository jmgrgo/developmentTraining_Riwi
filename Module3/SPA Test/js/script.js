
// Define the routes for the SPA
const routes = {
  "/": "./pages/courses.html",
  "/logIn": "./pages/logIn.html",
  "/signUp": "./pages/signUp.html",
  "/dashboard": "./pages/dashboard.html",
};

// Load the default route (home/courses) on page load
loadRoute("/");

// Listen for clicks on elements with [data-link] to handle SPA navigation
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    loadRoute(e.target.getAttribute("href"));
  }
});

// Function to load a route and inject its HTML and dynamic scripts/styles
async function loadRoute(path) {
  const route = routes[path];
  const html = await fetch(route).then((response) => response.text());

  // Inject the HTML into the main content area
  document.getElementById("appContent").innerHTML = html;
  history.pushState({}, "", path);

  // Remove any previously loaded dynamic scripts and styles
  const currentScripts = document.querySelectorAll("script[data-dynamic]");
  const currentStyles = document.querySelectorAll("link[data-dynamic]");
  currentScripts.forEach((script) => script.remove());
  currentStyles.forEach((link) => link.remove());

  // Dynamically load the appropriate JS and CSS for the current page
  if (path == "/") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/courses.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/courses.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  } else if (path == "/signUp") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/signUp.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/signUp.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  }
  else if (path == "/logIn") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/logIn.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/logIn.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  }
  else if (path == "/dashboard") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/dashboard.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/dashboard.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  }
  // Update the navigation bar based on login status
  loggedUser();
}

// Expose loadRoute to the global window object for navigation
window.loadRoute = loadRoute;
window.addEventListener("popstate", () => loadRoute(location.pathname));

// Update the navigation bar depending on whether the user is logged in
function loggedUser() {
  const isLogged = localStorage.getItem("auth") || null;
  const navLogin = document.getElementById("navLogin");
  if (!navLogin) return;

  if (isLogged) {
    // If logged in, show logout and dashboard links
    const loggedUserName = localStorage.getItem("name");
    navLogin.innerHTML = `
      <li class="logged__anchor"><a id="navLogin__logOut" href="#" data-link>Log out</a></li>
      <li class="logged__anchor"><a href="/dashboard" data-link>${loggedUserName}</a></li>
    `;

    // Handle logout click: clear user data and redirect to courses
    document.getElementById("navLogin__logOut").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("auth");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("role");
      localStorage.removeItem("enrollNumber");
      localStorage.removeItem("dateOfAdmission");
      loadRoute("/courses");
    });
  } else {
    // If not logged in, show sign up and log in links
    navLogin.innerHTML = `
      <li class="navLogin__anchor"><a href="/signUp" data-link>Sign up</a></li>
      <li class="navLogin__anchor"><a href="/logIn" data-link>Log in</a></li>
    `;
  }
}
