productos = []

### Función para recorrer la lista.
def recorrerLista(nombre):
    for producto in productos:
        if nombre.lower() == list(producto.keys())[0].lower():
            return producto
    return None

### Función para validar que el dato ingresado sea un número.
def validarInt(numero):
    return numero.isdigit()

def validarFloat(numero):
    if numero.count('.') == 1:
        parte_entera, parte_decimal = numero.split('.')
        return (parte_entera.isdigit() or parte_entera == '') and parte_decimal.isdigit()
    return None

### Función para añadir productos.
def añadirProducto(nombre, precio, cantidad):
    productos.append({nombre: [precio, cantidad]})

### Función para buscar el producto e imprimir sus valores.
def buscarProducto(nombre):
    producto = recorrerLista(nombre)
    if producto:
        nombre_producto = list(producto.keys())[0]
        precio, cantidad = producto[nombre_producto]
        print(f"Producto: {nombre_producto}\nPrecio: {precio}\nCantidad: {cantidad}")
    else:
        print("El producto no se encuentra en la lista.")

### Función para actualizar los valores del producto.
def actualizarProducto(nombre, precioIngresado, cantidadIngresado):
    producto = recorrerLista(nombre)
    if producto:
        nombre_producto = list(producto.keys())[0]
        producto[nombre_producto] = [precioIngresado, cantidadIngresado]

### Función para eliminar el producto.
def eliminarProducto(nombre):
    producto = recorrerLista(nombre)
    if producto:
        productos.remove(producto)

### Ciclo principal.
while True:

    opcion = input(f"Ingrese la opción a realizar: \n1. Añadir producto.\n2. Buscar producto.\n3. Actualizar producto.\n4. Eliminar producto.\n5. Calcular el total.\n6. Salir.\nIngrese su opción: ")

    ### Condicional para verificar que la opción ingresada esté dentro del rango.
    if validarInt(opcion) and 0 < int(opcion) <= 6:
        opcion = int(opcion)

        ### Agregar producto.
        if opcion == 1:
            print("Agregar producto.")

            nombreIngresado = input("Ingrese el nombre del producto: ").strip().capitalize()

            ### Condicional para verificar que el producto no haya sido agregado previamente.
            if recorrerLista(nombreIngresado) is None:

                ### Se piden los datos del producto en un ciclo para verificar que estos sean válidos.
                while True:
                    precioIngresado = input("Ingrese el precio del producto: ")
                    if validarFloat(precioIngresado) or validarInt(precioIngresado):
                        if int(precioIngresado) > 0:
                            break
                        else:
                            print("Por favor ingrese un precio válido.")
                    else:
                        print("Por favor ingrese un precio válido.")
                
                while True:
                    cantidadIngresado = input("Ingrese la cantidad del producto: ").strip()
                    if validarInt(cantidadIngresado):
                        break
                    else:
                        print("Por favor ingrese una cantidad válida.")

                ### Se llama a la función añadirProducto.
                añadirProducto(nombreIngresado, float(precioIngresado), int(cantidadIngresado))
                print("¡Producto agregado con éxito!")           

            else:
                print("Este producto ya se encuentra en la lista.")
                buscarProducto(nombreIngresado)

        ### Buscar producto.
        elif opcion == 2:
            print("Buscar producto.")

            ### Se le pide al usuario ingresar el nombre del producto y se llama la función buscarProducto.
            nombreIngresado = input("Ingrese el nombre del producto: ").strip()
            buscarProducto(nombreIngresado)

        ### Actualizar producto.
        elif opcion == 3:
            print("Actualizar producto.")
            nombreIngresado = input("Ingrese el nombre del producto: ")

            ### Condicional para verificar que el producto ingresado se encuentre en la lista.
            if recorrerLista(nombreIngresado):

                ### Se piden los datos del producto en un ciclo para verificar que estos sean válidos.
                while True:
                    precioIngresado = input("Ingrese el precio del producto: ")
                    if validarFloat(precioIngresado) or validarInt(precioIngresado):
                        break
                    else:
                        print("Por favor ingrese un precio válido.")
                
                while True:
                    cantidadIngresado = input("Ingrese la cantidad del producto: ").strip()
                    if validarInt(cantidadIngresado):
                        break
                    else:
                        print("Por favor ingrese una cantidad válida.")

                ### Se llama a la función actualizarProducto para efectuar el cambio.
                actualizarProducto(nombreIngresado, float(precioIngresado), int(cantidadIngresado))
                print("¡Producto actualizado con éxito!")

            else:
                print("El producto no se encuentra en la lista.")
            
        ### Eliminar producto.
        elif opcion == 4:
            print("Eliminar producto.")
            nombreIngresado = input("Ingrese el nombre del producto: ")

            ### Condicional para verificar que el producto esté en la lista.
            if recorrerLista(nombreIngresado):

                ### Se llama a la función eliminarProducto.
                eliminarProducto(nombreIngresado)
                print("Producto eliminado satisfactoriamente.")
            else:
                print("El producto no se encuentra en la lista o ya ha sido eliminado.")
 
        ### Calcular total.
        elif opcion == 5:
            print("Calcular el total")
            calculoTotal = lambda productos: sum(list(producto.values())[0][0] * list(producto.values())[0][1] for producto in productos)
            print(f"El total a pagar por los productos es: {calculoTotal(productos)}")

        ### Salir.
        elif opcion == 6:
            print("Salió del menú.")
            break

    else:
        print("Por favor digite un número entre 1 y 6.")
