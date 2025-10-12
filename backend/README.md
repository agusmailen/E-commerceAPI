# Backend - E-commerce API

API REST desarrollada con Spring Boot y Java 17 para reemplazar el json-server del frontend.

## Características

- **Spring Boot 3.3.0** con Java 17
- **Base de datos H2** en memoria para testing
- **JPA/Hibernate** para persistencia
- **Validación** con Bean Validation
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

## Cómo ejecutar

1. **Compilar el proyecto:**
   ```bash
   cd backend
   mvn clean compile
   ```

2. **Ejecutar la aplicación:**
   ```bash
   mvn spring-boot:run
   ```

3. **Acceder a la API:**
   - Base URL: `http://localhost:8080/api`
   - H2 Console: `http://localhost:8080/api/h2-console`

## Configuración H2

- URL: `jdbc:h2:mem:ecommerce`
- Usuario: `sa` (sin contraseña)

## Datos de Prueba

### Usuarios:
- **Admin**: `admin@shophub.com` / `admin123`
- **Usuario**: `usuario@shophub.com` / `usuario123`

### Productos:
- 12 productos con diferentes categorías
- Stock y estados variados para testing