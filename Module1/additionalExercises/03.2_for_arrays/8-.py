'''
8. **Sumar los elementos en las posiciones pares**:  
   Dada una lista de números, usa un `for` para sumar los números que se encuentran en las posiciones pares (índices 0, 2, 4, etc.).
'''

### Se define la lista.
lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
suma = 0

### Ciclo para repetir en función de la cantidad de elementos de la lista.
for i in range(0, len(lista)):
    
   ### Condicional para verificar que la iteración actual sea un número par.
   if i % 2 == 0:

      ### Se agrega a la suma el valor en la posición de la iteración actual.
      suma += lista[i]

### Se imprime el resultado total.
print(suma)