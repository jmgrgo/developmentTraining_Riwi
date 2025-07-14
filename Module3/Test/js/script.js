// Define the routes for the SPA
const routes = {
  "/": "./pages/home.html",
  "/events": "./pages/events.html",
  "/logIn": "./pages/logIn.html",
  "/signUp": "./pages/signUp.html",
  "/dashboard": "./pages/dashboard.html",
  "/createEvents": "./pages/createEvents.html",
  "/editEvents": "./pages/editEvents.html",
};

// Load the default route (home) on page load
loadRoute("/");

// Listen for clicks on elements with [data-link] to handle SPA navigation
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    loadRoute(e.target.getAttribute("href"));
    loggedUser();
  }
});

// Function to load a route

async function loadRoute(path) {
  const route = routes[path];
  const html = await fetch(route).then((response) => response.text());

  // Add the HTML into the main content area
  document.getElementById("appContent").innerHTML = html;
  history.pushState({}, "", path);

  // Remove previously loaded dynamic scripts and styles
  const currentScripts = document.querySelectorAll("script[data-dynamic]");
  const currentStyles = document.querySelectorAll("link[data-dynamic]");
  currentScripts.forEach((script) => script.remove());
  currentStyles.forEach((link) => link.remove());

  // Dynamically load the specific JS and CSS for the current page
  if (path == "/home") {
    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/home.css";

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

  } else if (path == "/events") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/events.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/events.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);

  } else if (path == "/logIn") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/logIn.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/logIn.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  } else if (path == "/dashboard") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/dashboard.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/dashboard.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  } else if (path == "/createEvents") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/createEvents.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/createEvents.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  } else if (path == "/editEvents") {
    newScript = document.createElement("script");
    newScript.dataset.dynamic = true;
    newScript.src = "./js/editEvents.js";

    newStyles = document.createElement("link");
    newStyles.dataset.dynamic = true;
    newStyles.rel = "stylesheet";
    newStyles.href = "./css/editEvents.css";

    document.body.appendChild(newScript);
    document.head.appendChild(newStyles);
  }

  // Update the navigation bar based on login status
  loggedUser();
}

// Expose loadRoute to the global window object
window.loadRoute = loadRoute;
window.addEventListener("popstate", () => loadRoute(location.pathname));

// Update the navigation bar depending on whether the user is logged in or not
function loggedUser() {
  const isLogged = localStorage.getItem("auth") || null;
  const navLogin = document.getElementById("navLogin");

  // if (!navLogin) return; PENDING DELETE

  // Check if there's a logged user
  if (isLogged) {
    const loggedUserName = localStorage.getItem("name");
    const loggedRole = localStorage.getItem("role");

    // If the user is logged in, check their role
    if (loggedRole == "admin") {
      // If logged in, show logout, dashboard, and admin-exclusive pages (createEvents, editEvents).
      navLogin.innerHTML = `
        <li class="logged__anchor"><a id="navLogin__logOut" href="#" data-link>Log Out</a></li>
        <li class="logged__anchor"><a id="navLogin__name" href="/dashboard" data-link>${loggedUserName}</a></li>
        <li class="logged__anchor"><a id="navLogin__createEvents" href="/createEvents" data-link>Create events</a></li>
        <li class="logged__anchor"><a id="navLogin__editEvents" href="/editEvents" data-link>Edit events</a></li>
      `;
    } else {
      // If logged in as a user, show logout and dashboard
      navLogin.innerHTML = `
        <li class="logged__anchor"><a id="navLogin__logOut" href="#" data-link>Log out</a></li>
        <li class="logged__anchor"><a href="/dashboard" data-link>${loggedUserName}</a></li>
      `;
    }

    // Logout listener, clears user data and redirect to home page
    document
      .getElementById("navLogin__logOut")
      .addEventListener("click", (e) => {
        e.preventDefault();

        // Remove user data from local storage
        localStorage.removeItem("auth");
        localStorage.removeItem("name");
        localStorage.removeItem("password");
        localStorage.removeItem("role");
      });

  } else {
    // If not logged in, show sign up and log in links
    navLogin.innerHTML = `
        <li class="navLogin__anchor"><a href="/signUp" data-link>Sign up</a></li>
        <li class="navLogin__anchor"><a href="/logIn" data-link>Log in</a></li>
      `;
  }
}
