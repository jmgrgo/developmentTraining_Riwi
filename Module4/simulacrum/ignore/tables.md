## Medic

### Table
CREATE TABLE medic (
  medic_id INT PRIMARY KEY,
  full_name VARCHAR(100),
  specialty VARCHAR(50),
  phone VARCHAR(10),
  email VARCHAR(50) UNIQUE,
  experience_years INT,
  salary DECIMAL(10, 2)
);


## Patient

### Enum
CREATE TYPE gender_enum AS ENUM ('M', 'F', 'Other');

### Table
CREATE TABLE patient (
  patient_id INT PRIMARY KEY,
  full_name VARCHAR(100),
  birth_date DATE,
  gender gender_enum,
  phone VARCHAR(10),
  email VARCHAR(50) UNIQUE,
  address TEXT,
  blood_type VARCHAR(3)
);

## Appointment

### Enum
CREATE TYPE appointment_state_enum AS ENUM ('Pending', 'Completed', 'Canceled');

### Table
CREATE TABLE appointment (
  appointment_id INT PRIMARY KEY,
  patient_id INT,
  medic_id INT,
  date DATE,
  time TIME,
  reason TEXT,
  state appointment_state_enum,
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (medic_id) REFERENCES medic(medic_id)
);

## Diagnosis

### Table
CREATE TABLE diagnosis (
  diagnosis_id INT PRIMARY KEY,
  appointment_id INT REFERENCES Appointment(appointment_id),
  medical_instructions TEXT,
  medicine_recipe TEXT
);
