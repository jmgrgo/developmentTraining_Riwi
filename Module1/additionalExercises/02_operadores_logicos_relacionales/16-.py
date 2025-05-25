'''
Pide una temperatura y muestra si no es inferior a 0 ni superior a 35.
'''

temperatura = float(input("Ingrese la temperatura: "))

if temperatura > 0 and temperatura <= 35:
    print("La temperatura ingresada no es inferior a 0 ni superior a 35.")
else:
    print("La temperatura ingresada es inferior a 0 u superior a 35.")