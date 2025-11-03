package com.ecommerce.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import com.ecommerce.backend.dto.ProductoDTO;
import com.ecommerce.backend.entity.Producto;
import com.ecommerce.backend.enums.Estado;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.ProductoRepository;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    private Producto producto1;
    private Producto producto2;

    @BeforeEach
    void setUp() {
        producto1 = new Producto();
        producto1.setId(1L);
        producto1.setNombre("Laptop Gaming");
        producto1.setDescripcion("Laptop de alto rendimiento");
        producto1.setPrecio(BigDecimal.valueOf(1500.00));
        producto1.setCategoria("Tecnología");
        producto1.setStock(10);
        producto1.setEstado(Estado.ACTIVO);

        producto2 = new Producto();
        producto2.setId(2L);
        producto2.setNombre("Mouse Gamer");
        producto2.setDescripcion("Mouse óptico RGB");
        producto2.setPrecio(BigDecimal.valueOf(50.00));
        producto2.setCategoria("Tecnología");
        producto2.setStock(0);
        producto2.setEstado(Estado.AGOTADO);
    }

    @Test
    void obtenerTodosLosProductos_DeberiaRetornarListaCompleta() {
        // Arrange
        when(productoRepository.findAll(any(Sort.class)))
                .thenReturn(Arrays.asList(producto1, producto2));

        // Act
        List<ProductoDTO> resultado = productoService.obtenerTodosLosProductos(null, null, "nombre", "asc");

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("Laptop Gaming", resultado.get(0).getNombre());
        assertEquals("Mouse Gamer", resultado.get(1).getNombre());
        verify(productoRepository, times(1)).findAll(any(Sort.class));
    }

    @Test
    void obtenerTodosLosProductos_ConCategoria_DeberiaFiltrarPorCategoria() {
        // Arrange
        when(productoRepository.findByCategoria(eq("Tecnología"), any(Sort.class)))
                .thenReturn(Arrays.asList(producto1, producto2));

        // Act
        List<ProductoDTO> resultado = productoService.obtenerTodosLosProductos("Tecnología", null, "nombre", "asc");

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        verify(productoRepository, times(1)).findByCategoria(eq("Tecnología"), any(Sort.class));
    }

    @Test
    void obtenerTodosLosProductos_ConBusqueda_DeberiaFiltrarPorNombre() {
        // Arrange
        when(productoRepository.findByNombreContainingIgnoreCase(eq("laptop"), any(Sort.class)))
                .thenReturn(Arrays.asList(producto1));

        // Act
        List<ProductoDTO> resultado = productoService.obtenerTodosLosProductos(null, "laptop", "nombre", "asc");

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals("Laptop Gaming", resultado.get(0).getNombre());
        verify(productoRepository, times(1)).findByNombreContainingIgnoreCase(eq("laptop"), any(Sort.class));
    }

    @Test
    void obtenerProductoPorId_ConIdValido_DeberiaRetornarProducto() {
        // Arrange
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto1));

        // Act
        ProductoDTO resultado = productoService.obtenerProductoPorId(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("Laptop Gaming", resultado.getNombre());
        verify(productoRepository, times(1)).findById(1L);
    }

    @Test
    void obtenerProductoPorId_ConIdInvalido_DeberiaLanzarExcepcion() {
        // Arrange
        when(productoRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            productoService.obtenerProductoPorId(999L);
        });
        verify(productoRepository, times(1)).findById(999L);
    }

    @Test
    void crearProducto_ConDatosValidos_DeberiaCrearProducto() {
        // Arrange
        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setNombre("Nuevo Producto");
        productoDTO.setDescripcion("Descripción del producto");
        productoDTO.setPrecio(BigDecimal.valueOf(100.00));
        productoDTO.setCategoria("Tecnología");
        productoDTO.setStock(5);

        Producto productoGuardado = new Producto();
        productoGuardado.setId(3L);
        productoGuardado.setNombre(productoDTO.getNombre());
        productoGuardado.setDescripcion(productoDTO.getDescripcion());
        productoGuardado.setPrecio(productoDTO.getPrecio());
        productoGuardado.setCategoria(productoDTO.getCategoria());
        productoGuardado.setStock(productoDTO.getStock());
        productoGuardado.setEstado(Estado.ACTIVO);

        when(productoRepository.save(any(Producto.class))).thenReturn(productoGuardado);

        // Act
        ProductoDTO resultado = productoService.crearProducto(productoDTO);

        // Assert
        assertNotNull(resultado);
        assertEquals(3L, resultado.getId());
        assertEquals("Nuevo Producto", resultado.getNombre());
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    @Test
    void actualizarProducto_ConDatosValidos_DeberiaActualizarProducto() {
        // Arrange
        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setNombre("Laptop Gaming Actualizada");
        productoDTO.setDescripcion("Nueva descripción");
        productoDTO.setPrecio(BigDecimal.valueOf(1600.00));
        productoDTO.setCategoria("Tecnología");
        productoDTO.setStock(15);
        productoDTO.setEstado("ACTIVO");

        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto1));
        when(productoRepository.save(any(Producto.class))).thenReturn(producto1);

        // Act
        ProductoDTO resultado = productoService.actualizarProducto(1L, productoDTO);

        // Assert
        assertNotNull(resultado);
        verify(productoRepository, times(1)).findById(1L);
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    @Test
    void actualizarProducto_ConIdInvalido_DeberiaLanzarExcepcion() {
        // Arrange
        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setNombre("Producto Actualizado");

        when(productoRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            productoService.actualizarProducto(999L, productoDTO);
        });
        verify(productoRepository, times(1)).findById(999L);
        verify(productoRepository, never()).save(any(Producto.class));
    }

    @Test
    void eliminarProducto_ConIdValido_DeberiaEliminarProducto() {
        // Arrange
        when(productoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(productoRepository).deleteById(1L);

        // Act
        productoService.eliminarProducto(1L);

        // Assert
        verify(productoRepository, times(1)).existsById(1L);
        verify(productoRepository, times(1)).deleteById(1L);
    }

    @Test
    void eliminarProducto_ConIdInvalido_DeberiaLanzarExcepcion() {
        // Arrange
        when(productoRepository.existsById(999L)).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            productoService.eliminarProducto(999L);
        });
        verify(productoRepository, times(1)).existsById(999L);
        verify(productoRepository, never()).deleteById(anyLong());
    }
}

