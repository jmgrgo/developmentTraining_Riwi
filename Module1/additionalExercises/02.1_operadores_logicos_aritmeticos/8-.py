'''
### 8. Validación de contraseña segura
Pide una contraseña. Muestra si es segura: longitud ≥ 8 y no contiene "123".
'''

password = input("Ingrese una contraselña: ")

if len(password) >= 8 and not "123" in password:
    print("Su contraseña es segura.")
else:
    print("Su contraseña no es segura.")