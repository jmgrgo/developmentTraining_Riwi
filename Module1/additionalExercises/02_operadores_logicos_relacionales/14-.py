'''
Pide tres números y muestra si todos son diferentes.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))
tercerNumero = int(input("Ingrese el tercer número: "))

if primerNumero != segundoNumero and primerNumero != tercerNumero and segundoNumero != tercerNumero:
    print("Todos los números son diferentes.")
else:
    print("Uno de los números es igual a otro.")
