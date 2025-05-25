'''
Pide tres números y muestra si alguno de ellos es igual a 0.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))
tercerNumero = int(input("Ingrese el tercer número: "))

if primerNumero == 0 or segundoNumero == 0 or tercerNumero == 0:
    print("Uno de los números es igual a 0.")
else:
    print("Ninguno de los números es igual a 0.")