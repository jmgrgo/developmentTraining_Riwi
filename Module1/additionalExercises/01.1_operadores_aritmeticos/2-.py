'''
### 2. Inverso de número de tres cifras
Pide un número de tres cifras (ej. 123) y muestra sus cifras en orden inverso (321).
💡 Usa operaciones matemáticas para extraer centenas, decenas y unidades.
'''
numeroIngresado = int(input("Ingrese un número de 3 cifras: "))

digito1 = numeroIngresado % 10
digito2 = (numeroIngresado // 10) % 10
digito3 = numeroIngresado // 100

print(digito1,digito2,digito3)