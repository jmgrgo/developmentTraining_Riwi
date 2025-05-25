'''
5. **Detectar múltiplos de 3**:  
   Escribe un programa que use un `for` y condicionales para imprimir los números del 1 al 30 que sean múltiplos de 3.
'''

### Ciclo for para imprimir números cuyo % 3 sea igual a 0.
for i in range(1, 31):
    if i % 3 == 0:
        print(i)