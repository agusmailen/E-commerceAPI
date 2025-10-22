package com.ecommerce.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ecommerce.backend.entity.Pedido;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PedidoDTO {
    private Long id;

    @NotNull(message = "usuarioId es obligatorio")
    private Long usuarioId;

    private List<PedidoItemDTO> items = new ArrayList<>();

    private BigDecimal total;
    private LocalDateTime createdAt;

    public PedidoDTO() {}

    public PedidoDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.usuarioId = pedido.getUsuario() != null ? pedido.getUsuario().getId() : null;
    this.total = pedido.getTotal();
        this.createdAt = pedido.getCreatedAt();
        pedido.getItems().forEach(i -> this.items.add(new PedidoItemDTO(i)));
    }
}
