'''
Pide un número y muestra si es igual a 0, o si es mayor que 10 y menor que 20.
'''

numero = int(input("Ingrese un número: "))

if numero == 0:
    print("El número es igual a 0.")
elif numero > 10 and numero < 20:
    print("El número es mayor que 10 y menor que 20.")
else:
    print("El número es no es mayor que 10 ni menor que 20.")