'''
### 14. ¿Mayor que?  
Pide dos números y muestra si el primero es mayor que el segundo.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if primerNumero > segundoNumero:
    print("El primer número (",primerNumero,") es mayor al segundo (",segundoNumero,")")
else:
    print("El primer número (",primerNumero,") es menor al segundo (",segundoNumero,")")