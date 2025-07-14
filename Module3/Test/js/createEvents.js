// Event creation form submission

document
  .getElementById("createEventForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get the values from the DOM
    const title = document.getElementById("eventTitle").value.trim();
    const description = document
      .getElementById("eventDescription")
      .value.trim();
    const place = document.getElementById("eventPlace").value.trim();
    const duration = document.getElementById("eventDuration").value.trim();
    const capacity = document.getElementById("eventCapacity").value.trim();

    // Check if the event title is unique
    try {
      const res = await fetch("http://localhost:3000/events");
      const events = await res.json();
      const eventExists = events.some((event) => event.title === title);

      // Validate existing event
      if (eventExists) {
        alert("Event title is already registered. Use another title.");
        return;
      }
    } catch (err) {
      alert("Error checking event. Please try again.");
      return;
    }

    // Send data to the database
    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, place, duration, capacity }),
    });

    // Success message
    alert("Event created succesfully!");

    // Form reset.
    e.target.reset();
  });
