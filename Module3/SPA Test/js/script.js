const routes = {
  "/": "./pages/courses.html",
  "/logIn": "./pages/logIn.html",
  "/signUp": "./pages/signUp.html",
  "/dashboard": "./pages/dashboard.html",
};

loadRoute("/");

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();

    loadRoute(e.target.getAttribute("href"));
  }
});


async function loadRoute(path) {
  const route = routes[path];
  const html = await fetch(route).then((response) => response.text());

  document.getElementById("appContent").innerHTML = html;
  history.pushState({}, "", path);

  const currentScripts = document.querySelectorAll("script[data-dynamic]");
  const currentStyles = document.querySelectorAll("link[data-dynamic]");
  currentScripts.forEach((script) => script.remove());
  currentStyles.forEach((link) => link.remove());



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
  loggedUser();

}
// Send loadRoute fucntion to the global object "window"
window.loadRoute = loadRoute;
window.addEventListener("popstate", () => loadRoute(location.pathname));

// Verify if the user is logged & get the info.
function loggedUser() {
  const isLogged = localStorage.getItem("auth") || null;
  const navLogin = document.getElementById("navLogin");
  if (!navLogin) return;

  if (isLogged) {
    // Get the info of the logged User
    const loggedUserName = localStorage.getItem("name");
    // Log in buttons
    navLogin.innerHTML = `
      <li class="logged__anchor"><a id="navLogin__logOut" href="#" data-link>Log out</a></li>
      <li class="logged__anchor"><a href="/dashboard" data-link>${loggedUserName}</a></li>
    `;

    document.getElementById("navLogin__logOut").addEventListener("click", (e) => {
      e.preventDefault();
      // Remove user data from local storage
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
    navLogin.innerHTML = `
      <li class="navLogin__anchor"><a href="/signUp" data-link>Sign up</a></li>
      <li class="navLogin__anchor"><a href="/logIn" data-link>Log in</a></li>
    `;
  }
}
