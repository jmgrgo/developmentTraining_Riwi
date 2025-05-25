'''
### 6. Cálculo de propina y cuenta total
Pide el costo de una comida y calcula el 10%, 15% y 20% de propina. Muestra el total a pagar en cada caso.
'''
costoComida = int(input("Ingrese el costo total de la comida: "))

montoFinal = costoComida + (costoComida * (10/100))
montoFinal2 = costoComida + (costoComida * (15/100))
montoFinal3 = costoComida + (costoComida * (20/100))

print("Caso 1 10%: ", "$",montoFinal)
print("Caso 1 15%: ", "$",montoFinal2)
print("Caso 1 20%: ", "$",montoFinal3)
