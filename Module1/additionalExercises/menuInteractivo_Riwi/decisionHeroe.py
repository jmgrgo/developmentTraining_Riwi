print("El Colapso del Tren Aéreo\n")
print("En una ciudad futurista, un tren aéreo de alta velocidad sufre una falla catastrófica y queda suspendido en el aire, a punto de caer desde una gran altura.\nDentro, hay más de 300 pasajeros, incluyendo un diplomático clave para evitar una guerra internacional.\nDecisión Central del Héroe: ¿Cómo salvar a todos a tiempo?\n1. Hacer uso de su fuerza bruta\n2. Uso de la tecnología\n3. Colaboración con otros héroes")
primeraDecision = int(input("¿Qué elegirá hacer el héroe?: "))

### Opción 1

if primeraDecision == 1:
    print("\nEl héroe decide usar su fuerza sobrehumana para sostener el tren mientras los pasajeros son evacuados poco a poco.")
    print("Es espectacular, pero también agotador y con alto riesgo de fallo si se demora demasiado.\n")

    segundaDecision = int(input("¿Cómo decide posicionarse el héroe?\n1. Sostener el tren desde abajo directamente\n2. Sostenerlo sujetándolo de los costados\n"))

    if segundaDecision == 1:
        print("\nEl héroe vuela rápidamente debajo del tren y lo sostiene con todas sus fuerzas.")
        print("Sin embargo, la estructura del tren comienza a ceder por su propio peso.\n")

        terceraDecision = int(input("¿Qué hace el héroe ante la deformación del tren?\n1. Redistribuye su fuerza para sostener más los extremos\n2. Sostiene con aún más fuerza el centro\n"))

        if terceraDecision == 1:
            print("\nEl héroe redistribuye su fuerza hacia los extremos.")
            print("Esto estabiliza momentáneamente el tren, pero también desgasta más rápido su energía.\n")

            cuartaDecision = int(input("¿Decide pedir ayuda o seguir solo?\n1. Pedir ayuda a un helicóptero cercano\n2. Continuar sosteniéndolo solo\n"))

            if cuartaDecision == 1:
                print("\nEl héroe pide ayuda por radio a un helicóptero de rescate.")
                print("El helicóptero lanza cables de sujeción para aliviar parte del peso.\n")

                quintaDecision = int(input("¿Debe priorizar?\n1. Priorizar evacuar niños y ancianos primero\n2. Priorizar estabilizar completamente el tren\n"))

                if quintaDecision == 1:
                    print("\nEvacuando a los más vulnerables primero, se gana tiempo valioso.")
                    print("Aunque la estructura sigue sufriendo, la mayoría de las vidas se salvan.\n")
                    
                    sextaDecision = int(input("¿Intentar un último esfuerzo?\n1. Sí, usar toda su fuerza restante\n2. No, retirarse antes de colapsar\n"))

                    if sextaDecision == 1:
                        print("\nEl héroe reúne su última energía en un grito épico.")
                        print("Logra sostener el tren el tiempo suficiente para evacuar al 95% de los pasajeros, incluido el diplomático.")
                        print("El tren finalmente cae, pero con mínimos daños humanos.\n¡MISIÓN CUMPLIDA!\n")
                    elif sextaDecision == 2:
                        print("\nEl héroe se retira justo antes del colapso total.")
                        print("El tren se desploma, provocando numerosas bajas.")
                        print("Aunque salvó a muchos, el diplomático muere en el accidente.\n¡MISIÓN FALLIDA!\n")

                elif quintaDecision == 2:
                    print("\nEl héroe se concentra en estabilizar el tren con los cables y su fuerza combinada.")
                    print("Esto retarda el colapso, pero deja menos tiempo para evacuar.\n")
                    
                    sextaDecision = int(input("¿Seguir estabilizando o cambiar a evacuación?\n1. Seguir estabilizando\n2. Cambiar a evacuar inmediatamente\n"))

                    if sextaDecision == 1:
                        print("\nDemasiado tarde. El tren se desploma con cientos de personas aún dentro.")
                        print("Un trágico final.\n¡MISIÓN FALLIDA!\n")
                    elif sextaDecision == 2:
                        print("\nEl héroe cambia a evacuación urgente.")
                        print("Logra salvar a la mitad de los pasajeros, incluyendo al diplomático, aunque con varios heridos.\n¡MISIÓN PARCIALMENTE EXITOSA!\n")

            elif cuartaDecision == 2:
                print("\nEl héroe intenta sostener el tren solo.")
                print("Pero la estructura cede más rápido de lo esperado.\n")

                quintaDecision = int(input("¿Último intento?\n1. Intentar un impulso final\n2. Soltar el tren y salvarse\n"))

                if quintaDecision == 1:
                    print("\nEl héroe usa su último aliento para frenar la caída.")
                    print("Salva solo el vagón delantero, donde estaba el diplomático y algunos pasajeros.\n¡MISIÓN PARCIALMENTE EXITOSA!\n")
                elif quintaDecision == 2:
                    print("\nEl héroe decide salvar su vida.")
                    print("El tren cae, y con él, la esperanza de evitar la guerra.\n¡MISIÓN FALLIDA!\n")

        elif terceraDecision == 2:
            print("\nEl héroe concentra toda su fuerza en el centro.")
            print("Aunque logra frenar un poco la deformación, el peso lo supera.\n")

            cuartaDecision = int(input("¿Buscar un punto de apoyo externo?\n1. Sí\n2. No\n"))

            if cuartaDecision == 1:
                print("\nEncuentra una gran antena metálica cercana.")
                print("Usándola como soporte, logra estabilizar parcialmente el tren.\n")

                quintaDecision = int(input("¿Permitir evacuar primero a los pasajeros críticos?\n1. Sí\n2. No, evacuar en orden de llegada\n"))

                if quintaDecision == 1:
                    print("\nEl diplomático y varios niños son evacuados primero.")
                    print("La estructura cede después, pero la misión principal se cumple.\n¡MISIÓN EXITOSA!\n")
                elif quintaDecision == 2:
                    print("\nEl desorden causa retrasos.")
                    print("El tren cae antes de evacuar al diplomático.\n¡MISIÓN FALLIDA!\n")
            
            elif cuartaDecision == 2:
                print("\nEl héroe intenta sostener el tren sin apoyos externos.")
                print("La tarea resulta imposible y la tragedia es inevitable.\n¡MISIÓN FALLIDA!\n")

    elif segundaDecision == 2:
        print("\nEl héroe opta por sostener el tren sujetándolo de los costados.")
        print("Distribuye mejor su fuerza, pero necesita mucha más resistencia para mantenerlo en equilibrio.\n")

        terceraDecision = int(input("¿Pedir refuerzos?\n1. Sí\n2. No\n"))

        if terceraDecision == 1:
            print("\nCon ayuda de drones de rescate, logra estabilizar el tren lo suficiente.")
            print("Los pasajeros son evacuados exitosamente.\n¡MISIÓN EXITOSA!\n")
        elif terceraDecision == 2:
            print("\nEl héroe insiste en hacerlo solo.")
            print("Finalmente, el tren se desequilibra y cae de costado, causando numerosas víctimas.\n¡MISIÓN FALLIDA!\n")

