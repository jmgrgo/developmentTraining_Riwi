'''
2. **Eliminar los números negativos**:  
   Dada una lista de números (por ejemplo, [3, -1, 5, -2, 7]), usa un `for` para crear una nueva lista que contenga solo los números positivos.
'''

### Se crea la lista con números.
lista = [3, -1, 5, -2, 7]

### Se inicializa la nueva lista.
nuevaLista = []

### Ciclo for para recorrer la lista.
for numero in lista:

    ### Condicional para agregar a la nueva lista los números mayores a 0.
    if numero > 0:
        nuevaLista.append(numero)

### Condicional para imprimir la nuevaLista.
print(nuevaLista)

