'''
### 7. Extraer dígitos de un número de 4 cifras
Pide un número de 4 cifras e imprime cada dígito por separado, separados por coma.
 > 📌 Ejemplo: Entrada → 1234 → Salida → 1, 2, 3, 4
'''
import math

numeroElegido = int(input("Ingrese un número de 4 cifras: "))

while numeroElegido < 1000 or numeroElegido > 9999:
    numeroElegido = int(input("Número inválido, ingrese nuevamente un número de 4 cifras: "))

primerDigito = math.floor(numeroElegido / 1000)
segundoDigito = numeroElegido / 10000

print(primerDigito,round(segundoDigito))