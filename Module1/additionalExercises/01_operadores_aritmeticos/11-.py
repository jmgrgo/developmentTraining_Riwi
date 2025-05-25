'''
### 11. Parte entera de un decimal  
Pide al usuario un número decimal y muestra solo la parte entera.
'''

import math

numero = float(input("Ingrese un número decimal: "))

print("La parte entera de: ",numero," es: ",math.floor(numero),".")