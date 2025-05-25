'''
Pide una letra y muestra si no es igual a "a", "e", "i", "o" ni "u".
'''

letra = input("Ingrese una letra: ")

if letra != "a" and letra != "e" and letra != "i" and letra != "o" and letra != "u":
    print("La letra no es igual a 'a', 'e', 'i', 'o' ni 'u'.")
else:
    print("La letra es igual a una de las siguientes: 'a', 'e', 'i', 'o' ni 'u'.")