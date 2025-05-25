'''
10. **Número de intentos**:  
    Pide al usuario que ingrese un número entre 1 y 10. Si no lo hace, sigue pidiéndolo hasta que lo haga correctamente.
'''

### Se le pide al usuario ingresar un número.
numeroIngresado = int(input("Ingrese un número del 1 al 10: "))

### Bucle para validar el número que ingresó el usuario.
while numeroIngresado < 1 or numeroIngresado > 10:
    numeroIngresado = int(input(f"El número estar entre 1 y 10.\nIngrese un número del 1 al 10: "))

### Mensaje a imprimir en caso se salga del bucle anterior.
print(f"Ingresó un número entre 0 y 100 ({numeroIngresado}.)")