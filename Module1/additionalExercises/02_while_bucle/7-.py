'''
7. **Contar vocales en una palabra**:  
   Pide al usuario una palabra y usa un `while` para contar cuántas vocales tiene.
'''

### Se le pide al usuario ingresar la palabra
palabra = input("Ingrese una palabra.")

### Se inicializa el contador en 0.
contador_vocales = 0
indice = 0

### Se hace un bucle para recorrer la palabra.
while indice < len(palabra):
    
    ### Se obtiene la letra en la posición referente a la iteración actual, y se transforman a minúsculas para validar posteriormente.
    letra = palabra[indice].lower()
    
    ### Se comprueba si al letra es una vocal, y se suma al contador.
    if letra in 'aeiou':
        contador_vocales += 1
    
    ### Se aumenta el índice para pasar a la siguiente letra en el bucle.
    indice += 1

### Se imprime el resultado.
print(f"La palabra {palabra} tiene {contador_vocales} vocales.")
