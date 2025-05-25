'''
9. **Mayúsculas y minúsculas**:  
   Pide al usuario una palabra y usa un `for` para contar cuántas letras son mayúsculas y cuántas son minúsculas.
'''

### Se le pide al usuario ingresar una palabra.
palabra = input("Ingrese una palabra: ")

### Se inicializa un contador para mayúsculas y un contador para minúsculas, ambos con un valor de 0.
contadorMayus = 0
contadorMinus = 0

### Ciclo for para recorrer la palabra ingresada.
for letra in palabra:

    ### Condicional para sumar +1 al contador en caso la letra sea mayúscula.
    if letra.isupper():
        contadorMayus += 1

    ### Condicional para sumar +1 al contador en caso la letra sea mínuscula.
    elif letra.islower():
        contadorMinus += 1

### Print para imprimir resultados.
print(f"La palabra {palabra} tiene:\n{contadorMayus} mayúsculas.\n{contadorMinus} minúsculas.\n{len(palabra)-(contadorMayus+contadorMinus)} carácteres no son letras.")