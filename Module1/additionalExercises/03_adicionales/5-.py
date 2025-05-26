'''
## 5. 🔁 Calculadora de múltiplos

Pide dos números y verifica si el **primero es múltiplo del segundo** usando `%`.

Ejemplo:
> 12 es múltiplo de 4 → True 15 es múltiplo de 6 → False

'''

### Se le pide al usuario ambos números.
primerNumero = int(input("Ingrese el primer número: "))
segundoNumero = int(input("Ingrese el segundo número: "))

### Condicional para validar que el segundo número sea múltiplo del primero.
if segundoNumero % primerNumero == 0:
    print("El primer número es múltiplo del segundo.")
else:
    print("El primer número no es múltiplo del segundo.")