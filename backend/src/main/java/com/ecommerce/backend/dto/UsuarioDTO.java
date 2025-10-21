package com.ecommerce.backend.dto;

import com.ecommerce.backend.entity.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsuarioDTO {
    
    private Long id;
    
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe tener un formato válido")
    private String email;
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    private String firstName;
    private String lastName;
    private String user;
    private String rol;
    
    // Constructors
    public UsuarioDTO() {}
    
    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.email = usuario.getEmail();
        this.nombre = usuario.getNombre();
        this.firstName = usuario.getFirstName();
        this.lastName = usuario.getLastName();
    this.user = usuario.getUser();
        this.rol = usuario.getRol().getValue();
    }
}
