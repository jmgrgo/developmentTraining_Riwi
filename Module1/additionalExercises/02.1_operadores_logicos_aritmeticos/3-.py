'''
### 3. Verificación para participar en un concurso internacional
Pide edad, país y número de documento. Muestra si cumple condiciones: edad entre 18 y 30 inclusive, país distinto de "Antártida" y documento diferente de 0.
'''

edad = int(input("Ingrese su edad: "))
pais = input("Ingrese su país: ")
numeroDocumento = int(input("Ingrese su número de documento (sin puntos.): "))

if (edad >= 18 and edad <= 30) and pais != "Antártida" and numeroDocumento != 0:
    print("Puede participar en el concurso.")
else:
    print("No puede participar en el concurso.")