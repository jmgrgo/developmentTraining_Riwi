# ExperSoft
A simple web-based application to manage events.



## Project Structure
project-root/
├── index.html                # Main HTML file
├── src/
│    ├── main.js                # Main JavaScript file.
│    ├── supabaseConfig.js      # Supabase link variables.
│    ├── styles.css             # General CSS file that contains all the styles of the project.
│    ├── assets                 # Assets folder with additional icons.
│    ├── js/
│    │  └── client.js           # JavaScript for the client CRUD features.
│    │  └── bill.js             # JavaScript for the bill CRUD features.
│    │  └── transaction.js      # JavaScript for the transaction CRUD features.
│    └── pages/
│       └── clients.html           # Clients page.
│       └── bills.html             # Bills page.
│       └── transactions.html      # Transactions page.
├── node_modules/
├── package-lock.json
└── package.json

## Features

- **Clients Management:** Register, edit, search, and import clients.
- **Bills Management:** Register, edit, search, and import clients.
- **Transactions Management:** Register, edit, search, and import clients.
- **CSV Import:** Easily upload entity data in CSV format.

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6 modules)
- **Backend:** Supabase (PostgreSQL)
- **CSV Parsing:** PapaParse
- **Build Tool:** Vite

## Setup Instructions

1. **Clone the repository:**
   bash
   git clone <repo-url>
   cd simulacrum-def
   
2. **Install dependencies:**
   bash
   npm install
   
3. **Install Supabase client:**
   bash
   npm install @supabase/supabase-js

4. **Install PapaParse:**
   bash
   npm install papaparse
   
5. **Start development server:**
   bash
   npm run dev
   
6. **Access the app:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.



## Table commands (In case it's needed)

### Client
CREATE TABLE client (
  client_id INT PRIMARY KEY,
  full_name VARCHAR(100),
  address TEXT,
  phone VARCHAR(10),
  email VARCHAR(50) UNIQUE
);

### Bill
CREATE TABLE bill (
  bill_number INT PRIMARY KEY,
  billing_period VARCHAR,
  invoiced_amount INT,
  paid_amount INT
);

### Transaction
CREATE TYPE state AS ENUM ('Pendiente', 'Fallida', 'Completada');

CREATE TABLE transaction (
  transaction_id INT PRIMARY KEY,
  client_id INT REFERENCES client(client_id),
  bill_number INT REFERENCES bill(bill_number),
  datetime TIMESTAMP,
  state state,
  type VARCHAR(15) default 'Pago de Factura'
  );

  Modify supabaseConfig if necessary.