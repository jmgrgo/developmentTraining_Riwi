'''
### 4. Evaluación académica de estudiante
Pide dos notas. Muestra si el estudiante aprobó: ambas notas ≥ 6 y ninguna < 4.
'''

### Se le pide al usuario ambas notas.
primeraNota=int(input("Ingrese la primera nota: "))
segundaNota=int(input("Ingrese la segunda nota: "))

### Condicional para validar ambas notas.
if primeraNota >= 6 and segundaNota >= 6:
    print("El estudiante aprobó.")
else:
    print("El estudiante no aprobó.")