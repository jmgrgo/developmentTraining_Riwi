'''
### 5. Convertir temperatura (F ↔ C)
Pide una temperatura en Fahrenheit y muestra el equivalente en Celsius.
'''
temperaturaIngresada = float(input("Ingrese la temperatura en grados farenheit: "))
temperaturaConvertida = (temperaturaIngresada - 32) * 5/9

print(temperaturaIngresada, "grados celsius equivale a ", round(temperaturaConvertida,2), "grados farenheit")