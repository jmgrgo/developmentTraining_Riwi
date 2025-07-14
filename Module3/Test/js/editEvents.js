// Function to render on screen all existing events.
async function editEvents() {
  // Fetch events data from the database
  const response = await fetch("http://localhost:3000/events");
  const event = await response.json();

  // Get the DOM element container
  const eventsContainer = document.getElementById("editEventsContainer");
  eventsContainer.innerHTML = "";

  // Render events dynamically
  event.forEach((event) => {
    const li = document.createElement("li");
    li.innerHTML = `${event.title} │ ${event.description} │ (${event.place} - ${event.duration}) │ ${event.capacity}`;
    li.className = "eventItem"

    // Create a delete button for each event
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "1em";

    // Push elements to the desired container
    li.appendChild(deleteButton); 
    eventsContainer.appendChild(li);


    // Event listener for the created delete button
    deleteButton.onclick = async () => {
      // Confirm deletion
      if (
        confirm(`Are you sure you want to delete the event '${event.title}'?`)
      ) {
        await fetch(`http://localhost:3000/events/${event.id}`, {
          method: "DELETE",
        });
      }

      // Succes messag
      alert("Event deleted succesfully.");

      // Render events again
      editEvents();
    };
  });
}

// Call the render events function
editEvents();
