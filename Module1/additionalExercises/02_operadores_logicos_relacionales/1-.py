'''
Pide dos números y muestra si el primero es mayor y distinto del segundo.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if primerNumero > segundoNumero:
    print("El primer número es mayor y diferente al segundo.")
elif primerNumero != segundoNumero:
    print("El primer número es diferente al segundo pero no es mayor.")
else:
    print("El primer número es igual al segundo.")