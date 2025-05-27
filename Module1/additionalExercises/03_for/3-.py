'''
3. **Sumar los primeros 10 números**:  
   Usa un `for` para sumar los números del 1 al 10 e imprime el resultado.
'''

### Se inicializa una variable para contener la suma en 0.
suma = 0

### Ciclo for que se ejecutará 10 veces.
for i in range(1, 11):

    ### Se le agrega a la variable "suma" el valor de "i".
    suma += i

### Se imprimen resultados.
print(f"El total de la suma es: {suma}")