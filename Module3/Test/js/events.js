// Main function to load and display events
async function loadEvents() {
  try {
    // Fetch the list of events from the API
    const response = await fetch("http://localhost:3000/events");
    const events = await response.json();

    // DOM Element
    const eventsContainer = document.getElementById("eventsContainer");
    eventsContainer.innerHTML = "";

    // Get logged user info from localStorage
    const isLogged = localStorage.getItem("auth");
    const userName = localStorage.getItem("name");
    const userRole = localStorage.getItem("role");

    let userId = null;

    // If the user is logged in and has role "user", get their id from the database
    if (isLogged && userRole === "user" && userName) {
      try {
        const usersRes = await fetch("http://localhost:3000/users");
        const users = await usersRes.json();
        const user = users.find((user) => user.name === userName);
        if (user) userId = user.id;
      } catch (e) {
        // If error, ignore
      }
    }

    // Get the user's enrollments to know which events they are already enrolled in
    let userEnrollments = [];
    if (userId) {
      try {
        const enrollRes = await fetch("http://localhost:3000/enrollments");
        const enrollments = await enrollRes.json();
        // Filter only the enrollments for the current user
        userEnrollments = enrollments.filter(
          (enroll) => String(enroll.userId) === String(userId)
        );
      } catch (e) {
        // If error, ignore
      }
    }

    // Loop through each event and display it on the page
    events.forEach((event) => {
      // Create an article element for each event
      const article = document.createElement("article");
      article.innerHTML = `
          <h2>${event.title}</h2>
          <p>${event.description}</p>
          <strong>Place: </strong>
          <span>${event.place}</span><br>
          <strong>Duration: </strong>
          <span>${event.duration}</span><br>
          <strong>Capacity: </strong>
          <span>${event.capacity}</span><br>
        `;

      // If the user is 'user', show the enroll button
      if (userId && userRole === "user") {

        // Check if the user is already enrolled in the event
        const alreadyEnrolled = userEnrollments.some(
          (enroll) => String(enroll.eventId) === String(event.id)
        );

        const enrollBtn = document.createElement("button");
        enrollBtn.textContent = alreadyEnrolled ? "Enrolled" : "Enroll";
        enrollBtn.disabled = alreadyEnrolled;

        if(event.capacity == 0){
            enrollBtn.disabled = true;
            enrollBtn.textContent = "Full capacity"
        }

        // Event listener to enroll in the event
        enrollBtn.addEventListener("click", async () => {
          enrollBtn.disabled = true;
          enrollBtn.textContent = "Enrolling...";

          try {
            // Send enrollment to the database
            await fetch("http://localhost:3000/enrollments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userId,
                eventId: event.id,
              }),
            });

            // Succes message
            alert("You have been enrolled in this event!");
            enrollBtn.textContent = "Enrolled";

          } catch (err) {
            enrollBtn.disabled = false;
            enrollBtn.textContent = "Enroll";
            alert("Error enrolling in event");
          }

          // Update event capacity
          let newCapacity = event.capacity - 1;
          fetch("http://localhost:3000/events/" + event.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              capacity: newCapacity,
            }),
          });
          loadEvents();
        });

        // Add the button to the event article
        article.appendChild(enrollBtn);
      }

      // Add the article to the events container
      eventsContainer.appendChild(article);
    });
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

// Call the function to render events
loadEvents();
