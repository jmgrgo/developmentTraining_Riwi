'''
5. **Contar elementos específicos**:  
   Pide al usuario que ingrese un número y una lista. Usa un `for` para contar cuántas veces aparece el número ingresado en la lista.
'''

### Se inicializa un contador en 0.
contador = 0

### Se le pide al usuario ingresar un número.
numeroIngresado = int(input("Ingrese un numero: "))

### Se le pide al usuario ingresar una lista.
listaIngresada = [1, 2, 3, 4, 2]

### Ciclo for para recorrer la lista.
for numero in listaIngresada:

    ### Condicional para evaluar si el número de la lista es igual al número ingresado.
    if numero == numeroIngresado:

        ### Se suma 1 al total del contador.
        contador += 1

### Se imprime la cantidad total del contador.
print("El número",numeroIngresado,"aparece",contador,"veces.")


