
package com.ecommerce.backend.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;

@Data
public class LoginDTO {

    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;

    // Constructors
    public LoginDTO() {}
}