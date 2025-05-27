# 💥 Ejercicios Avanzados de Python (Nivel Pro)

## 1. 📊 Calculadora de promedio con validación

Pide al usuario 3 notas (entre 0 y 10).  
- Si alguna nota está fuera del rango, muestra un mensaje de error.  
- Si todas son válidas, calcula el promedio y muestra si el estudiante **aprueba** (≥ 6) o **reprueba**.

---

## 2. ⏳ Años para jubilarse

Pide la edad y el género del usuario (`"M"` para mujer, `"H"` para hombre).  
- Mujer se jubila a los **60 años**  
- Hombre se jubila a los **65 años**

**Si ya se puede jubilar**, muestra un mensaje celebratorio.  
**Si no**, indica cuántos años faltan para la jubilación.

---

## 3. 🧮 Calculadora de salario neto

Pide:
- Sueldo bruto
- Porcentaje de descuento (por ejemplo: `13`)

Calcula el sueldo neto usando la fórmula:

  > sueldo_neto = sueldo_bruto - (sueldo_bruto * descuento / 100)

Ejemplo de salida:

  > Sueldo bruto: 1000 Descuento: 13 Sueldo neto: 870.0

---

## 4. 💘 ¿Compatibles?

Pide:
- Nombre y edad de dos personas

Verifica si:
- Ambos tienen **al menos 18 años**
- **Se llaman distinto**
- La **diferencia de edad no supera los 10 años**

Si cumplen todo, imprime un mensaje gracioso diciendo que **son compatibles** 💞  
Si no, di por qué **no lo son**.

---

## 5. 🔁 Calculadora de múltiplos

Pide dos números y verifica si el **primero es múltiplo del segundo** usando `%`.

Ejemplo:
> 12 es múltiplo de 4 → True 15 es múltiplo de 6 → False


---

## 6. 🧠 Número mágico

Pide un número al usuario.  
- Si es divisible por **3 y 5**, imprime: `"FizzBuzz"`
- Si solo por **3**, imprime: `"Fizz"`
- Si solo por **5**, imprime: `"Buzz"`
- Si no es divisible por ninguno, imprime: `"Nada mágico"`

---

## 7. 🔄 Conversor de unidades avanzado

Pide una cantidad en **kilómetros** y convierte:

- A **metros** (km × 1000)
- A **centímetros** (km × 100000)
- A **milímetros** (km × 1_000_000)

Muestra todo en una sola línea usando `print()` y concatenación.

Ejemplo:
> 2 km = 2000 metros, 200000 cm, 2000000 mm
