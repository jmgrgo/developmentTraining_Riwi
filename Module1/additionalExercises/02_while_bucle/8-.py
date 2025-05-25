'''
8. **Validar contraseña**:  
   Pide al usuario una contraseña y usa un `while` para seguir pidiendo hasta que ingrese "python123".
'''

### Se define la contraseña.
password = "python123"

### Se le solicita al usuario ingresar la contraseña.
passwordIngresada = input("Ingrese una contraseña: ")

### Bucle para validar si la contraseña ingresada es incorrecta.
while passwordIngresada != password:

    ### Se le pide al usuario ingresar la contraseña nuevamente.
    passwordIngresada = input(f"Contraseña incorrecta.\nIngrese su contraseña nuevamente: ")

### Se imprime el mensaje en caso la contraseña sea correcta y se salga del bucle anterior.
print("Inicio sesión satisfactoriamente.")