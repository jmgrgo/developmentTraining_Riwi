'''
### 9. Conversor de minutos a días y horas
Pide una cantidad de minutos y muestra a cuántos días, horas y minutos equivale.
'''

import math

minutos = int(input("Ingrese los minutos totales: "))
dias = minutos / 1440
horas = (minutos / 60) - (round(dias)*24)
minutosFinal = minutos - (round(horas)*24) - 1440


print("Días: ",math.floor(dias))
print("Horas: ",math.floor(horas))
print("Minutos: ",math.floor(minutosFinal))