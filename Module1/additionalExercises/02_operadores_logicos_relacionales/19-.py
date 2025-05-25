'''
Pide dos números y muestra si el primero no es múltiplo del segundo.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if segundoNumero % primerNumero == 0:
    print("El primer número es múltiplo del segundo")
else:
    print("El primer número no es múltiplo del segundo.")