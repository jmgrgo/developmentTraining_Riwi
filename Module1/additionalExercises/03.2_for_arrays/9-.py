'''
9. **Filtrar cadenas con más de 5 caracteres**:  
   Dada una lista de cadenas de texto, usa un `for` para crear una nueva lista con solo aquellas cadenas que tengan más de 5 caracteres.
'''

### Se define la lista a evaluar.
lista = ["hola", "que", "tal", "soy", "colosal"]

### Se inicializa una lista vacía.
nuevaLista = []

### Ciclo para recorrer la lista.
for cadena in lista:

   ### Condicional para verificar que cada elemento tenga una longitud mayor a 5.
   if len(cadena) > 5:

      ### Se agrega la cadena a una nueva lista.
      nuevaLista.append(cadena)

print(nuevaLista)