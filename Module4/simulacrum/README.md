# Vida Sana Hospital Management System

## Overview
Vida Sana is a web-based hospital management system designed to streamline the administration of patients, medics, appointments, and diagnoses. The application provides CRUD operations, search/filtering, and bulk import/export via CSV for all major entities. It uses Supabase as the backend database and PapaParse for CSV parsing.

## Features
- **Patient Management:** Register, edit, search, and bulk import/export patients.
- **Medic Management:** Register, edit, search, and bulk import/export medics.
- **Appointment Management:** Schedule, edit, search, and bulk import/export appointments.
- **Diagnosis Management:** Record, edit, search, and bulk import/export diagnoses.
- **CSV Import/Export:** Easily upload or download entity data in CSV format.
- **Responsive UI:** Modern, sectioned interface with sidebar navigation and clear forms.
- **Validation & Error Handling:** All forms include validation and user feedback for data integrity.

## Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript (ES6 modules)
- **Backend:** Supabase (PostgreSQL)
- **CSV Parsing:** PapaParse
- **Build Tool:** Vite

## Project Structure
```
project-root/
├── index.html                # Main HTML file
├── pages/
│   └── home.html             # Home page.
│   └── signUp.html           # Sign Up page.
│   └── logIn.html            # Log In page.
│   └── dashboard.html        # Dashboard page.
│   └── createEvents.html     # Create events page (--ADMIN ONLY--).
│   └── editEvents.html       # Edit events page (--ADMIN ONLY--).
├── css/
│   └── styles.css            # General styles and navbar.
│   └── home.css              # Styles for the Home page.
│   └── signUp.css            # Styles for the Sign Up page.
│   └── logIn.css             # Styles for the Log In page.
│   └── dashboard.css         # Styles for the user Dashboard page.
│   └── createEvents.css      # Styles for the Create events page (--ADMIN ONLY--).
│   └── editEvents.css        # Styles for the Edit events page (--ADMIN ONLY--).
├── js/
│   └── script.js             # JavaScript for the SPA & logged users.
│   └── signUp.js             # JavaScript for the Sign Up feature.
│   └── logIn.js              # JavaScript for the Log In feature.
│   └── dashboard.js          # JavaScript for the user dashboard feature.
│   └── createEvents.js       # JavaScript for the create events feature (--ADMIN ONLY--).
│   └── editEvents.js         # JavaScript for the edit events feature (--ADMIN ONLY--).
├── db/
│   └── db.json               # Simulated database for the backend.
│   │   # VITE aux
├── node_modules/
├── package-lock.json
└── package.json
```

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd simulacrum-def
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install Supabase client:**
   ```bash
   npm install @supabase/supabase-js
   ```
4. **Install PapaParse:**
   ```bash
   npm install papaparse
   ```
5. **Start development server:**
   ```bash
   npm run dev
   ```
6. **Access the app:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Database Schema
See `ignore/tables.md` for full SQL schema. Key tables:
- `patient`: Stores patient info (ID, name, birth date, gender, phone, email, address, blood type)
- `medic`: Stores medic info (ID, name, specialty, phone, email, experience, salary)
- `appointment`: Links patients and medics, with date, time, reason, and state
- `diagnosis`: Linked to appointments, stores instructions and medicine recipe

## Usage
- Use the sidebar to navigate between Patients, Medics, Appointments, and Diagnoses.
- Add new records via forms, or upload CSV files for bulk import.
- Search and filter records using the search bar in each section.
- Edit or remove records using the card controls.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is for educational purposes. See repository for license details.

## Credits
- [Supabase](https://supabase.com/)
- [PapaParse](https://www.papaparse.com/)
- Icons from [SVGRepo](https://www.svgrepo.com/)
