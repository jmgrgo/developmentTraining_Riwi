'''
Pide dos edades y muestra si alguna es menor que 18 y la otra mayor que 60.
'''

primeraEdad = int(input("Ingrese la primera edad: "))
segundaEdad = int(input("Ingrese la segunda edad: "))

if primeraEdad < 18:
    print("La primera edad es menor que 18.")
elif primeraEdad > 60:
    print("La primera edad es mayor a 60.")
else:
    print("La primera edad no es menor a 18 ni mayor a 60.")

if segundaEdad < 18:
    print("La segunda edad es menor que 18.")
elif segundaEdad > 60:
    print("La segunda edad es mayor a 60.")
else:
    print("La segunda edad no es menor a 18 ni mayor a 60.")

