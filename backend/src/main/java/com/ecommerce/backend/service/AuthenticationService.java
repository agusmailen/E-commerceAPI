package com.ecommerce.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ecommerce.backend.dto.LoginDTO;
import com.ecommerce.backend.dto.RegistroUsuarioDTO;
import com.ecommerce.backend.dto.UsuarioDTO;
import com.ecommerce.backend.entity.Usuario;
import com.ecommerce.backend.enums.Rol;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.exception.EmailAlreadyExistsException;
import com.ecommerce.backend.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UsuarioDTO registrarUsuario(RegistroUsuarioDTO registroDTO) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            throw new EmailAlreadyExistsException(registroDTO.getEmail());
        }
        
        // Verificar si el user ya existe
        if (usuarioRepository.existsByUser(registroDTO.getUser())) {
            throw new BadRequestException("El user ya está en uso");
        }
        
        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setEmail(registroDTO.getEmail());
        usuario.setPassword(passwordEncoder.encode(registroDTO.getPassword()));
        usuario.setFirstName(registroDTO.getFirstName());
        usuario.setLastName(registroDTO.getLastName());
        usuario.setNombre(registroDTO.getFirstName() + " " + registroDTO.getLastName());
        usuario.setUser(registroDTO.getUser());
        usuario.setRol(Rol.CLIENTE);
        
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return new UsuarioDTO(usuarioGuardado);
    }

    public String autenticarYGenerarToken(LoginDTO loginDTO) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
                ));
        return jwtService.generateToken(authentication);
    }
}
