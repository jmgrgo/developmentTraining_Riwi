'''
10. **Simulación de contraseña**:  
    Pide al usuario que ingrese una contraseña e imprime "Acceso permitido" solo si la contraseña es "python123", usando un `for` para simular tres intentos.
    '''

### Se inicializa la contraseña fija.
password = "python123"

### Ciclo for que se ejecutará 3 veces.
for i in range(0, 3):

    ### Se le pide al usuario que ingrese la contraseña.
    inputPassword = input("Ingrese la contraseña: ")

    ### Condicional para verificar que la contraseña ingresada sea correcta.
    if inputPassword == password:
        print("¡Contraseña correcta!")
        break
    else:
        print("Contraseña incorrecta, intente de nuevo.")




