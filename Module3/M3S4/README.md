# User Registration App

A simple web-based application to register and display user information. Users can enter their name and age, store the data in local storage, and clear the stored information with a single click. The app also tracks how many users have been registered in the current browser session.

## Project Structure

project-root/
├── index.html # Main HTML file
├── css/
│ └── styles.css # Styles for the application
├── js/
│ └── script.js # JavaScript for form handling, validation, and session counter

## Features

- **Register User**: Enter your name and age to save them in local storage.
- **Display User Info**: Shows the stored user information if available.
- **Clear Storage**: Remove all stored user data with one click.
- **Session Counter**: Displays how many users have been registered in the current browser session (resets when the tab is closed)
- **Form Validation**: Ensures both fields are filled and age is a valid number.
- **Responsive & Modern UI**: Clean layout using CSS Grid and modern styles.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

## How to Use

1. Open `index.html` in your browser.
2. Fill in your name and age, then click **Sign up**.
3. Your information will be displayed in the "User Information" section.
4. The counter in the "Counter" section will increase each time a user is registered in the session.
5. Click **Clear Storage** to remove your data from local storage.
