# Product Inventory App
A simple web-based application to manage events.

## Project Structure

project-root/
├── index.html # Main HTML file
├── pages/
│ └── home.html # Home page.
│ └── signUp.html # Sign Up page.
│ └── logIn.html # log In page.
│ └── dashboard.html # Dashboard page.
│ └── createEvents.html # Create events page (--ADMIN ONLY--).
│ └── editEvents.html # Edit events page (--ADMIN ONLY--).
├── css/
│ └── styles.css # General styles and navbar.
│ └── home.css # Styles for the Home page.
│ └── signUp.css # Styles for the Sign Up page.
│ └── logIn.css # Styles for the log In page.
│ └── dashboard.css # Styles for the user Dashboard page.
│ └── createEvents.css # Styles for the Create events page (--ADMIN ONLY--).
│ └── editEvents.css # Styles for the user Edit events page (--ADMIN ONLY--).
├── js/
│ └── script.js # JavaScript for the SPA & logged users.
│ └── signUp.js # JavaScript for the Sign Up feature.
│ └── logIn.js # JavaScript for the log In feature.
│ └── dashboard.js # JavaScript for the user dashboard feature.
│ └── createEvents.js # JavaScript for the create events feature (--ADMIN ONLY--).
│ └── editEvents.js # JavaScript for the user edit events feature (--ADMIN ONLY--).
├── db/
│ └── db.json # Simulated database for the backend.
│
│   # VITE aux
├── node_modules/
├── package-lock.json
└── package.json

## Features

- **Log In**: Users can create accounts on the web by specifying its name, password, and role (visitor & admin).
- **User Dashboard**: Users can see they're info when logged in.
- **Enroll to events**: Users can enroll to the different events created.
- **Dynamic Functionalities**: Different features will be available depending on the user's role.
- **Create Events**: Admins can create events on the web by specifying its title, description, place and duration.
- **Delete Events**: Admins can delete created events at any time.

## Technologies Used

- **HTML5**
- **CSS3**  
- **JavaScript (Vanilla)**
- **VITE**  
- **JSON Server**

## How to Use

### Start JSON Server

You can simulate a backend using "json-server":

1. Install JSON server
npm install -g json-server

2. Initialize JSON server
json-server --watch /db.json


### Start Vite Web Server 

Start the web server using vite:

1. Install vite
npm install -D vite

2. Start local server
npm run dev

## Known errors

- Wrong display when logging out.
