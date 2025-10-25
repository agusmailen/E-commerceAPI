# Módulo de Categorías - E-commerce API

## Resumen de Implementación

Se ha implementado completamente el módulo de **Categorías** siguiendo los mismos patrones arquitectónicos utilizados en las demás entidades del sistema (Producto, Usuario, Pedido).

## Estructura Implementada

### 1. **Entity**: `Categoria.java`
- **Ubicación**: `src/main/java/com/ecommerce/backend/entity/Categoria.java`
- **Características**:
  - ID autogenerado
  - Nombre único y obligatorio
  - Descripción (opcional)
  - URL de imagen (opcional)
  - Estado (ACTIVA/INACTIVA)
  - Relación OneToMany con Productos
  - Métodos helper: `isActiva()`, `getCantidadProductos()`

### 2. **DTO**: `CategoriaDTO.java`
- **Ubicación**: `src/main/java/com/ecommerce/backend/dto/CategoriaDTO.java`
- **Características**:
  - Validaciones con Jakarta Validation
  - Constructor que convierte Entity a DTO
  - Incluye cantidad de productos asociados

### 3. **Repository**: `CategoriaRepository.java`
- **Ubicación**: `src/main/java/com/ecommerce/backend/repository/CategoriaRepository.java`
- **Métodos**:
  - `findByNombre(String nombre)`: Buscar por nombre
  - `existsByNombre(String nombre)`: Verificar existencia
  - `findByEstado(Estado, Sort)`: Filtrar por estado
  - `findCategoriasActivas(Sort)`: Obtener solo activas
  - `findByNombreContainingIgnoreCase(String, Sort)`: Búsqueda parcial

### 4. **Service**: `CategoriaService.java`
- **Ubicación**: `src/main/java/com/ecommerce/backend/service/CategoriaService.java`
- **Métodos**:
  - `obtenerTodasLasCategorias()`: Listado con filtros y ordenamiento
  - `obtenerCategoriaPorId()`: Buscar por ID
  - `obtenerCategoriaPorNombre()`: Buscar por nombre
  - `crearCategoria()`: Crear nueva categoría
  - `actualizarCategoria()`: Actualizar categoría existente
  - `eliminarCategoria()`: Eliminar (con validación de productos asociados)

### 5. **Controller**: `CategoriaController.java`
- **Ubicación**: `src/main/java/com/ecommerce/backend/controller/CategoriaController.java`
- **Características**:
  - CORS habilitado
  - Endpoints protegidos con `@PreAuthorize("hasRole('ADMIN')")` para crear, actualizar y eliminar
  - Validaciones automáticas con `@Valid`

## Endpoints REST

### GET `/categorias`
**Descripción**: Obtener todas las categorías

**Parámetros de Query**:
- `search` (opcional): Búsqueda por nombre
- `_sort` (opcional, default: "nombre"): Campo de ordenamiento
- `_order` (opcional, default: "asc"): Dirección del ordenamiento (asc/desc)
- `activas` (opcional): Si es true, solo devuelve categorías activas

**Ejemplo**:
```
GET /categorias?search=tecno&_sort=nombre&_order=asc&activas=true
```

**Respuesta**:
```json
[
  {
    "id": 1,
    "nombre": "Tecnología",
    "descripcion": "Productos tecnológicos y electrónicos",
    "imagenUrl": "https://example.com/imagen.jpg",
    "estado": "activa",
    "cantidadProductos": 5
  }
]
```

### GET `/categorias/{id}`
**Descripción**: Obtener una categoría por ID

**Respuesta**:
```json
{
  "id": 1,
  "nombre": "Tecnología",
  "descripcion": "Productos tecnológicos y electrónicos",
  "imagenUrl": "https://example.com/imagen.jpg",
  "estado": "activa",
  "cantidadProductos": 5
}
```

### GET `/categorias/nombre/{nombre}`
**Descripción**: Obtener una categoría por nombre exacto

**Ejemplo**:
```
GET /categorias/nombre/Tecnología
```

### POST `/categorias`
**Descripción**: Crear una nueva categoría
**Autenticación**: Requiere rol ADMIN

**Body**:
```json
{
  "nombre": "Hogar",
  "descripcion": "Productos para el hogar",
  "imagenUrl": "https://example.com/hogar.jpg",
  "estado": "activa"
}
```

**Validaciones**:
- `nombre`: Obligatorio, debe ser único
- Estado por defecto: ACTIVA

