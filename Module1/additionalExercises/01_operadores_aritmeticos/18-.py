'''
### 18. No son iguales  
Pide dos números y muestra si el primero **no** es igual al segundo (usar `not` y `==`).
'''

primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

if not(primerNumero == segundoNumero):
    print("El primer número no es igual al segundo número.")
else:
    print("El primer número es igual al segundo número.")