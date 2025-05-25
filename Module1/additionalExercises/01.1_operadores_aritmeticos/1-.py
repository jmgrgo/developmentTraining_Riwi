'''
### 1. Intercambio de variables
Pide dos valores al usuario e imprime los valores intercambiados.
 > 📌 Ejemplo: Entrada → a = 3, b = 5 → Salida → a = 5, b = 3
'''
primerNumero=int(input("Ingrese el primer número"))
segundoNumero=int(input("Ingrese el segundo número"))

primerNumero, segundoNumero = segundoNumero, primerNumero

print("a = ",primerNumero)
print("b = ",segundoNumero)

