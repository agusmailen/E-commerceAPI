package com.ecommerce.backend.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ecommerce.backend.enums.Rol;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe tener un formato válido")
    @Column(unique = true, nullable = false)
    private String email;
    
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    @Column(nullable = false)
    private String password;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "user_name", unique = true)
    private String user;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol = Rol.CLIENTE;
    
    // Constructors
    public Usuario() {}
    
    public Usuario(String email, String password, String nombre, Rol rol) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.rol = rol;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // resultado ROLE_USER o ROLE_ADMIN
        return List.of(new SimpleGrantedAuthority("ROLE_" + (rol != null ? rol.name() : "USER")));
    }

    // Implementación de UserDetails: getUsername() debe devolver el email
    @Override
    public String getUsername() {
        return email;
    }
}