### PUT `/categorias/{id}`
**Descripción**: Actualizar una categoría existente
**Autenticación**: Requiere rol ADMIN

**Body**: Igual que POST

**Validaciones**:
- Verifica que no exista otra categoría con el mismo nombre
- Valida que la categoría exista

### DELETE `/categorias/{id}`
**Descripción**: Eliminar una categoría
**Autenticación**: Requiere rol ADMIN

**Validaciones**:
- No se puede eliminar si tiene productos asociados
- Devuelve error 400 si tiene productos

## Cambios en Producto

### Modificaciones en `Producto.java`
- **Antes**: Campo `categoria` era String
- **Ahora**: Relación `@ManyToOne` con la entidad `Categoria`
```java
@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "categoria_id", nullable = false)
@NotNull(message = "La categoría es obligatoria")
private Categoria categoria;
```

### Modificaciones en `ProductoDTO.java`
- **Nuevos campos**:
  - `categoriaId`: Long (para crear/actualizar productos)
  - `categoriaNombre`: String (para mostrar en respuestas)

### Modificaciones en `ProductoService.java`
- Inyección de `CategoriaRepository`
- Métodos actualizados para trabajar con el ID de categoría
- Validaciones de existencia de categoría al crear/actualizar productos

### Modificaciones en `ProductoRepository.java`
- Métodos actualizados para usar la entidad Categoria en lugar de String
- Nuevos métodos: `findByCategoriaId()`, `findByCategoriaIdAndNombreContainingIgnoreCase()`

## DataInitializer

### Categorías iniciales creadas:
1. **Tecnología**: Productos tecnológicos y electrónicos
2. **Deportes**: Artículos deportivos
3. **Fotografía**: Equipos y accesorios fotográficos
4. **Accesorios**: Accesorios diversos

Todos los productos existentes ahora están asociados a estas categorías mediante la relación ManyToOne.

## Base de Datos

### Tabla `categorias`
```sql
CREATE TABLE categorias (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  descripcion TEXT,
  imagen_url VARCHAR(255),
  estado VARCHAR(50) NOT NULL
);
```

### Modificación en tabla `productos`
- Se agregó columna `categoria_id` (FK a categorias)
- Se removió columna `categoria` (String)

## Validaciones y Excepciones

1. **BadRequestException**: 
   - Al intentar crear categoría con nombre duplicado
   - Al intentar eliminar categoría con productos asociados

2. **ResourceNotFoundException**:
   - Al buscar categoría que no existe
   - Al asignar producto a categoría inexistente

## Seguridad

- **Endpoints públicos** (lectura): `GET /categorias`, `GET /categorias/{id}`, `GET /categorias/nombre/{nombre}`
- **Endpoints protegidos** (solo ADMIN): `POST`, `PUT`, `DELETE`

## Testing Recomendado

1. **Crear categorías** (con usuario admin)
2. **Listar categorías** (público)
3. **Buscar por nombre**
4. **Filtrar solo activas**
5. **Crear productos** con categorías válidas
6. **Intentar eliminar categoría** con productos (debe fallar)
7. **Actualizar categoría**
8. **Cambiar estado** a INACTIVA

## Integración con Frontend

El frontend necesitará actualizar:
1. Componente de gestión de categorías (CRUD)
2. Selector de categoría en formularios de productos (enviar `categoriaId`)
3. Filtros de productos por categoría (usar `categoriaNombre` o `categoriaId`)
4. Mostrar categorías en tarjetas de productos

## Próximos Pasos Sugeridos

1. ✅ Implementar tests unitarios para `CategoriaService`
2. ✅ Implementar tests de integración para `CategoriaController`
3. ✅ Agregar caché para categorías (opcional)
4. ✅ Implementar paginación si hay muchas categorías
5. ✅ Agregar campo de orden/prioridad para controlar visualización
6. ✅ Implementar soft delete en lugar de hard delete

## Notas de Implementación

- Se usó **Lombok** para reducir boilerplate (`@Data`)
- Se implementó **Spring Data JPA** para queries automáticas
- Se siguió el patrón **DTO** para separar capa de presentación
- Se mantiene **consistencia** con el resto de la arquitectura
- Se aplicó **validación en múltiples capas** (DTO, Service)
- Se usó **@Transactional** para operaciones de BD

---

**Autor**: Sistema de E-commerce - Implementación Categorías
**Fecha**: Octubre 2025
**Tecnologías**: Spring Boot, JPA, Lombok, Maven, Java 17
