package com.ecommerce.backend.dto;

import com.ecommerce.backend.entity.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

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
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
