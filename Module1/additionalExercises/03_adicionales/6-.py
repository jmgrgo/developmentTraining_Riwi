'''
## 6. 🧠 Número mágico

Pide un número al usuario.  
- Si es divisible por **3 y 5**, imprime: `"FizzBuzz"`
- Si solo por **3**, imprime: `"Fizz"`
- Si solo por **5**, imprime: `"Buzz"`
- Si no es divisible por ninguno, imprime: `"Nada mágico"`
'''

numero = int(input("Ingrese el primer número: "))

if numero % 3 == 0 and numero % 5  == 0:
    print("FizzBuzz")
elif numero % 3 == 0:
    print("Fizz")
elif numero % 5 == 0:
    print("Buzz")
else:
    print("Nada mágico")
