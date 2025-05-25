'''
## 7. 🔄 Conversor de unidades avanzado

Pide una cantidad en **kilómetros** y convierte:

- A **metros** (km × 1000)
- A **centímetros** (km × 100000)
- A **milímetros** (km × 1_000_000)

Muestra todo en una sola línea usando `print()` y concatenación.

Ejemplo:
> 2 km = 2000 metros, 200000 cm, 2000000 mm

'''

kilometros = int(input("Ingrese una cantidad de kilometros: "))

print(kilometros,"km =",kilometros*1000,"metros,",kilometros*100000,"centímetros,",kilometros*1000000,"milímetros.")



