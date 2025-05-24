### Se le pide al usuario que ingrese el nombre del producto.
nombreProducto = str(input("Ingrese el nombre del producto: "))

### Se le pide al usuario que ingrese el precio del producto.
precioProducto = int(input("Ingrese el precio del producto: "))

### Se verifica que el precio ingresado sea válido (Número positivo.)
while precioProducto <= 0:
    precioProducto = int(input("Precio ingresado inválido, ingrese nuevamente el precio del producto: "))

### Se le pide al usuario que ingrese la cantidad del producto.
cantidadProducto = int(input("Ingrese la cantidad del producto: "))

### Se verifica que la cantidad ingresada sea válida (Número positivo.)
while cantidadProducto <= 0:
    cantidadProducto = int(input("Cantidad ingresada inválida, ingrese la cantidad del producto: "))

### Se le pregunta al usuario si el producto tiene descuento.
poseeDescuento = int(input("¿El producto tiene descuento? (Escriba 1. Sí 2. No)"))

### Si el usuario indicó que el producto tiene un descuento, se le pide que ingrese el valor y se verifica que esté dentro del rango adecuado. (0-100)
while poseeDescuento < 0 or poseeDescuento > 2:
    poseeDescuento = int(input("La opción ingresada no es válida, ingrese nuevamente. (1. Sí 2. No)"))
if poseeDescuento == 1:
        descuentoProducto = int(input("Ingrese el descuento del producto en %:)"))
        while descuentoProducto < 0 or descuentoProducto > 100:
            descuentoProducto = int(input("Descuento inválido, ingrese porcentaje nuevamente: "))

### De lo contrario, se aplica un descuento del 0% (Nulo).
else:
        descuentoProducto = 0

### Se calcula el monto final de la compra.
montoFinal = (precioProducto*cantidadProducto)-((precioProducto*cantidadProducto)*(descuentoProducto/100))

### Se imprimen los valores.
print("Producto: ",nombreProducto)
print("Precio x unidad: ",nombreProducto)
print("Cantidad a comprar: ",cantidadProducto)

### Si el usuario indicó que el producto no tiene descuento, se especifica. En caso contrario se imprime el descuento que ingresó el usuario.
if descuentoProducto == 0:
    print("El producto no tiene descuento.")
else:
    print("El producto tiene un descuento de: ",descuentoProducto,"%")

print("Valor total: ",montoFinal)