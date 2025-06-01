'''
### 2. Descuento por edad o monto
Pide el monto total de la compra y la edad del cliente. Muestra si obtiene descuento (monto > 100 o edad > 60).
'''

### Se le pide al usuario el monto y la edad.
montoTotal = int(input("Ingrese el monto total de la compra: "))
edad = int(input("Ingrese su edad: "))

### Condicional para validar monto o edad.
if montoTotal > 100 or edad > 60:
    print("¡Felicidades! Tiene descuento en su compra.")
else:
    print("No tiene descuento en su compra.")