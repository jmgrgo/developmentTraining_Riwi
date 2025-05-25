'''
Pide tres números y muestra si el primero es menor que el segundo y mayor que el tercero.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))
tercerNumero = int(input("Ingrese el tercer número: "))

if primerNumero < segundoNumero and primerNumero > tercerNumero:
    print("El primer número es menor que el segundo y mayor que el tercero.")
else:
    print("El primer número no es menor que el segundo u mayor que el tercero.")