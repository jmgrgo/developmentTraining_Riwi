'''
### 1.Acceso exclusivo al evento
Pide la edad y el número de invitación. Muestra directamente si puede ingresar (edad > 21 y invitación == 777).
'''

edad = int(input("Ingrese su edad: "))
numeroInvitacion = int(input("Ingrese el número de invitación: "))

if  edad > 21 and numeroInvitacion == 777:
    print("Puede ingresar.")
else:
    print("No puede ingresar.")