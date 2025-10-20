# Backend - E-commerce API

API REST desarrollada con Spring Boot y Java 21 para proporcionar servicios de e-commerce.

## Características

- **Spring Boot 3.3.0** con Java 21
- **PostgreSQL** en Docker para persistencia
- **JPA/Hibernate** para ORM
- **Spring Security** para autenticación y autorización
- **Bean Validation** para validaciones
- **CORS** configurado para el frontend

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/com/ecommerce/backend/
│   │   ├── controller/     # Controladores REST
│   │   ├── service/        # Lógica de negocio
│   │   ├── repository/     # Acceso a datos
│   │   ├── entity/         # Entidades JPA
│   │   └── dto/           # DTOs
│   └── resources/
│       ├── application.yml # Configuración
│       └── data.sql       # Datos de prueba
```

## Endpoints

### Usuarios (`/api/usuarios`)
- `GET /` - Listar usuarios
- `POST /` - Registrar usuario
- `POST /login` - Autenticar usuario

### Productos (`/api/productos`)
- `GET /` - Listar productos (con filtros)
- `GET /{id}` - Obtener producto por ID
- `POST /` - Crear producto
- `PUT /{id}` - Actualizar producto
- `DELETE /{id}` - Eliminar producto

## Requisitos Previos

- **Java 21** o superior
- **Maven 3.6+** (o usar el wrapper incluido `./mvnw`)
- **Docker** y **Docker Compose**
- **PostgreSQL** corriendo en Docker (ver instrucciones abajo)

## Cómo ejecutar

1. **Iniciar PostgreSQL con Docker:**
   
   Desde la raíz del proyecto:
   ```bash
   cd ..
   docker-compose up -d
   ```

2. **Verificar que PostgreSQL esté corriendo:**
   ```bash
   docker-compose ps
   ```

3. **Compilar el proyecto:**
   ```bash
   cd backend
   ./mvnw clean compile
   ```

4. **Ejecutar la aplicación:**
   ```bash
   ./mvnw spring-boot:run
   ```

5. **Acceder a la API:**
   - Base URL: `http://localhost:8080/api`
   - Swagger/Docs: (si está configurado) `http://localhost:8080/api/swagger-ui.html`

## Configuración de Base de Datos

### PostgreSQL (Docker)

- **Host**: `localhost`
- **Puerto**: `5432`
- **Base de datos**: `ecommerce`
- **Usuario**: `ecommerce_user`
- **Contraseña**: `ecommerce_pass`

### Acceder a PostgreSQL

```bash
docker exec -it ecommerce-postgres psql -U ecommerce_user -d ecommerce
```

Comandos útiles en psql:
- `\dt` - Listar tablas
- `\d nombre_tabla` - Ver estructura de tabla
- `\q` - Salir

## Datos de Prueba

La aplicación inicializa automáticamente con datos de prueba (ver `DataInitializer.java`).

### Usuarios:
- **Admin**: `admin@shophub.com` / `admin123` (Rol: ADMIN)
- **Usuario**: `usuario@shophub.com` / `usuario123` (Rol: CLIENTE)
- **Juan**: `juan@shophub.com` / `juan123` (Rol: CLIENTE)
- **María**: `maria@shophub.com` / `maria123` (Rol: CLIENTE)

### Productos:
- 12 productos en diferentes categorías:
  - Tecnología (Laptop, Smartwatch, Auriculares)
  - Deportes (Zapatillas, Guantes, Raqueta, Bicicleta, Pelota)
  - Fotografía (Cámara, Drone, Mochila)
  - Accesorios (Termo)
- Stock y estados variados para testing

## Detener la Base de Datos

Para detener PostgreSQL:
```bash
docker-compose stop
```

Para eliminar todo (incluyendo datos):
```bash
docker-compose down -v
```

## Arquitectura

```
backend/
├── config/          # Configuración (Security, DataInitializer)
├── controller/      # Controladores REST
├── service/         # Lógica de negocio
├── repository/      # Repositorios JPA
├── entity/          # Entidades (Usuario, Producto, Pedido)
├── dto/             # Data Transfer Objects
└── exception/       # Manejo de excepciones
```

## Tecnologías Utilizadas

- Spring Boot 3.3.0
- Spring Data JPA
- Spring Security
- PostgreSQL
- Hibernate
- Bean Validation
- Lombok (opcional)
- Maven