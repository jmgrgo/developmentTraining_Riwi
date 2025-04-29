cantidadCalificaciones = int(input("Ingrese la cantidad de calificaciones que va a ingresar: "))
calificaciones = []
contador = 0

### Ingreso de las calificaciones.
for i in range(cantidadCalificaciones):
    while True:
        calificacion = int(input(f"\nIngrese la {i+1}# calificación: "))
        if 0 < calificacion and calificacion < 100:
            calificaciones.append(calificacion)
            break
        else:
            print(f"\nLa calificación debe estar entre 0 y 100. Intente nuevamente: ")

print("\n","="*50)

### Verificación Aprobó - Reprobó.
for i in range(cantidadCalificaciones):
    if calificaciones[i] > 50:
        print(f"\nNota {i}: {calificaciones[i]} Aprobó.")
    else:
        print(f"\nNota {i}: {calificaciones[i]} Reprobó. ")


#### Contar calificaciones mayores
valorMayor = int(input("\n¿Cuantas calificaciones en la lista son mayores a este valor?: "))

for i in range(cantidadCalificaciones):
    if calificaciones[i] > valorMayor:
        contador = contador + 1

print("En la lista de calificaciones hay",contador, "calificaciones mayores a ese valor.")

#### Promedio
print("\nPromedio de las calificaciones: ",round(sum(calificaciones)/cantidadCalificaciones,2))