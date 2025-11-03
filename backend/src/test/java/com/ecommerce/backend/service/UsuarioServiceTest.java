package com.ecommerce.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ecommerce.backend.dto.UsuarioDTO;
import com.ecommerce.backend.entity.Usuario;
import com.ecommerce.backend.enums.Rol;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    private Usuario usuario1;
    private Usuario usuario2;

    @BeforeEach
    void setUp() {
        usuario1 = new Usuario();
        usuario1.setId(1L);
        usuario1.setEmail("usuario1@test.com");
        usuario1.setPassword("password123");
        usuario1.setNombre("Usuario Uno");
        usuario1.setFirstName("Usuario");
        usuario1.setLastName("Uno");
        usuario1.setUser("usuario1");
        usuario1.setRol(Rol.CLIENTE);

        usuario2 = new Usuario();
        usuario2.setId(2L);
        usuario2.setEmail("admin@test.com");
        usuario2.setPassword("admin123");
        usuario2.setNombre("Admin");
        usuario2.setFirstName("Admin");
        usuario2.setLastName("Sistema");
        usuario2.setUser("admin");
        usuario2.setRol(Rol.ADMIN);
    }

    @Test
    void obtenerTodosLosUsuarios_DeberiaRetornarListaDeUsuarios() {
        // Arrange
        when(usuarioRepository.findAll()).thenReturn(Arrays.asList(usuario1, usuario2));

        // Act
        List<UsuarioDTO> resultado = usuarioService.obtenerTodosLosUsuarios();

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("usuario1@test.com", resultado.get(0).getEmail());
        assertEquals("admin@test.com", resultado.get(1).getEmail());
        verify(usuarioRepository, times(1)).findAll();
    }

    @Test
    void obtenerTodosLosUsuarios_SinUsuarios_DeberiaRetornarListaVacia() {
        // Arrange
        when(usuarioRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<UsuarioDTO> resultado = usuarioService.obtenerTodosLosUsuarios();

        // Assert
        assertNotNull(resultado);
        assertTrue(resultado.isEmpty());
        verify(usuarioRepository, times(1)).findAll();
    }

    @Test
    void obtenerPorEmail_ConEmailValido_DeberiaRetornarUsuario() {
        // Arrange
        when(usuarioRepository.findByEmail("usuario1@test.com")).thenReturn(Optional.of(usuario1));

        // Act
        UsuarioDTO resultado = usuarioService.obtenerPorEmail("usuario1@test.com");

        // Assert
        assertNotNull(resultado);
        assertEquals("usuario1@test.com", resultado.getEmail());
        assertEquals("Usuario Uno", resultado.getNombre());
        assertEquals("Usuario", resultado.getFirstName());
        assertEquals("Uno", resultado.getLastName());
        verify(usuarioRepository, times(1)).findByEmail("usuario1@test.com");
    }

    @Test
    void obtenerPorEmail_ConEmailInvalido_DeberiaLanzarExcepcion() {
        // Arrange
        String emailInexistente = "noexiste@test.com";
        when(usuarioRepository.findByEmail(emailInexistente)).thenReturn(Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            usuarioService.obtenerPorEmail(emailInexistente);
        });

        assertTrue(exception.getMessage().contains("Usuario"));
        assertTrue(exception.getMessage().contains("email"));
        verify(usuarioRepository, times(1)).findByEmail(emailInexistente);
    }

    @Test
    void obtenerPorEmail_ConEmailNull_DeberiaLanzarExcepcion() {
        // Arrange
        when(usuarioRepository.findByEmail(null)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            usuarioService.obtenerPorEmail(null);
        });
        verify(usuarioRepository, times(1)).findByEmail(null);
    }
}

