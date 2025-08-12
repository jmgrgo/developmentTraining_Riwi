## Caso elegido: Hospital Vida Sana:

### Caso de estudio:

El Hospital "Vida Sana" ha estado enfrentando serios problemas con la gestión de sus citas médicas.
Actualmente, toda la información se maneja en hojas de cálculo, lo que ha provocado pérdidas de datos,
citas duplicadas y dificultades para encontrar historiales médicos de los pacientes.

Para solucionar esta situación, la administración ha decidido implementar un sistema de base de datos que
permita gestionar eficientemente la información de los pacientes, los médicos, las citas médicas y los
diagnósticos.

El nuevo sistema deberá permitir el registro de pacientes, almacenando información como su nombre
completo, fecha de nacimiento, género, número de contacto, correo electrónico, dirección y tipo de sangre.
Así, los médicos podrán acceder rápidamente a los datos de sus pacientes antes de una consulta.
Por otro lado, los médicos también deben estar registrados en el sistema con información como su nombre,
especialidad médica, teléfono, correo electrónico, años de experiencia y salario. Esta información permitirá
al hospital hacer un mejor seguimiento del personal y asignar adecuadamente las consultas.

El corazón del sistema es la gestión de citas médicas. Cada cita debe contener información clave como la
fecha, la hora y el motivo de la consulta. Además, debe estar vinculada tanto al paciente que la solicita como
al médico que la atenderá. Para evitar confusiones, cada cita debe contar con un estado que indique si está
pendiente, completada o cancelada.

Finalmente, cuando una cita se complete, el médico debe registrar un diagnóstico, en el cual se incluirá una
descripción detallada del problema del paciente, las indicaciones médicas y, en caso necesario, una receta
con los medicamentos prescritos.

## Formas normales

Las tres primeras formas normales (1FN, 2FN y 3FN) son un conjunto de reglas de diseño para bases de datos relacionales que buscan reducir la redundancia y mejorar la integridad de los datos. A medida que avanzas de una forma normal a la siguiente, las restricciones se vuelven más estrictas.

### 1. Primera Forma Normal (1FN)
Para que una tabla esté en la Primera Forma Normal, debe cumplir con dos condiciones principales:

Valores atómicos: Cada celda de la tabla debe contener un solo valor, no una lista de valores. Por ejemplo, en una tabla de clientes, el campo de "teléfonos de contacto" no debería tener múltiples números en una misma celda.

Columnas sin repeticiones: No debe haber grupos de columnas que se repitan. En lugar de tener columnas como Teléfono1, Teléfono2, Teléfono3, es mejor crear una tabla separada para los teléfonos y vincularla a la tabla principal.

El objetivo de la 1FN es asegurarse de que cada fila sea única y que los datos estén estructurados de manera simple y uniforme.

### 2. Segunda Forma Normal (2FN)
Una tabla está en la Segunda Forma Normal si cumple con la 1FN y, además, todas las columnas que no son parte de la clave primaria dependen completamente de la clave primaria completa. Esta regla es especialmente importante para tablas que tienen claves primarias compuestas (formadas por dos o más columnas).

Dependencia funcional completa: Si la clave primaria es (ID_Pedido, ID_Producto), un campo como Nombre_Producto debe depender del ID_Producto, pero no de la clave completa. Un campo como Fecha_Pedido dependería solo de ID_Pedido. Para cumplir con la 2FN, los datos que no dependen de la clave completa deben moverse a una tabla separada. Por ejemplo, Nombre_Producto y Precio_Unitario se moverían a una tabla de productos.

La 2FN elimina la redundancia de datos que ocurre cuando atributos no clave dependen solo de una parte de la clave primaria compuesta.

### 3. Tercera Forma Normal (3FN)
Una tabla está en la Tercera Forma Normal si cumple con la 2FN y, además, no contiene dependencias transitivas. Una dependencia transitiva ocurre cuando un atributo no clave depende de otro atributo no clave.

Eliminación de dependencias transitivas: Imagina una tabla de Pedidos con las columnas ID_Pedido, ID_Cliente, Nombre_Cliente y Ciudad_Cliente. La columna Nombre_Cliente depende de ID_Cliente y Ciudad_Cliente también depende de ID_Cliente. La dependencia es transitiva porque Ciudad_Cliente depende de Nombre_Cliente a través de ID_Cliente. Para cumplir con la 3FN, la información del cliente (ID_Cliente, Nombre_Cliente, Ciudad_Cliente) debe moverse a una tabla de Clientes separada.

La 3FN garantiza que todos los atributos de una tabla dependan directamente de la clave primaria, eliminando así la redundancia y mejorando la integridad de los datos.

## MER (Modelo Entidad-Relación)

### Paso 1: Identificar las Entidades 🧍‍♂️
Las entidades son los objetos o conceptos principales sobre los que deseas almacenar información. Piensa en sustantivos. Por ejemplo, en una base de datos para una escuela, las entidades podrían ser:

- Estudiante

- Profesor

- Curso

- Departamento

Representa cada entidad con un rectángulo.

### Paso 2: Definir los Atributos 📋
Los atributos son las propiedades o características que describen a una entidad. Cada entidad tiene sus propios atributos. Por ejemplo, para la entidad Estudiante, sus atributos podrían ser:

- ID_Estudiante (este será la clave primaria, es decir, el identificador único)

- Nombre

- Apellido

- Fecha_Nacimiento

- Dirección

Representa los atributos con óvalos conectados a su respectiva entidad. Identifica la clave primaria (el atributo que identifica de forma única a cada instancia de la entidad) y subráyala.

### Paso 3: Establecer las Relaciones 🤝
Las relaciones son las conexiones o asociaciones entre dos o más entidades. Describe cómo una entidad se relaciona con otra. Por ejemplo:

- Un Estudiante se inscribe en un Curso.

- Un Profesor imparte un Curso.

Representa las relaciones con un rombo que conecta las entidades involucradas.

### Paso 4: Definir la Cardinalidad 🔢
La cardinalidad describe cuántas instancias de una entidad pueden relacionarse con cuántas instancias de otra entidad. Hay tres tipos principales:

- Uno a uno (1:1): Una instancia de la entidad A se relaciona con una y solo una instancia de la entidad B. Ejemplo: Un Profesor tiene asignado un solo Departamento como jefe.

- Uno a muchos (1:N): Una instancia de la entidad A se relaciona con muchas instancias de la entidad B. Ejemplo: Un Profesor imparte muchos Cursos.

- Muchos a muchos (N:M): Muchas instancias de la entidad A se relacionan con muchas instancias de la entidad B. Ejemplo: Muchos Estudiantes se inscriben en muchos Cursos.

Coloca los números o letras (1, N, M) al lado de la línea que conecta la relación con la entidad para indicar la cardinalidad.



