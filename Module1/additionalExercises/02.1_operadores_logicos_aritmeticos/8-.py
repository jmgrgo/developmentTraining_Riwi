'''
### 8. Validación de contraseña segura
Pide una contraseña. Muestra si es segura: longitud ≥ 8 y no contiene "123".
'''

### Se le pide al usuario la contraseña.
password = input("Ingrese una contraselña: ")

### Condicional para validar la longitud de la contraseña y que esta no contenga los dígitos "123".
if len(password) >= 8 and not "123" in password:
    print("Su contraseña es segura.")
else:
    print("Su contraseña no es segura.")