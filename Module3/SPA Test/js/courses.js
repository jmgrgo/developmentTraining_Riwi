async function loadCourses() {
  try {
    const response = await fetch("http://localhost:3000/courses");
    const courses = await response.json();

    const coursesList = document.getElementById("coursesList");
    coursesList.innerHTML = "";

    courses.forEach((course) => {
      const article = document.createElement("article");
      article.innerHTML = `
                <h2>${course.title}</h2>
                <p>${course.description}</p>
                <span>${course.startDate}</span>
                <span>${course.duration}</span>
            `;
      coursesList.appendChild(article);
    });
  } catch (error) {
    console.error("Error loading courses:", error);
  }
}

loadCourses();
 