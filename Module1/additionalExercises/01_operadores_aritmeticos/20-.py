'''
### 20. Divisible por 5  
Pide un número entero y muestra si es divisible entre 5 (usar `%` y `==`).
'''

numero = int(input("Ingrese el número: "))

if numero % 5 == 0:
    print("El número es divisible entre 5.")
else:
    print("El número no es divisible entre 5.")