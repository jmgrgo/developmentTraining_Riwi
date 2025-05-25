'''
6. **Eliminar duplicados de una lista**:  
   Dada una lista con elementos repetidos, usa un `for` para crear una nueva lista sin elementos duplicados.
'''

### Se define la lista con elementos repetidos.
lista = [1, 2, 3, 4, 5, 2, 4, 5, 6, 7, 8, 6, 7, 8]

### Se inicializa la nueva lista que almacenará los elementos únicos.
nuevaLista = []

### Ciclo for para recorrer la lista.
for elemento in lista:

    ### Condicional para verificar que el elemento actual no esté en la nueva lista.
    if elemento not in nuevaLista:

        ### Se agrega el elemento actual a la nueva lista.
        nuevaLista.append(elemento)

### Se imprime la lista con los elementos únicos.
print(nuevaLista)