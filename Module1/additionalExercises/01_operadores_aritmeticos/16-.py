'''
### 16. Ambos mayores que 10  
Pide dos números y muestra si ambos son mayores que 10 (usar `and`).
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if primerNumero > 10 and segundoNumero > 10:
    print("Ambos números son mayores que 10.")
elif primerNumero > 10:
    print("Sólo el primer número es mayor a 10.")
elif segundoNumero > 10:
    print("Sólo el segundo número es mayor a 10.")
elif primerNumero <= 10 and segundoNumero <= 10:
    print("Ambos números son menores a 10.") 