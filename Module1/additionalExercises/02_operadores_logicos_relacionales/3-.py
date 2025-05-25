'''
Pide una edad y muestra si está fuera del rango de 0 a 120.
'''

edad = int(input("Ingrese una edad: "))

if edad >= 0 and edad <= 120:
    print("La edad está dentro del rango.")
else:
    print("La edad está fuera del rango.")