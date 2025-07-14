// Show user info
function renderUserInfo() {
  const showName = document.getElementById("userInfo__name");
  const showEmail = document.getElementById("userInfo__email");
  const showPassword = document.getElementById("userInfo__password");
  const showPhone = document.getElementById("userInfo__phone");
  const showRole = document.getElementById("userInfo__role");
  const showEnrollNumber = document.getElementById("userInfo__enrollNumber");
  const showDateOfAdmission = document.getElementById("userInfo__dateOfAdmission");
  showName.textContent = localStorage.getItem("name");
  showEmail.textContent = localStorage.getItem("email");
  showPassword.textContent = localStorage.getItem("password");
  showPhone.textContent = localStorage.getItem("phone");
  showRole.textContent = localStorage.getItem("role");
  showEnrollNumber.textContent = localStorage.getItem("enrollNumber");
  showDateOfAdmission.textContent = localStorage.getItem("dateOfAdmission");
}

function renderAdminPanel() {
  const container = document.getElementById("dashboard__adminContent");
  const adminSection = document.createElement("section");
  adminSection.innerHTML = `
    <h3>Create new course</h3>
    <form id="createCourseForm">
      <label for="courseTitle">Title:</label>
      <input type="text" id="courseTitle" name="courseTitle" required><br>
      <label for="courseDescription">Description:</label>
      <input type="text" id="courseDescription" name="courseDescription" required><br>
      <label for="courseStartDate">Start date (e.g. 10-Jul-2025):</label>
      <input type="text" id="courseStartDate" name="courseStartDate" required><br>
      <label for="courseDuration">Duration:</label>
      <input type="text" id="courseDuration" name="courseDuration" required><br>
      <button type="submit">Create course</button>
    </form>
    <h3>Courses list</h3>
    <ul id="coursesList"></ul>
    <hr>
    <h3>Users list</h3>
    <ul id="usersList"></ul>
  `;
  container.appendChild(adminSection);

  document.getElementById("createCourseForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("courseTitle").value.trim();
    const description = document.getElementById("courseDescription").value.trim();
    const startDate = document.getElementById("courseStartDate").value.trim();
    const duration = document.getElementById("courseDuration").value.trim();
    await fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, startDate, duration }),
    });
    e.target.reset();
    renderCourses();
  });

  async function renderCourses() {
    const res = await fetch("http://localhost:3000/courses");
    const courses = await res.json();
    const coursesList = document.getElementById("coursesList");
    coursesList.innerHTML = "";
    courses.forEach((course) => {
      const li = document.createElement("li");
      li.textContent = `${course.title} - ${course.description} (${course.startDate}, ${course.duration})`;
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "1em";
      delBtn.onclick = async () => {
        if (confirm(`Are you sure you want to delete the course '${course.title}'?`)) {
          await fetch(`http://localhost:3000/courses/${course.id}`, { method: "DELETE" });
          renderCourses();
        }
      };
      li.appendChild(delBtn);
      coursesList.appendChild(li);
    });
  }
  renderCourses();

  async function renderUsers() {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.email}) - ${user.role}`;
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "1em";
      delBtn.onclick = async () => {
        if (confirm(`Are you sure you want to delete the user '${user.name}'?`)) {
          await fetch(`http://localhost:3000/users/${user.id}`, { method: "DELETE" });
          renderUsers();
        }
      };
      li.appendChild(delBtn);
      usersList.appendChild(li);
    });
  }
  renderUsers();
}

renderUserInfo();
if (localStorage.getItem("role") === "admin") {
  renderAdminPanel();
}
