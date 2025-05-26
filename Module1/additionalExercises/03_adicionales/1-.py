'''
## 1. 📊 Calculadora de promedio con validación

Pide al usuario 3 notas (entre 0 y 10).  
- Si alguna nota está fuera del rango, muestra un mensaje de error.  
- Si todas son válidas, calcula el promedio y muestra si el estudiante **aprueba** (≥ 6) o **reprueba**.

'''

### Se le pide al usuario el valor para cada nota.
primerNota = float(input("Ingrese la primer nota: "))
segundaNota = float(input("Ingrese la segunda nota: "))
tercerNota = float(input("Ingrese la tercer nota: "))

### Condicional para validar que la nota sea un número válido.
if (primerNota >= 0 and primerNota <= 10) and (segundaNota >= 0 and segundaNota <= 10) and (tercerNota >= 0 and tercerNota <= 10):

    ### Se calcula el promedio de cada nota.
    promedio = (primerNota + segundaNota + tercerNota) / 3

    ### Condicional para validar si el estudiante aprobó o no.
    if promedio >= 6:
        print("Aprueba.")
    else:
        print("No aprueba.")
else:
    print("Una de las notas ingresadas no está dentro del rango.")