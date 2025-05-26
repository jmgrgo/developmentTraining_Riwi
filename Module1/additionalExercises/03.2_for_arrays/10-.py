'''
10. **Ordenar una lista de manera ascendente**:  
    Dada una lista de números, usa un `for` para ordenar la lista de menor a mayor sin utilizar las funciones `sorted()` o `sort()`.
'''

### Hecho con IA

# Lista original
lista = [5, 2, 9, 1, 3]

# Algoritmo de burbuja
for i in range(len(lista)):
    for j in range(0, len(lista) - 1 - i):
        if lista[j] > lista[j + 1]:
            # Intercambiar los elementos
            temp = lista[j]
            lista[j] = lista[j + 1]
            lista[j + 1] = temp

# Imprimir resultado
print("Lista ordenada:", lista)
