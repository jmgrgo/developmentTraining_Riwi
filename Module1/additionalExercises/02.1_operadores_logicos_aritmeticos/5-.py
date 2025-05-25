'''
### 5. Conexión segura en la red
Pide protocolo (http o https) y puerto (80 o 443). Muestra si la conexión es segura: protocolo es "https" y puerto es "443".
'''

protocolo = input("¿Qué protocolo desea usar? (http o https):  ")
puerto = int(input("Ingrese un puerto (80 o 443): "))

if protocolo == "https" and puerto == 443:
    print("La conexión es segura.")
else:
    print("La conexión no es segura.")