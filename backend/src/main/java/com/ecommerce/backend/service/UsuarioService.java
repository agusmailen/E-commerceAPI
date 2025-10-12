package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.LoginDTO;
import com.ecommerce.backend.dto.RegistroUsuarioDTO;
import com.ecommerce.backend.dto.UsuarioDTO;
import com.ecommerce.backend.entity.Usuario;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.exception.EmailAlreadyExistsException;
import com.ecommerce.backend.exception.InvalidCredentialsException;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<UsuarioDTO> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioDTO::new)
                .collect(Collectors.toList());
    }
    
    public UsuarioDTO registrarUsuario(RegistroUsuarioDTO registroDTO) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            throw new EmailAlreadyExistsException(registroDTO.getEmail());
        }
        
        // Verificar si el username ya existe
        if (usuarioRepository.existsByUsername(registroDTO.getUsername())) {
            throw new BadRequestException("El username ya está en uso");
        }
        
        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setEmail(registroDTO.getEmail());
        usuario.setPassword(registroDTO.getPassword());
        usuario.setFirstName(registroDTO.getFirstName());
        usuario.setLastName(registroDTO.getLastName());
        usuario.setNombre(registroDTO.getFirstName() + " " + registroDTO.getLastName());
        usuario.setUsername(registroDTO.getUsername());
        usuario.setRol(Usuario.Rol.CLIENTE);
        
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return new UsuarioDTO(usuarioGuardado);
    }
    
    public UsuarioDTO autenticarUsuario(LoginDTO loginDTO) {
        Usuario usuario = usuarioRepository.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword())
                .orElseThrow(() -> new InvalidCredentialsException());
        
        return new UsuarioDTO(usuario);
    }
}
