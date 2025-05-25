'''
4. **Solicitar número positivo**:  
   Pide al usuario un número y usa un `while` para seguir pidiendo hasta que ingrese un número positivo.
'''

### Se le pide al usuario ingresar los datos.
numero = int(input("Ingrese un número: "))

### Bucle a imprimir en caso se introduzca un número negativo.
while numero < 0:
    numero = int(input(f"Número ingresado es inválido, debe ser un número positivo.\nIngrese un número: "))

### Se imprime el resultado positivo al haber salido del bucle anterior.
print("Ingresó un número positivo.")