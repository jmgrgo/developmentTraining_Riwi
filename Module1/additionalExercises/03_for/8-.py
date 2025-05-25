'''
8. **Números positivos en una lista**:  
   Dada una lista de números (por ejemplo, [3, -1, 5, -2, 7, -8]), usa un `for` y condicionales para imprimir solo los positivos.
'''

### Se define la lista.
lista = [3, -1, 5, -2, 7, -8]

### Bucle para recorrer la lista, con un condicional para imprimir los números mayores a 0.
for numero in lista:
    if numero > 0:
        print(numero)