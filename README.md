# E-commerce Full Stack Application

Aplicación de e-commerce completa con frontend en React y backend en Spring Boot.

## Estructura del Proyecto

```
E-commerceAPI/
├── frontend/          # Aplicación React (cliente)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/           # API Spring Boot (servidor)
│   ├── src/
│   ├── pom.xml
│   └── README.md
└── README.md         # Este archivo
```

## Tecnologías

### Frontend
- **React** con Vite
- **React Router** para navegación
- **Context API** para manejo de estado
- **CSS** para estilos
- **Material-UI** para componentes

### Backend
- **Spring Boot 3.3.0** con Java 21
- **Spring Data JPA** para persistencia
- **PostgreSQL** en Docker para base de datos
- **Maven** para gestión de dependencias
- **Bean Validation** para validaciones
- **Spring Security** para autenticación

## Cómo ejecutar el proyecto completo

### 1. Iniciar la Base de Datos (PostgreSQL en Docker)

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker-compose ps
```

### 2. Ejecutar el Backend

```bash
cd backend
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8080/api`

### 3. Ejecutar el Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## Endpoints de la API

### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Registrar usuario
- `POST /api/usuarios/login` - Autenticar usuario

### Productos
- `GET /api/productos` - Listar productos (con filtros)
- `GET /api/productos/{id}` - Obtener producto por ID
- `POST /api/productos` - Crear producto (admin)
- `PUT /api/productos/{id}` - Actualizar producto (admin)
- `DELETE /api/productos/{id}` - Eliminar producto (admin)

## Funcionalidades

### Para Usuarios
- ✅ Registro e inicio de sesión
- ✅ Navegación por productos
- ✅ Filtrado por categoría
- ✅ Búsqueda de productos
- ✅ Carrito de compras
- ✅ Gestión de cantidades

### Para Administradores
- ✅ Gestión completa de productos
- ✅ Crear, editar y eliminar productos
- ✅ Control de stock
- ✅ Gestión de categorías

## Base de Datos

El backend usa **PostgreSQL** corriendo en Docker con datos de prueba pre-cargados.

### Usuarios de prueba:
- **Admin**: `admin@shophub.com` / `admin123`
- **Usuario**: `usuario@shophub.com` / `usuario123`
- **Juan**: `juan@shophub.com` / `juan123`
- **María**: `maria@shophub.com` / `maria123`

### Acceso a PostgreSQL:

**Desde línea de comandos:**
```bash
docker exec -it ecommerce-postgres psql -U ecommerce_user -d ecommerce
```

**Configuración:**
- Base de datos: `ecommerce`
- Usuario: `ecommerce_user`
- Contraseña: `ecommerce_pass`
- Puerto: `5432`

📖 **Para más detalles sobre Docker y la base de datos, ver [DOCKER_SETUP.md](DOCKER_SETUP.md)**

## Migración del json-server

Este proyecto reemplaza el json-server original con una API REST completa:

- ✅ Mismos endpoints y estructura de datos
- ✅ Validaciones del lado del servidor
- ✅ Manejo de errores mejorado
- ✅ Base de datos relacional
- ✅ Arquitectura escalable

## Desarrollo

Para contribuir al proyecto:

1. Clonar el repositorio
2. Seguir las instrucciones de ejecución
3. Hacer cambios en las ramas correspondientes
4. Probar tanto frontend como backend
5. Enviar pull request

## Requisitos Previos

- **Java 21** o superior
- **Node.js 18** o superior
- **Docker** y **Docker Compose**
- **Maven** (o usar el wrapper incluido `mvnw`)

## Notas

- El frontend está configurado para usar `localhost:8080/api` (Spring Boot)
- CORS está configurado para permitir el desarrollo local
- Los datos persisten en PostgreSQL (no se pierden al reiniciar)
- Para eliminar todos los datos: `docker-compose down -v`