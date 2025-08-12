
-- Create database
CREATE DATABASE gestion_academica_universidad;

-- Select created database
USE gestion_academica_universidad;

-- Create the requested tables.

-- Table "estudiantes"
CREATE TABLE estudiantes (
    id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(254) UNIQUE NOT NULL, 
    genero ENUM('Masculino','Femenino','Otro') NOT NULL,
    identificacion VARCHAR(25) UNIQUE NOT NULL,
    carrera VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_ingreso DATE NOT NULL
);

-- Table "docentes"
CREATE TABLE docentes (
    id_docente INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    correo_institucional VARCHAR(100) UNIQUE NOT NULL,
    departamento_academico VARCHAR(50) NOT NULL,
    anios_experiencia INT NOT NULL CHECK
);

-- Table "cursos"
CREATE TABLE cursos (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(25) UNIQUE NOT NULL,
    creditos INT NOT NULL,
    semestres INT NOT NULL,
    id_docente INT,
    FOREIGN KEY (id_docente)
    REFERENCES docentes(id_docente)
    ON DELETE SET NULL
);

-- Table "inscripciones"
CREATE TABLE inscripciones (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT,
    id_curso INT,
    fecha_inscripcion DATE,
    calificacion_final DECIMAL(4,2),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
);


-- Add data to each table (MADE WITH AI)

-- Insert students to "estudiantes"
INSERT INTO estudiantes (nombre_completo, correo_electronico, genero, identificacion, carrera, fecha_nacimiento, fecha_ingreso) VALUES
('Ana Pérez', 'ana.perez@example.com', 'Femenino', 'ID1001', 'Ingeniería Civil', '1998-05-12', '2017-08-15'),
('Luis Martínez', 'luis.martinez@example.com', 'Masculino', 'ID1002', 'Medicina', '1997-11-23', '2016-08-15'),
('Carla Gómez', 'carla.gomez@example.com', 'Femenino', 'ID1003', 'Derecho', '1999-02-10', '2018-08-15'),
('Juan Rodríguez', 'juan.rodriguez@example.com', 'Masculino', 'ID1004', 'Arquitectura', '1996-09-30', '2015-08-15'),
('Sofía Morales', 'sofia.morales@example.com', 'Femenino', 'ID1005', 'Psicología', '2000-01-20', '2019-08-15');

-- Insert teachers to "docentes"
INSERT INTO docentes (nombre_completo, correo_institucional, departamento_academico, anios_experiencia) VALUES
('Dr. Carlos Herrera', 'cherrera@universidad.edu', 'Ingeniería', 12),
('Dra. Marta Sánchez', 'msanchez@universidad.edu', 'Ciencias de la Salud', 8),
('Dr. Pedro Díaz', 'pdiaz@universidad.edu', 'Ciencias Sociales', 15);

-- Insert courses to "cursos"
INSERT INTO cursos (nombre, codigo, creditos, semestres, id_docente) VALUES
('Cálculo I', 'MAT101', 5, 1, 1),
('Anatomía Humana', 'MED201', 4, 3, 2),
('Introducción al Derecho', 'DER101', 3, 1, 3),
('Psicología General', 'PSI150', 4, 2, 3);

-- Insert inscriptions to "inscripciones"
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES
(1, 1, '2017-08-20', 8.5),
(2, 2, '2016-08-25', 9.2),
(3, 3, '2018-08-18', 7.8),
(4, 1, '2015-08-20', 6.5),
(5, 4, '2019-08-19', 8.0),
(1, 3, '2017-09-10', 7.5),
(2, 4, '2016-09-12', 8.8),
(3, 4, '2018-09-15', 9.0);


-- Queries

-- List all students along with their enrollments and courses.
SELECT
    est.nombre_completo AS 'Nombre del Estudiante',
    cur.nombre AS 'Nombre del Curso',
    ins.fecha_inscripcion AS 'Fecha de Inscripción'
FROM
    estudiantes AS est
JOIN
    inscripciones AS ins ON est.id_estudiante = ins.id_estudiante
JOIN
    cursos AS cur ON ins.id_curso = cur.id_curso;


-- List the courses taught by teachers with more than 5 years of experience.
SELECT
    cur.nombre AS 'Nombre del Curso',
    doc.nombre_completo AS 'Nombre del Docente',
    doc.anios_experiencia AS 'Años de Experiencia'
FROM
    cursos AS cur
JOIN
    docentes AS doc ON cur.id_docente = doc.id_docente
WHERE
    doc.anios_experiencia > 5;


-- Average grades per course
SELECT
    cur.nombre AS 'Nombre del Curso',
    AVG(ins.calificacion_final) AS 'Promedio de Calificación'
FROM
    inscripciones AS ins
