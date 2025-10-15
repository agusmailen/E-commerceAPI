package com.ecommerce.backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.backend.dto.PedidoDTO;
import com.ecommerce.backend.dto.PedidoItemDTO;
import com.ecommerce.backend.entity.Pedido;
import com.ecommerce.backend.entity.PedidoItem;
import com.ecommerce.backend.entity.Producto;
import com.ecommerce.backend.entity.Usuario;
import com.ecommerce.backend.exception.InsufficientStockException;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.PedidoRepository;
import com.ecommerce.backend.repository.ProductoRepository;
import com.ecommerce.backend.repository.UsuarioRepository;

@Service
@Transactional
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public PedidoDTO crearPedido(PedidoDTO pedidoDTO) {
        Usuario usuario = usuarioRepository.findById(pedidoDTO.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", pedidoDTO.getUsuarioId()));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);

        BigDecimal total = BigDecimal.ZERO;

        for (PedidoItemDTO itemDTO : pedidoDTO.getItems()) {
            Producto producto = productoRepository.findById(itemDTO.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", itemDTO.getProductoId()));

            if (producto.getStock() < itemDTO.getCantidad()) {
                throw new InsufficientStockException(producto.getNombre(), producto.getStock(), itemDTO.getCantidad());
            }

            // descontar stock
            producto.setStock(producto.getStock() - itemDTO.getCantidad());
            productoRepository.save(producto);

            PedidoItem item = new PedidoItem(producto, itemDTO.getCantidad(), producto.getPrecio());
            pedido.addItem(item);

            total = total.add(producto.getPrecio().multiply(new BigDecimal(itemDTO.getCantidad())));
        }

        pedido.setTotal(total);
        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        return new PedidoDTO(pedidoGuardado);
    }

    public PedidoDTO obtenerPedidoPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido", "id", id));
        return new PedidoDTO(pedido);
    }

    public List<PedidoDTO> obtenerPedidosPorUsuario(Long usuarioId) {
        List<Pedido> pedidos = pedidoRepository.findByUsuarioId(usuarioId);
        return pedidos.stream().map(PedidoDTO::new).toList();
    }

    public List<PedidoDTO> obtenerTodosLosPedidos() {
        List<Pedido> pedidos = pedidoRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return pedidos.stream().map(PedidoDTO::new).toList();
    }
}
