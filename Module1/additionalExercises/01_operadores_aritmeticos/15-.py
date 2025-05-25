'''
### 15. ¿Menor o igual?  
Pide dos números y muestra si el primero es menor o igual que el segundo.
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if primerNumero <= segundoNumero:
    print("El primer número (",primerNumero,") es menor o igual al segundo (",segundoNumero,")")
else:
    print("El primer número (",primerNumero,") es mayor al segundo (",segundoNumero,")")