// Show the logged-in user's information in the dashboard
function renderUserInfo() {
    const showName = document.getElementById("userInfo__name");
    const showRole = document.getElementById("userInfo__role");
    
    // Fill the fields with data from localStorage
    showName.textContent = localStorage.getItem("name");
    showRole.textContent = localStorage.getItem("role");
  }

// Call the function to render user information
renderUserInfo();