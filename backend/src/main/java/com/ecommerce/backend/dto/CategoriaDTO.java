package com.ecommerce.backend.dto;

import com.ecommerce.backend.entity.Categoria;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoriaDTO {
    
    private Long id;
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    private String descripcion;
    
    private String imagenUrl;
    
    private String estado;
    
    private Integer cantidadProductos;
    
    // Constructores
    public CategoriaDTO() {}
    
    public CategoriaDTO(Categoria categoria) {
        this.id = categoria.getId();
        this.nombre = categoria.getNombre();
        this.descripcion = categoria.getDescripcion();
        this.imagenUrl = categoria.getImagenUrl();
        this.estado = categoria.getEstado().getValue();
        this.cantidadProductos = categoria.getCantidadProductos();
    }
}
