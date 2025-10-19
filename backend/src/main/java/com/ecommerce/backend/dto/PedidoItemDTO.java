package com.ecommerce.backend.dto;

import java.math.BigDecimal;

import com.ecommerce.backend.entity.PedidoItem;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PedidoItemDTO {
    private Long id;

    @NotNull(message = "productoId es obligatorio")
    private Long productoId;

    @NotNull(message = "cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    private BigDecimal precioUnitario;

    public PedidoItemDTO() {}

    public PedidoItemDTO(PedidoItem item) {
        this.id = item.getId();
        this.productoId = item.getProducto() != null ? item.getProducto().getId() : null;
        this.cantidad = item.getCantidad();
        this.precioUnitario = item.getPrecioUnitario();
    }

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }
}
