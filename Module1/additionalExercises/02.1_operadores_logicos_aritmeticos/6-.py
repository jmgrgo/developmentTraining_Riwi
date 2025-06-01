'''
### 6. Requisitos para obtener una beca
Pide promedio, ingresos y cantidad de materias. Muestra si aplica a la beca: promedio ≥ 8, materias < 3 y ingresos ≤ 1500.
'''

### Se le pide al usuario los datos de promedio, ingresos y cantidad de materias.
promedio = float(input("Ingrese el promedio: "))
ingresos = int(input("Ingrese sus ingresos: "))
cantidadMaterias = int ("Ingrese la cantidad de materias que cursa: ")

### Condicional para validar los tres datos anteriores. Promedio, ingresos y cantidad de materias.
if promedio >= 8 and ingresos <= 1500 and cantidadMaterias < 3:
    print("Puede optar a la beca.")