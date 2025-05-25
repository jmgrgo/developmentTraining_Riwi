'''
### 3. Extraer hora, minuto y segundo de segundos totales
Pide al usuario un número de segundos y muestra cuántas horas, minutos y segundos son.
 > 📌 Ejemplo: 3665 segundos → 1 hora, 1 minuto, 5 segundos.
 '''
import math

segundos = int(input("Ingrese los segundos totales: "))
horas = segundos / 3600
minutos = (segundos / 60) - (math.floor(horas) * 60)
segundosFinal = segundos - (math.floor(minutos) * 60) - 3600

print("Horas: ", math.floor(horas))
print("Minutos: ", math.floor(minutos))
print("Segundos: ", math.floor(segundosFinal))