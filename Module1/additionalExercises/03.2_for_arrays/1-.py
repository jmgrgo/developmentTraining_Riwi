'''
1. **Invertir una lista**:  
   Dada una lista de números (por ejemplo, [1, 2, 3, 4, 5]), usa un `for` para invertir la lista sin usar funciones incorporadas.
'''

### Hecho con IA

### Se define la lista a invertir, y se crea la variable para esta lista.
lista = [1, 2, 3, 4, 5]
listaInvertida = []

###Ciclo for para recorrer la lista desde el final.
for i in range(len(lista) - 1, -1, -1):
    listaInvertida.append(lista[i])

###Se imprimen resultados.
print("Lista original:", lista)
print("Lista invertida:", listaInvertida)