JOIN
    cursos AS cur ON ins.id_curso = cur.id_curso
GROUP BY
    cur.nombre;


-- Students who are enrolled in more than one course
SELECT
    est.nombre_completo AS 'Nombre del Estudiante',
    COUNT(ins.id_curso) AS 'Número de Cursos'
FROM
    estudiantes AS est
JOIN
    inscripciones AS ins ON est.id_estudiante = ins.id_estudiante
GROUP BY
    est.nombre_completo
HAVING
    COUNT(ins.id_curso) > 1;


-- Add column estado_academico to the "estudiantes" table
ALTER TABLE estudiantes
ADD COLUMN estado_academico VARCHAR(50) DEFAULT 'Activo';

-- Check
SELECT * FROM estudiantes

-- Delete a teacher
DELETE FROM docentes
WHERE id_docente = '1';

-- Check
SELECT * FROM docentes

-- Courses in which more than 2 students are enrolled
SELECT
    cur.nombre AS 'Nombre del Curso',
    COUNT(ins.id_estudiante) AS 'Total de Estudiantes Inscritos'
FROM 
    cursos AS cur
JOIN
    inscripciones AS ins ON cur.id_curso = ins.id_curso
GROUP BY
    cur.nombre
HAVING
    COUNT(ins.id_estudiante) > 2;


-- Students whose average grade is higher than the overall average
SELECT
    est.nombre_completo AS 'Nombre del Estudiante',
    AVG(ins.calificacion_final) AS 'Promedio del Estudiante'
FROM
    estudiantes AS est
JOIN
    inscripciones AS ins ON est.id_estudiante = ins.id_estudiante
GROUP BY
    est.nombre_completo
HAVING
    AVG(ins.calificacion_final) > (
        SELECT AVG(calificacion_final)
        FROM inscripciones
    );


-- Names of the careers with enrolled students in courses from semester 2 or later
SELECT DISTINCT
    est.carrera AS 'Nombre de la Carrera'
FROM
    estudiantes AS est
WHERE
    EXISTS (
        -- Subconsulta para verificar si el estudiante actual (e.id_estudiante)
        -- tiene alguna inscripción en un curso de segundo semestre o superior.
        SELECT 1
        FROM
            inscripciones AS ins
        JOIN
            cursos AS cur ON ins.id_curso = cur.id_curso
        WHERE
            ins.id_estudiante = est.id_estudiante
            AND cur.semestres >= 2
    );


-- Use ROUND, SUM, MAX, MIN, and COUNT
SELECT
    ROUND(AVG(ins.calificacion_final), 2) AS promedio_general,
    SUM(cur.creditos) AS total_creditos_inscritos,
    MAX(ins.calificacion_final) AS calificacion_maxima,
    MIN(ins.calificacion_final) AS calificacion_minima,
    COUNT(ins.id_inscripcion) AS total_inscripciones
FROM
    inscripciones AS ins
JOIN
    cursos AS cur ON ins.id_curso = cur.id_curso;

    
-- Create view vista_historial_academico
CREATE VIEW vista_historial_academico AS
SELECT
    est.nombre_completo AS nombre_estudiante,
    cur.nombre AS nombre_curso,
    doc.nombre_completo AS nombre_docente,
    cur.semestres,
    ins.calificacion_final
FROM inscripciones AS ins
JOIN estudiantes AS est ON ins.id_estudiante = est.id_estudiante
JOIN cursos AS cur ON ins.id_curso = cur.id_curso
JOIN docentes AS doc ON cur.id_docente = doc.id_docente;


-- Create role "revisor_academico"
CREATE ROLE 'revisor_academico';

-- Grant SELECT to the created role. (Read only permissions.)
GRANT SELECT ON vista_historial_academico TO 'revisor_academico';

-- Check permissions for "revisor_academico"
SHOW GRANTS FOR 'revisor_academico'@'%';

-- Revoke data modification permissions for the table "inscripciones"
REVOKE INSERT, UPDATE, DELETE ON inscripciones FROM 'revisor_academico';


-- Start the transaction
BEGIN;

-- Update the initial grade of a student in a course
UPDATE inscripciones
SET calificacion_final = 8.50
WHERE id_estudiante = 1 AND id_curso = 1;

-- Create a savepoint to rollback if necessary
SAVEPOINT first_savepoint;

-- Perform an incorrect update
UPDATE inscripciones
SET calificacion_final = 95.00
WHERE id_estudiante = 1 AND id_curso = 1;

-- Revert changes to the "first_savepoint" savepoint
ROLLBACK TO SAVEPOINT first_savepoint;

-- Perform the correct update.
UPDATE inscripciones
SET calificacion_final = 9.50
WHERE id_estudiante = 1 AND id_curso = 1;

-- Commit the transaction
COMMIT;
