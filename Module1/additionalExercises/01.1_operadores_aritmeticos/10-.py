'''
### 10. Área y perímetro de un círculo
Pide el radio de un círculo y muestra el área y el perímetro (circunferencia).
 > 📌 Usa pi = 3.1416
'''
import math

radioCirculo = float(input("Ingrese el radio del circulo: "))
areaCirculo = math.pi * radioCirculo**2
perimetroCirculo = (radioCirculo*2) * math.pi

print("El circulo ingresado tiene un radio de: ", radioCirculo)
print("El área del circulo es: ", round(areaCirculo,2))
print("El perimetro del circulo es: ", round(perimetroCirculo,2))
