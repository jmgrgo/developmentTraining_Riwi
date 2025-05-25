'''
### 4. Fecha formateada
Pide al usuario el día, mes y año por separado e imprime la fecha en formato: "DD/MM/AAAA" y también "AAAA-MM-DD"
'''
diaIngresado = int(input("Ingrese el día: "))
while diaIngresado < 0 or diaIngresado > 31:
    print("El dia ingresado es inválido.")
    diaIngresado = int(input("Ingrese el dia nuevamente: "))

mesIngresado = int(input("Ingrese el mes: "))
while mesIngresado < 0 or mesIngresado > 12:
    print("El mes ingresado es inválido.")
    mesIngresado = int(input("Ingrese el mes nuevamente: "))

añoIngresado = int(input("Ingrese el año: "))

## Se imprime en ambos formatos solicitados.
print(diaIngresado,"/",mesIngresado,"/",añoIngresado)

print(añoIngresado,"-",mesIngresado,"-",diaIngresado)