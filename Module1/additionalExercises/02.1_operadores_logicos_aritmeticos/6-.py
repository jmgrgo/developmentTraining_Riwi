'''
### 6. Requisitos para obtener una beca
Pide promedio, ingresos y cantidad de materias. Muestra si aplica a la beca: promedio ≥ 8, materias < 3 y ingresos ≤ 1500.
'''

promedio = float(input("Ingrese el promedio: "))
ingresos = int(input("Ingrese sus ingresos: "))
cantidadMaterias = int ("Ingrese la cantidad de materias que cursa: ")

if promedio >= 8 and ingresos <= 1500 and cantidadMaterias < 3:
    print("Puede optar a la beca.")