'''
Pide la edad y el género del usuario (`"M"` para mujer, `"H"` para hombre).  
- Mujer se jubila a los **60 años**  
- Hombre se jubila a los **65 años**

**Si ya se puede jubilar**, muestra un mensaje celebratorio.  
**Si no**, indica cuántos años faltan para la jubilación.
'''

edad = int(input("Ingrese su edad número: "))
genero = input("Ingrese su genero ('M' para mujer, 'H' para hombre): ")

if (edad < 60 and genero == "M"):
    print("La edad de jubilación para mujer es de 60 años.")
    print("A usted le faltan",60-edad, "años para jubilarse.")
if (edad < 65 and genero == "H"):
    print("La edad de jubilación para hombre es de 65 años.")
    print("A usted le faltan",65-edad, "años para jubilarse.")
else:
    print("¡Felicidades! Ya se puede jubilar.")
