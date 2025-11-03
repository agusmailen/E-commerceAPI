package com.ecommerce.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ecommerce.backend.dto.LoginDTO;
import com.ecommerce.backend.dto.RegistroUsuarioDTO;
import com.ecommerce.backend.dto.UsuarioDTO;
import com.ecommerce.backend.entity.Usuario;
import com.ecommerce.backend.enums.Rol;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.exception.EmailAlreadyExistsException;
import com.ecommerce.backend.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegistroUsuarioDTO registroDTO;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        registroDTO = new RegistroUsuarioDTO();
        registroDTO.setEmail("nuevo@test.com");
        registroDTO.setPassword("password123");
        registroDTO.setFirstName("Nuevo");
        registroDTO.setLastName("Usuario");
        registroDTO.setUser("nuevousuario");

        usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail(registroDTO.getEmail());
        usuario.setPassword("encodedPassword");
        usuario.setFirstName(registroDTO.getFirstName());
        usuario.setLastName(registroDTO.getLastName());
        usuario.setNombre(registroDTO.getFirstName() + " " + registroDTO.getLastName());
        usuario.setUser(registroDTO.getUser());
        usuario.setRol(Rol.CLIENTE);
    }

    @Test
    void registrarUsuario_ConDatosValidos_DeberiaCrearUsuario() {
        // Arrange
        when(usuarioRepository.existsByEmail(registroDTO.getEmail())).thenReturn(false);
        when(usuarioRepository.existsByUser(registroDTO.getUser())).thenReturn(false);
        when(passwordEncoder.encode(registroDTO.getPassword())).thenReturn("encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        // Act
        UsuarioDTO resultado = authenticationService.registrarUsuario(registroDTO);

        // Assert
        assertNotNull(resultado);
        assertEquals("nuevo@test.com", resultado.getEmail());
        assertEquals("Nuevo Usuario", resultado.getNombre());
        assertEquals("nuevousuario", resultado.getUser());
        verify(usuarioRepository, times(1)).existsByEmail(registroDTO.getEmail());
        verify(usuarioRepository, times(1)).existsByUser(registroDTO.getUser());
        verify(passwordEncoder, times(1)).encode(registroDTO.getPassword());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void registrarUsuario_ConEmailExistente_DeberiaLanzarExcepcion() {
        // Arrange
        when(usuarioRepository.existsByEmail(registroDTO.getEmail())).thenReturn(true);

        // Act & Assert
        assertThrows(EmailAlreadyExistsException.class, () -> {
            authenticationService.registrarUsuario(registroDTO);
        });
        verify(usuarioRepository, times(1)).existsByEmail(registroDTO.getEmail());
        verify(usuarioRepository, never()).existsByUser(anyString());
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }

    @Test
    void registrarUsuario_ConUserExistente_DeberiaLanzarExcepcion() {
        // Arrange
        when(usuarioRepository.existsByEmail(registroDTO.getEmail())).thenReturn(false);
        when(usuarioRepository.existsByUser(registroDTO.getUser())).thenReturn(true);

        // Act & Assert
        assertThrows(BadRequestException.class, () -> {
            authenticationService.registrarUsuario(registroDTO);
        });
        verify(usuarioRepository, times(1)).existsByEmail(registroDTO.getEmail());
        verify(usuarioRepository, times(1)).existsByUser(registroDTO.getUser());
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }

    @Test
    void registrarUsuario_DeberiaAsignarRolCliente() {
        // Arrange
        when(usuarioRepository.existsByEmail(registroDTO.getEmail())).thenReturn(false);
        when(usuarioRepository.existsByUser(registroDTO.getUser())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario usuarioGuardado = invocation.getArgument(0);
            assertEquals(Rol.CLIENTE, usuarioGuardado.getRol());
            return usuarioGuardado;
        });

        // Act
        UsuarioDTO resultado = authenticationService.registrarUsuario(registroDTO);

        // Assert
        assertNotNull(resultado);
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void autenticarYGenerarToken_ConCredencialesValidas_DeberiaRetornarToken() {
        // Arrange
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("usuario@test.com");
        loginDTO.setPassword("password123");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(jwtService.generateToken(authentication)).thenReturn("jwt-token-123");

        // Act
        String token = authenticationService.autenticarYGenerarToken(loginDTO);

        // Assert
        assertNotNull(token);
        assertEquals("jwt-token-123", token);
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtService, times(1)).generateToken(authentication);
    }

    @Test
    void registrarUsuario_DeberiaEncriptarPassword() {
        // Arrange
        when(usuarioRepository.existsByEmail(anyString())).thenReturn(false);
        when(usuarioRepository.existsByUser(anyString())).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("$2a$10$encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        // Act
        authenticationService.registrarUsuario(registroDTO);

        // Assert
        verify(passwordEncoder, times(1)).encode("password123");
    }
}

