'''
Pide un número decimal y muestra si es negativo o mayor que 100.
'''

numero = float(input("Ingrese un número decimal: "))

if numero < 0:
    print("El número es negativo.")
elif numero > 100:
    print("El número es mayor a 100.")
else:
    print("El número está dentro del rango (0 - 100)")
