'''
6. **Contar letras "a"**:  
   Pide al usuario una palabra y usa un `for` con un condicional para contar cuántas veces aparece la letra "a".
'''

### Se inicializa un contador en 0.
contador = 0

### Se le pide al usuario la palabra.
palabra = input("Ingrese una palabra: ")

### Ciclo for para recorrer la palabra ingresada.
for letra in palabra:

    ### Condicional para verificar si la letra es igual a "a".
    if letra == "a":

        ### En caso afirmativo, se aumenta el contador en 1.
        contador += 1

### Se imprimen resultados.
print(f"La letra 'a' se encuentra {contador} veces en la palabra ingresada.")