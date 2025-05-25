'''
Pide una palabra y muestra si su longitud es menor o igual a 5 caracteres.
'''

palabra = input("Ingrese una palabra: ")

if len(palabra) <= 5:
    print("La palabra ingresada tiene una longitud menor o igual a 5 caracteres.")
else:
    print("La palabra ingreseda tiene una longitud mayor a 5 caracteres.")