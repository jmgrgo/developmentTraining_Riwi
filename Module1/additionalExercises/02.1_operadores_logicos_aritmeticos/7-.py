'''
### 7. Acceso a atracción en parque temático
Pide estatura (cm) y edad. Muestra si puede ingresar: estatura > 140 y edad entre 10 y 60 inclusive.
'''

estatura = int(input("Ingrese su estatura en cm: "))
edad = int(input("Ingrese su edad: "))

if estatura > 140 and (edad >= 10 and edad <= 60):
    print("Puede ingresar al parque tematico.")
else:
    print("No puede ingresar al parque temático.")

