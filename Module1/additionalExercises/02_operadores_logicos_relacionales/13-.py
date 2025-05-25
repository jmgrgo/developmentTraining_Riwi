'''
Pide dos números y muestra si no son iguales y el primero es mayor que 5.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if primerNumero == segundoNumero:
    print("Los números son iguales.")
else:
    print("Los números no son iguales.")

if primerNumero > 5:
    print("El primer número es mayor a 5.")
else:
    print("El primer número no es mayor a 5.")