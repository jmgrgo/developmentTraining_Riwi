'''
7. **Generar una lista de múltiplos de un número**:  
   Pide al usuario un número `N` y usa un `for` para crear una lista con los primeros 10 múltiplos de `N`.
'''

### Se le pide al usuario ingresar un número.
numeroIngresado = int(input("Ingrese un número: "))

### Bucle para repetir 10 veces.
for i in range(1, 11):

    ### Se imprime número ingresado por la iteración actual del bucle.
    print(numeroIngresado,"X",i,"=",numeroIngresado*i)