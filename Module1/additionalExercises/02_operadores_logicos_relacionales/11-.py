'''
Pide una calificación del 0 al 10 y muestra si es válida (entre 0 y 10, sin incluir extremos).
'''

calificacion = float(input("Ingrese una calificación: "))

if calificacion >= 0 and calificacion <= 10:
    print("Es una calificación válida.")
else:
    print("Es una calificación inválida.")
