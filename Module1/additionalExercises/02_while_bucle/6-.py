'''
6. **Adivina el número**:  
   Genera un número secreto (puedes usar una variable fija) y usa un `while` para pedirle al usuario que lo adivine. Da pistas si el número es mayor o menor.
'''

### Se importan librerías adicionales.
import random
import math

### Se genera el número a adivinar aleatoriamente, y posteriormente se le pide al usuario ingresar su adivinanza.
numeroAdivinar = math.floor(random.uniform(0, 10))
numeroIngresado = int(input("Ingrese su adivinación: "))

### Bucle para imprimir en caso la respuesta sea incorrecta.
while numeroIngresado != numeroAdivinar:
    print("Número incorrecto.")

    ### Se valida si el número ingresado es mayor o menor al número a adivinar, y se imprime el mensaje como pista.
    if numeroIngresado > numeroAdivinar:
        print("El número ingresado es mayor al número a adivinar")
    else:
        print("El número ingresado es menor al número a adivinar.")

    ### Se le pide al usuario ingresar nuevamente su adivinanza.
    numeroIngresado = int(input("Ingrese su adivinación: "))

### Mensaje final en caso se salga del bucle satisfactoriamente.
print(f"¡Felicidades, ha acertado el número.!\nNúmero ingresado: {numeroIngresado}\nNúmero a adivinar: {numeroAdivinar}")
