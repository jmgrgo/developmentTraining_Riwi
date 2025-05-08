productos = []

### Se definen las funciones.

### Función para recorrer la lista.
def recorrerLista(nombre):
    for producto in productos:
        if producto["nombre"].lower() == nombre.lower():
            return producto
    return None

### Función para añadir productos.
def añadirProducto(nombre, precio, cantidad):
    productos.append({"nombre":nombre, "precio":precio, "cantidad":cantidad})

### Función para buscar el producto e imprimir sus valores.
def buscarProducto(nombre):
        producto = recorrerLista(nombre)
        if producto:
            print(f"Producto: {producto["nombre"]}\nPrecio: {producto["precio"]}\nCantidad: {producto["cantidad"]}")
        else:
            return None

### Función para actualizar los valores del producto.
def actualizarProducto(nombre, precioIngresado, cantidadIngresado):
    producto = recorrerLista(nombre)
    producto["precio"] = precioIngresado
    producto["cantidad"] = cantidadIngresado

### Función para eliminar el producto.
def eliminarProducto(nombre):
    producto = recorrerLista(nombre)
    productos.remove(producto)

### Ciclo principal.
while True:

    ### Try para verificar que ingrese un tipo de dato válido (número)
    try:
        opcion = int(input(f"Ingrese la opción a realizar: \n1. Añadir producto.\n2. Buscar producto.\n3. Actualizar producto.\n4. Eliminar producto.\n5. Calcular el total.\n 6.Salir.\nIngrese su opción: "))

        ### Condicional para verificar que el número ingresado esté dentro del rango.
        if 0 < opcion <= 6:

            ### Agregar producto.
            if opcion == 1:
                print("Agregar producto.")

                nombreIngresado = input("Ingrese el nombre del producto: ").strip().capitalize()

                ### Condicional para verificar que el producto no se encuentre en la lista.
                if recorrerLista(nombreIngresado) == None:

                    ### Try para validar que el usuario ingrese el tipo de dato correcto.
                    try:
                        ### Se le pide al usuario ingresar los datos del producto, y se verifica que sea un número válido.
                        precioIngresado = float(input("Ingrese el precio del producto: "))
                        while precioIngresado <= 0:
                            precioIngresado = float(input("Debe ingresar un precio válido, intente de nuevo: "))

                        cantidadIngresado = int(input("Ingrese el cantidad del producto: "))
                        while cantidadIngresado <= 0:
                            cantidadIngresado = int(input("Debe ingresar una cantidad válida, intente de nuevo: "))
                        
                        ### Se llama a la función para agregar el producto.
                        añadirProducto(nombreIngresado,precioIngresado,cantidadIngresado)
                        print("¡Producto agregado con éxito!")
                    
                    except ValueError:
                        print("Tipo de dato no válido, intente de nuevo.")

                else:
                    print("Este producto ya se encuentra en la lista.")
                    buscarProducto(nombreIngresado)

            ### Buscar producto.
            elif opcion == 2:
                print("Buscar producto.")

                nombreIngresado = input("Ingrese el nombre del producto: ").strip()

                ### Se verifica si el producto existe.
                if recorrerLista (nombreIngresado) != None:
                    buscarProducto(nombreIngresado)
                else:
                    print("El producto no se encuentra en la lista")

            ### Actualizar producto.
            elif opcion == 3:
                print("Actualizar producto.")
                nombreIngresado = input("Ingrese el nombre del producto: ")

                if recorrerLista(nombreIngresado) != None:

                ### Try para validar el tipo de dato ingresado.
                    try:

                        ### Se le pide al usuario ingresar datos.
                        precioIngresado = float(input("Ingrese el precio actualizado: "))
                        cantidadIngresado = int(input("Ingrese la cantidad actualizada: "))
                        actualizarProducto(nombreIngresado, precioIngresado, cantidadIngresado)
                        print("¡Producto actualizado con éxito!")

                    except ValueError:
                        print("Debe ingresar un número, intente de nuevo.")
                else:
                    print("El producto no se encuentra en la lista.")
                
            ### Eliminar producto.
            elif opcion == 4:
                print("Eliminar producto.")
                nombreIngresado = input("Ingrese el nombre del producto: ")

                ### Condicional para verificar que el producto se encuentre en la lista, en caso afirmativo, se invoca la función eliminar.
                if recorrerLista(nombreIngresado) != None:
                    eliminarProducto(nombreIngresado)
                    print("Producto eliminado satisfactoriamente.")
                else:
                    print("El producto no se encuentra en la lista o ya ha sido eliminado.")

            ### Calculo total de los productos agregados.
            elif opcion == 5:
                print("Calcular el total")
                calculoTotal = lambda productos: sum(producto["precio"] * producto["cantidad"] for producto in productos)
                print(f"El total a pagar por los productos es: {calculoTotal(productos)}")

            ### Salida.
            elif opcion == 6:
                print("Salir del menú")
                break

    except ValueError:
        print("Debe digitar un número.")
