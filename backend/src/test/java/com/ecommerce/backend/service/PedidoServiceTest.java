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

import com.ecommerce.backend.dto.PedidoDTO;
import com.ecommerce.backend.dto.PedidoItemDTO;
import com.ecommerce.backend.entity.Pedido;
import com.ecommerce.backend.entity.Producto;
import com.ecommerce.backend.entity.Usuario;
import com.ecommerce.backend.enums.Estado;
import com.ecommerce.backend.enums.Rol;
import com.ecommerce.backend.exception.InsufficientStockException;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.PedidoRepository;
import com.ecommerce.backend.repository.ProductoRepository;
import com.ecommerce.backend.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private PedidoService pedidoService;

    private Usuario usuario;
    private Producto producto1;
    private Producto producto2;
    private Pedido pedido;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("usuario@test.com");
        usuario.setNombre("Usuario Test");
        usuario.setRol(Rol.CLIENTE);

        producto1 = new Producto();
        producto1.setId(1L);
        producto1.setNombre("Laptop");
        producto1.setPrecio(BigDecimal.valueOf(1000.00));
        producto1.setStock(10);
        producto1.setEstado(Estado.ACTIVO);

        producto2 = new Producto();
        producto2.setId(2L);
        producto2.setNombre("Mouse");
        producto2.setPrecio(BigDecimal.valueOf(50.00));
        producto2.setStock(5);
        producto2.setEstado(Estado.ACTIVO);

        pedido = new Pedido();
        pedido.setId(1L);
        pedido.setUsuario(usuario);
        pedido.setTotal(BigDecimal.valueOf(1050.00));
    }

    @Test
    void crearPedido_ConDatosValidos_DeberiaCrearPedido() {
        // Arrange
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setUsuarioId(1L);
        
        PedidoItemDTO item1 = new PedidoItemDTO();
        item1.setProductoId(1L);
        item1.setCantidad(1);
        
        PedidoItemDTO item2 = new PedidoItemDTO();
        item2.setProductoId(2L);
        item2.setCantidad(1);
        
        pedidoDTO.setItems(Arrays.asList(item1, item2));

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto1));
        when(productoRepository.findById(2L)).thenReturn(Optional.of(producto2));
        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        // Act
        PedidoDTO resultado = pedidoService.crearPedido(pedidoDTO);

        // Assert
        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals(1L, resultado.getUsuarioId());
        verify(usuarioRepository, times(1)).findById(1L);
        verify(productoRepository, times(1)).findById(1L);
        verify(productoRepository, times(1)).findById(2L);
        verify(productoRepository, times(2)).save(any(Producto.class));
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }

    @Test
    void crearPedido_ConUsuarioInvalido_DeberiaLanzarExcepcion() {
        // Arrange
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setUsuarioId(999L);
        pedidoDTO.setItems(Arrays.asList());

        when(usuarioRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            pedidoService.crearPedido(pedidoDTO);
        });
        verify(usuarioRepository, times(1)).findById(999L);
        verify(pedidoRepository, never()).save(any(Pedido.class));
    }

    @Test
    void crearPedido_ConProductoInvalido_DeberiaLanzarExcepcion() {
        // Arrange
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setUsuarioId(1L);
        
        PedidoItemDTO item = new PedidoItemDTO();
        item.setProductoId(999L);
        item.setCantidad(1);
        pedidoDTO.setItems(Arrays.asList(item));

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            pedidoService.crearPedido(pedidoDTO);
        });
        verify(usuarioRepository, times(1)).findById(1L);
        verify(productoRepository, times(1)).findById(999L);
        verify(pedidoRepository, never()).save(any(Pedido.class));
    }

    @Test
    void crearPedido_ConStockInsuficiente_DeberiaLanzarExcepcion() {
        // Arrange
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setUsuarioId(1L);
        
        PedidoItemDTO item = new PedidoItemDTO();
        item.setProductoId(1L);
        item.setCantidad(20); // Más que el stock disponible (10)
        pedidoDTO.setItems(Arrays.asList(item));

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto1));

        // Act & Assert
        assertThrows(InsufficientStockException.class, () -> {
            pedidoService.crearPedido(pedidoDTO);
        });
        verify(usuarioRepository, times(1)).findById(1L);
        verify(productoRepository, times(1)).findById(1L);
        verify(productoRepository, never()).save(any(Producto.class));
        verify(pedidoRepository, never()).save(any(Pedido.class));
    }

    @Test
    void crearPedido_DeberiaDescontarStock() {
        // Arrange
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setUsuarioId(1L);
        
        PedidoItemDTO item = new PedidoItemDTO();
        item.setProductoId(1L);
        item.setCantidad(3);
        pedidoDTO.setItems(Arrays.asList(item));

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto1));
        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> {
            Producto productoActualizado = invocation.getArgument(0);
            assertEquals(7, productoActualizado.getStock()); // 10 - 3 = 7
            return productoActualizado;
        });
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        // Act
        PedidoDTO resultado = pedidoService.crearPedido(pedidoDTO);

        // Assert
        assertNotNull(resultado);
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    @Test
    void obtenerPedidoPorId_ConIdValido_DeberiaRetornarPedido() {
        // Arrange
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        // Act
        PedidoDTO resultado = pedidoService.obtenerPedidoPorId(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        verify(pedidoRepository, times(1)).findById(1L);
    }

    @Test
    void obtenerPedidoPorId_ConIdInvalido_DeberiaLanzarExcepcion() {
        // Arrange
        when(pedidoRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            pedidoService.obtenerPedidoPorId(999L);
        });
        verify(pedidoRepository, times(1)).findById(999L);
    }

    @Test
    void obtenerPedidosPorUsuario_DeberiaRetornarListaDePedidos() {
        // Arrange
        when(pedidoRepository.findByUsuarioId(1L)).thenReturn(Arrays.asList(pedido));

        // Act
        List<PedidoDTO> resultado = pedidoService.obtenerPedidosPorUsuario(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals(1L, resultado.get(0).getId());
        verify(pedidoRepository, times(1)).findByUsuarioId(1L);
    }

    @Test
    void obtenerTodosLosPedidos_DeberiaRetornarListaOrdenadaPorFecha() {
        // Arrange
        when(pedidoRepository.findAll(any(Sort.class))).thenReturn(Arrays.asList(pedido));

        // Act
        List<PedidoDTO> resultado = pedidoService.obtenerTodosLosPedidos();

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(pedidoRepository, times(1)).findAll(any(Sort.class));
    }

    @Test
    void crearPedido_DeberiaCalcularTotalCorrectamente() {
        // Arrange
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setUsuarioId(1L);
        
        PedidoItemDTO item1 = new PedidoItemDTO();
        item1.setProductoId(1L);
        item1.setCantidad(2); // 2 * 1000 = 2000
        
        PedidoItemDTO item2 = new PedidoItemDTO();
        item2.setProductoId(2L);
        item2.setCantidad(3); // 3 * 50 = 150
        
        pedidoDTO.setItems(Arrays.asList(item1, item2));
        // Total esperado: 2150

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto1));
        when(productoRepository.findById(2L)).thenReturn(Optional.of(producto2));
        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> {
            Pedido pedidoGuardado = invocation.getArgument(0);
            assertEquals(0, new BigDecimal("2150.00").compareTo(pedidoGuardado.getTotal()));
            return pedidoGuardado;
        });

        // Act
        pedidoService.crearPedido(pedidoDTO);

        // Assert
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }
}

