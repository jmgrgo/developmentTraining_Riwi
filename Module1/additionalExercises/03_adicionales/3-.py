'''
Pide:
- Sueldo bruto
- Porcentaje de descuento (por ejemplo: `13`)

Calcula el sueldo neto usando la fórmula:

  > sueldo_neto = sueldo_bruto - (sueldo_bruto * descuento / 100)

Ejemplo de salida:

  > Sueldo bruto: 1000 Descuento: 13 Sueldo neto: 870.0
'''

sueldoBruto = int(input("Ingrese su sueldo bruto: "))
porcentajeDescuento = float(input("Ingrese el porcentaje de descuento: "))

print("Sueldo bruto:",sueldoBruto," "*5,"Descuento:",porcentajeDescuento,"%"," "*5, "Sueldo neto:",sueldoBruto - (sueldoBruto * porcentajeDescuento / 100))
