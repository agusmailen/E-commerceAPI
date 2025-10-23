package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.AuthResponse;
import com.ecommerce.backend.dto.LoginDTO;
import com.ecommerce.backend.dto.RegistroUsuarioDTO;
import com.ecommerce.backend.dto.UsuarioDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.service.AuthenticationService;
import com.ecommerce.backend.service.UsuarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<UsuarioDTO> registrarUsuario(@Valid @RequestBody RegistroUsuarioDTO registroDTO) {
        UsuarioDTO usuario = authenticationService.registrarUsuario(registroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginDTO loginDTO) {
        String token = authenticationService.autenticarYGenerarToken(loginDTO);
        UsuarioDTO usuario = usuarioService.obtenerPorEmail(loginDTO.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, usuario));
    }
}
