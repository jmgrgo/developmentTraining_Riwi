'''
Pide:
- Nombre y edad de dos personas

Verifica si:
- Ambos tienen **al menos 18 años**
- **Se llaman distinto**
- La **diferencia de edad no supera los 10 años**

Si cumplen todo, imprime un mensaje gracioso diciendo que **son compatibles** 💞  
Si no, di por qué **no lo son**.
'''

primerEdad = int(input("Ingrese la edad de la primera persona: "))
segundaEdad = int(input("Ingrese la edad de la segunda persona: "))

primerNombre = input(("Ingrese el nombre de la primera persona: "))
segundoNombre = input(("Ingrese el nombre de la segunda persona: "))

if primerEdad < 18 or segundaEdad < 18:
    print("No son compatibles ya que uno de los dos no tiene almenos 18 años.")
elif primerNombre == segundoNombre:
    print("No son compatibles ya que poseen el mismo nombre. ")
elif (primerEdad - segundaEdad > 10) or (segundaEdad - primerEdad > 10):
    print("No son compatibles ya que tienen una diferencia de edad de más de 10 años.")
else:
    print("¡Felicidades! ¡Son compatibles! 💞💞💞💞💞💞")