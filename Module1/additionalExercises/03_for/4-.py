'''
4. **Números pares del 1 al 20**:  
   Usa un `for` y condicionales para imprimir solo los números pares del 1 al 20.
'''

### Ciclo for para imprimir números cuyo % 2 sea igual a 0.
for i in range(1, 21):
    if i % 2 == 0:
        print(i)