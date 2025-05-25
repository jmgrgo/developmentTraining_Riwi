'''
3. **Suma de los primeros 10 números**:  
   Usa un `while` para sumar los números del 1 al 10 e imprimir el resultado.
'''

### Se inicializan las variables.
contador = 0
suma = 0

### Bucle a imprimir, en cada iteración, la suma agrega el número siguiente a su valor previo.
while contador < 10:
    contador += 1
    suma += contador
    print(contador)

print(suma)