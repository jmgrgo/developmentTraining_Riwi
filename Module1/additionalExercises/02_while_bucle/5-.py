'''
**Menú interactivo**:  
   Crea un menú con `while` que permita al usuario elegir entre opciones (por ejemplo, "1. Saludar", "2. Despedirse", "3. Salir") y solo termine cuando elija la opción de salir.
'''

### Se le pide al usuario ingresar la opción que desea hacer.
opcionMenu = int(input("Ingrese la opción (1. Saludar 2. Despedirse 3. Salir): "))

### Se hace un bucle con los casos a ejecutar según la opción que ingresó el usuario.
while opcionMenu == 1 or opcionMenu == 2:

    ### Se valida e imprime la opción ingresada por el usuario, y se le pide ingresar nuevamente una opción.
    if opcionMenu == 1:
        print("Hola.")
        opcionMenu = int(input("Ingrese la opción (1. Saludar 2. Despedirse 3. Salir): "))

    elif opcionMenu == 2:
        print("Adiós.")
        opcionMenu = int(input("Ingrese la opción (1. Saludar 2. Despedirse 3. Salir): "))

### Se imprime la opción a ejecutar al salir del bucle.
print("Ha salido.")