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
- **Spring Boot 3.3.0** con Java 17
- **Spring Data JPA** para persistencia
- **H2 Database** en memoria
- **Maven** para gestión de dependencias
- **Bean Validation** para validaciones

## Cómo ejecutar el proyecto completo

### 1. Ejecutar el Backend

```bash
cd backend
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8080/api`

### 2. Ejecutar el Frontend

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

El backend usa H2 en memoria con datos de prueba pre-cargados:

### Usuarios de prueba:
- **Admin**: `admin@shophub.com` / `admin123`
- **Usuario**: `usuario@shophub.com` / `usuario123`

### Consola H2:
- URL: `http://localhost:8080/api/h2-console`
- JDBC URL: `jdbc:h2:mem:ecommerce`
- Usuario: `sa` (sin contraseña)

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

## Notas

- El frontend está configurado para usar tanto `localhost:3000` (json-server) como `localhost:8080/api` (Spring Boot)
- CORS está configurado para permitir el desarrollo local
- Los datos se reinician cada vez que se ejecuta el backend (H2 en memoria)