## Opción 2

elif primeraDecision == 2:

    print("El héroe decide hackear el sistema de control del tren desde una terminal remota.")

    segundaDecision = int(input("¿Qué desea intentar hackear primero?\n1. Reiniciar los frenos magnéticos.\n2. Estabilizar la levitación del tren.\n"))

    if segundaDecision == 1:
        print("El héroe intenta reiniciar los frenos magnéticos...")

        terceraDecision = int(input("Pero detecta una señal de interferencia cercana.\n¿Quiere:\n1. Intentar igual el reinicio a pesar del riesgo.\n2. Buscar y desactivar la fuente de interferencia primero.\n"))

        if terceraDecision == 1:
            print("El sistema falla debido a la interferencia. Los frenos no se activan y el tren sigue acelerando. El héroe debe decidir:")
            cuartaDecision = int(input("1. Saltar al tren para intentar frenarlo manualmente.\n2. Enviar una alerta a los pasajeros para evacuar.\n"))

            if cuartaDecision == 1:
                print("El héroe se lanza sobre el tren y logra activar manualmente un freno de emergencia.\nEl tren se detiene, pero el impacto es mortal para él. Se convierte en leyenda.")
            elif cuartaDecision == 2:
                print("Los pasajeros evacúan con éxito, pero el tren descarrila y explota.\nMueren varios ingenieros que iban en la cabina. El héroe es culpado por no haber intervenido directamente.")

        elif terceraDecision == 2:
            print("El héroe localiza la interferencia y la desactiva. Reinicia los frenos con éxito.\nEl tren se detiene a tiempo. Todos sobreviven y el héroe es celebrado como un genio técnico.")

    elif primeraDecision == 2:
        print("El héroe decide estabilizar la levitación del tren.")

        segundaDecision = int(input("Para estabilizar la levitación debe elegir entre:\n1. Reforzar el campo electromagnético desde el sistema base.\n2. Redirigir energía de otros sistemas secundarios.\n"))

        if segundaDecision == 1:
            print("La señal es muy débil y toma tiempo. El tren logra mantenerse en el aire por poco.")
            terceraDecision = int(input("¿Qué hace ahora?\n1. Intentar el reinicio de frenos rápidamente.\n2. Coordinar un aterrizaje de emergencia usando la levitación.\n"))

            if terceraDecision == 1:
                print("El héroe logra reiniciar los frenos justo antes de que colapse el sistema.\nEl tren se detiene y todos sobreviven, aunque el héroe queda con secuelas neurológicas por el esfuerzo.")
            elif terceraDecision == 2:
                print("El aterrizaje de emergencia falla. El tren se estrella y mueren decenas de pasajeros, incluido un grupo escolar.\nEl héroe sobrevive, pero cae en una profunda depresión.")

        elif segundaDecision == 2:
            print("El héroe redirige energía y estabiliza la levitación, pero las comunicaciones se cortan.\nCorre a advertir a los pasajeros.")
            terceraDecision = int(input("1. Intentar evacuar a todos rápidamente.\n2. Sacrificarse quedándose en la terminal para mantener el sistema manualmente.\n"))

            if terceraDecision == 1:
                print("La evacuación es caótica y muchos no logran salir. El sistema falla sin mantenimiento constante y el tren se desploma.")
            elif terceraDecision == 2:
                print("El héroe permanece conectado al sistema, manteniéndolo estable manualmente.\nMuere en la explosión, pero todos los pasajeros sobreviven. Su nombre es grabado en una placa conmemorativa.")

