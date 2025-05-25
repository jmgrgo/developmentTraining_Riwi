'''
### 9. Evaluación para tarjeta de crédito
Pide ingresos mensuales y si tiene deudas activas ("sí" o "no"). Muestra si puede recibir la tarjeta: ingresos > 2500 o (ingresos > 1500 y no tener deuda).
'''

ingresos = int(input("Ingrese sus ingresos mensuales: "))
deudasActivas = input("¿Tiene deudas activas? (Sí o No.): ")

if ingresos > 2500 or (ingresos > 1500 and deudasActivas=="No"):
    print("Puede optar a la tarjeta de crédito.")
else:
    print("No puede optar a la tarjeta de crédito.")