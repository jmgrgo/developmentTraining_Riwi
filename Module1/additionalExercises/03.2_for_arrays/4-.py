'''
4. **Duplicar los valores de una lista**:  
   Dada una lista de números, usa un `for` para crear una nueva lista donde cada número sea el doble del valor original.
'''

### Se define la lista.
lista = [1, 2, 3, 4]

### Se inicializa la nueva lista.
nuevaLista = []

### Ciclo for para recorrer el bucle.
for numero in lista:
    
    ### Se añade cada número multiplicado por 2 a la nueva lista.
    nuevaLista.append(numero*2)

### Se imprime la nueva lista.
print(nuevaLista)