### Opción 3

elif primeraDecision == 3:
    print(f"El héroe decide reunir a un equipo de héroes antes de actuar. A la escena se presentan 2 héroes más. Uno con el poder de la telequinesis, y otro con el poder de controlar el metal.\nUna vez que los aliados llegan, el héroe debe decidir cómo organizar la operación de rescate.")
    
    segundaDecision = int(input(f"1. Mantener el grupo unido en una única acción masiva. \n2. Dividir tareas para cada uno de los miembros\n"))
    
    if segundaDecision == 1:
        print(f"El héroe decide ejecutar el plan en conjunto. Le ordena a ambos héroes usar sus poderes para estabilizar el tren, mientras intentan bajarlo al suelo, acción que resulta muy costosa energéticamente para ambos héroes.\nUna repentina explosión de uno de los motores del tren hace que los héroes pierdan la concentración, desplomándose a caída libre el tren.\nDada la delicada situación, los héroes deben elegir una opción:")
        
        terceraDecision = int(input(f"1. Intentar desacelerar la caída entre los tres.\n2. Abandonar el intento de detener el tren e intentar salvar a cuantos pasajeros sea posible.\n"))
        
        if terceraDecision == 1:
            print(f"Los héroes deciden usar todas sus fuerzas para intentar frenar la caída del tren.\nEl tren parece no ceder, y sigue cayendo a toda velocidad. El héroe con poderes magnéticos, decide tomar una complicada decisión.\nDecide sacrificarse a sí mismo, impulsando sus poderes más allá de sus límites.\nEl héroe magnético logra una maravillosa hazaña, y el tren se reposa sobre el suelo suavemente, salvando a todos los pasajeros.\nLos héroes restantes, devastados, se retiran del lugar.\nMeses después, la esposa del héroe con poderes magnéticos decide quitarse la vida.")

        elif terceraDecision == 2:
            print(f"Los héroes deciden invertir todos sus esfuerzos en salvar a la mayor cantidad posible de pasajeros, deben decidir si rescatar los vagones de adelante, o los vagones de atrás.\nDado el frenesí del momento, los héroes no pueden detallar quién hay en cada vagón.\n ¿Qué deciden hacer los héroes?")
            
            cuartaDecision = int(input(f"1. Salvar los vagones de adelante\n2. Salvar los vagones de atrás.\n"))
            
            if cuartaDecision == 1:
                print(f"Los héroes deciden salvar los vagones de adelante, usando sus poderes para crear un colchón mágico espacial, amortiguando la caída de los vagones, dejando daños menores.\nSe escuchan los gritos de un grupo de niños que iban en los vagones de adelante, quienes ahora están coreando a los héroes y agradeciéndoles por salvarlos.\nLos vagones de atrás caen al suelo y explotan en mil pedazos, causando la muerte de un importante diplomático de la nación del oeste.\nTras unos largos diálogos de paz entre la nación del este y la nación del oeste, ambas finalmente llegan a un acuerdo, y logran por poco, evitar una gran guerra.")
            
            elif cuartaDecision == 2:
                print(f"Los héroes deciden salvar a los vagones de atrás, usando sus poderes para crear un colchón mágico espacial, amortiguando la caída de los vagones, dejando daños menores.\nLos vagones de adelante caen al suelo, explotando en mil pedazos.\nDesde los vagones de atrás emergen los pasajeros, de entre ellos, los héroes logran distinguir a un importante diplomático de la nación del oeste, quien les promete una gran recompensa por haberlo salvado.\nLos héroes reciben una gran recompensa monetaria por parte de la nación del oeste a modo de agradecimiento por haber salvado a su diplomático.")
    
    elif segundaDecision == 2:
        print(f"El héroe decide darle tareas separadas a cada héroe adicional, piensa que uno puede encargarse de sostener el tren mientras que el otro puede bajar a los pasajeros.\n¿Qué héroe debería encargarse de sostener el tren?")
        
        terceraDecision = int(input(f"1. El héroe con poderes telepáticos\n2. El héroe con poderes magnéticos\n"))
        
        if terceraDecision == 1:
            print(f"El héroe con poderes telepáticos usa toda su concentración para mantener el tren a flote, pues nunca ha tenido que sostener tal masa.\nMientras esto, el héroe con poderes magnéticos se encarga de movilizar los pasajeros usando su habilidad de vuelo.\nSin embargo, los poderes del héroe telépata ceden, y accidentalmente deja caer al vacío dos vagones en cada extremo del tren.\nUno de los vagones se encuentra lleno de niños y ancianos, hacían parte de una excursión de una escuela local, el otro vagón, tiene solo 3 personas, 3 hombres de mediana edad, uno de ellos siendo el importante diplomático.\nEl héroe principal, se ve forzado a usar su superfuerza para salvar uno de los vagones, sin embargo, debe tomar una decisión.")
            
            cuartaDecision = int(input(f"1. Salvar el vagón de niños y ancianos.\n2. Salvar el vagón del diplomático.\n"))
            
            if cuartaDecision == 1:
                print(f"El héroe logra salvar satisfactoriamente al grupo de ancianos y niños, quienes, agradecidos, empiezan a corear al héroe victorioso.\nSin embargo, el otro vagón cae al suelo y explota en mil pedazos.\nEl resto de héroes logran terminar de evacuar los pasajeros y liberan el peso del resto del tren en un lugar seguro.\nMeses después, se desata una guerra entre la nación del este y la nación del oeste, ya que esta última culpa a la primera de haber orquestado el incidente con el objetivo de asesinar a su diplomático.")
            
            elif cuartaDecision == 2:
                print(f"El héroe salva el vagón del diplomático, dejando caer el otro vagón, el cual procede a prenderse en llamas.\nEl resto de héroes logran terminar de evacuar los pasajeros y liberan el peso del resto del tren en un lugar seguro.\nEste evento supone un gran trauma para el héroe, quien adquiere una fuerte adicción al tabaco y al alcohol, lo cual hace que pierda su licencia de héroe.")
        
        elif terceraDecision == 2:
            print(f"El héroe con poderes magnéticos usa todo su poder para sostener el tren, mientras que el resto de héroes usan sus habilidades para sacar a los pasajeros del tren.\nTodos los héroes logran hacer sus tareas satisfactoriamente, salvando a todos.")

