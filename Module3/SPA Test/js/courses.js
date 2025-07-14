// Main function to load and display courses
async function loadCourses() {
  try {
    // Fetch the list of courses from the API
    const response = await fetch("http://localhost:3000/courses");
    const courses = await response.json();

    // Select the container where the courses will be displayed
    const coursesList = document.getElementById("coursesList");
    coursesList.innerHTML = "";

    // Get logged user info from localStorage
    const isLogged = localStorage.getItem("auth");
    const userRole = localStorage.getItem("role");
    const userEmail = localStorage.getItem("email");

    let userId = null;
    // If the user is logged in and has role 'user', get their id from the API
    if (isLogged && userRole === "user" && userEmail) {
      try {
        const usersRes = await fetch("http://localhost:3000/users");
        const users = await usersRes.json();
        const user = users.find(u => u.email === userEmail);
        if (user) userId = user.id;
      } catch (e) {
        // If error, ignore (userId will remain null)
      }
    }

    // Get the user's enrollments to know which courses they are already enrolled in
    let userEnrollments = [];
    if (userId) {
      try {
        const enrollRes = await fetch("http://localhost:3000/enrollments");
        const enrollments = await enrollRes.json();
        // Filter only the enrollments for the current user
        userEnrollments = enrollments.filter(enr => String(enr.userId) === String(userId));
      } catch (e) {
        // If error, ignore
      }
    }

    // Loop through each course and display it on the page
    courses.forEach((course) => {
      // Create an article element for each course
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <span>${course.startDate}</span>
        <span>${course.duration}</span>
      `;

      // If the user is 'user', show the enroll button
      if (userId && userRole === "user") {
        // Check if the user is already enrolled in the course
        const alreadyEnrolled = userEnrollments.some(enr => String(enr.courseId) === String(course.id));
        const enrollBtn = document.createElement("button");
        enrollBtn.textContent = alreadyEnrolled ? "Enrolled" : "Enroll";
        enrollBtn.disabled = alreadyEnrolled;
        enrollBtn.style.marginLeft = "1em";
        // Event to enroll in the course
        enrollBtn.addEventListener("click", async () => {
          enrollBtn.disabled = true;
          enrollBtn.textContent = "Enrolling...";
          try {
            // Send enrollment request to the API
            await fetch("http://localhost:3000/enrollments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userId,
                courseId: course.id
              })
            });
            enrollBtn.textContent = "Enrolled";
            alert("You have been enrolled in this course!");
          } catch (err) {
            enrollBtn.disabled = false;
            enrollBtn.textContent = "Enroll";
            alert("Error enrolling in course");
          }
        });
        // Add the button to the course article
        article.appendChild(enrollBtn);
      }

      // Add the article to the courses container
      coursesList.appendChild(article);
    });
  } catch (error) {
    // If an error occurs while loading courses, log it to the console
    console.error("Error loading courses:", error);
  }
}

// Run the function to load courses when the page loads
loadCourses();
 