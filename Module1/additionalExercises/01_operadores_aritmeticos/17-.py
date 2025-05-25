'''
### 17. Al menos uno mayor que 10  
Pide dos números y muestra si al menos uno es mayor que 10 (usar `or`).
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if primerNumero > 10 or segundoNumero > 10:
    print("Almenos uno de los números es mayor que 10.")
