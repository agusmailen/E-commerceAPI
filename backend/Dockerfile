# --- Etapa 1: Construcción (Build) ---
# Usamos una imagen de Maven con JDK 17 (definido en tu pom.xml)
FROM maven:3.9-eclipse-temurin-17 AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos solo el pom.xml para descargar dependencias (esto optimiza la caché de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el resto del código fuente del backend
COPY src ./src

# Construimos la aplicación. Esto generará el .jar en /app/target/
# Nos saltamos los tests para un build más rápido
RUN mvn package -DskipTests

# --- Etapa 2: Ejecución (Run) ---
# Usamos una imagen ligera de JRE 17 (solo para ejecutar)
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Exponemos el puerto 8080 (el que usa tu API según application.yml)
EXPOSE 8080

# Copiamos el .jar construido en la etapa anterior
# El nombre del .jar viene de tu pom.xml (<artifactId> y <version>)
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]