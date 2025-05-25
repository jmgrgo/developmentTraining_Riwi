'''
9. **Sumar hasta detenerse**:  
   Pide números al usuario y súmalos hasta que ingrese "0", momento en el que se imprimirá el total.
'''

### Se le pide al usuario ingresar el número.
numeroIngresado = int(input("Ingrese un número: "))

### Se inicializa la suma en 0.
suma = 0

### Bucle para validar la opción ingresada por el usuario.
while numeroIngresado != 0:

    ### Se suma el número ingresado en la variable suma, y se le pide al usuario continuar ingresando números.
    suma += numeroIngresado

    numeroIngresado = int(input("Ingrese un número nuevamente (Usa 0 para salir.): "))

### Se imprime la suma total en caso se salga del bucle anterior.
print(f"La suma total de los números ingresados es: {suma}.")