### Inicializar variables.
ingresoCalificaciones = input("Ingrese la lista de calificaciones separadas por coma (Tenga en cuenta que calificaciones menores a 0 u mayores a 100 no serán tomadas.): ")
nuevoStr = ""
contadorMayor = 0
contadorMenor = 0

### Ciclo for para recorrer el string ingresado por el usuario, agregando a un nuevo string únicamente los números, comas y guiones.
for caracter in ingresoCalificaciones:
    if caracter.isdigit() or caracter == "," or caracter == "-":
        nuevoStr += caracter

### Se crea una nueva lista, separando los valores por coma.
calificaciones = []
calificaciones = nuevoStr.split(",")

### Ciclo for para convertir los elementos de la la lista en números enteros.
for i in range(len(calificaciones)):
    calificaciones[i] = int(calificaciones[i])

### Ciclo for para eliminar aquellos números menores a 0 u mayores a 100.
for i in calificaciones:
    if i < 0 or i > 100:
        calificaciones.remove(i)

print("\n","="*50)

#### Se pide el valor para contar cuantas calificaciones lo superan.
valorMayor = int(input("\n¿Cuantas calificaciones en la lista son mayores a este valor?: "))

### Se le pide el valor para contar cuantas calificaciones son iguales.
especificas = int(input("¿Cuantas calificaciones en la lista son iguales a este valor?: "))

### ¿Cuanto es el mínimo necesario para aprobar?
minimo = int(input("Ingrese la nota mínima para aprobar: "))

### Ciclo para recorrer la lista final.
for i in range(len(calificaciones)):

    ### Verificación Aprobó - Reprobó para cada nota.
    if calificaciones[i] >= minimo:
        print(f"\nNota {i}: {calificaciones[i]} Aprobó.")
    else:
        print(f"\nNota {i}: {calificaciones[i]} Reprobó. ")

    ### Verificación si la nota actual es mayor al valor ingresado previamente.
    if calificaciones[i] > valorMayor:
        contadorMayor = contadorMayor + 1

    ### Verificación si la nota actual es igual al valor ingresado previamente.
    if calificaciones[i] == especificas:
        contadorMenor = contadorMenor + 1

print("\n","="*50)

### Se imprimen resultados.
print(f"\nEn la lista de calificaciones hay {contadorMayor} calificaciones mayores a {valorMayor}.\n")
print(f"En la lista de calificaciones hay {contadorMenor} calificaciones iguales a {especificas}.\n")
print("Promedio de las calificaciones: ",round(sum(calificaciones)/len(calificaciones),2)) 

### Condicional para imprimir si se aprobó u reprobó el curso en base al promedio.
if sum(calificaciones)/len(calificaciones) >= minimo:
    print("Aprobó el curso.")
else:
    print("Reprobó el curso.")
