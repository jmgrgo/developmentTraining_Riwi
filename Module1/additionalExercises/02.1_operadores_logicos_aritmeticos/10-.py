'''
### 10. Horario permitido para clases
Pide la hora del día (número entre 0 y 23). Muestra si es horario permitido: entre 8 y 18 inclusive y distinto de 13.
'''

### Se le pide al usuario la hora.
hora = int(input("Ingrese la hora del día: "))

### Condicional para validar el horario según la hora.
if hora >= 8 and hora <= 18 and hora != 13:
    print("Es horario permitido.")
else:
    print("Es horario no permitido.")