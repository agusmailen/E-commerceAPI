import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { registerUser } from '../../services/authService';
import './styles.css';

/**
 * Componente de Registro de Usuario
 * Utiliza useState para manejar el estado del formulario (Clase 05)
 * Implementa validaciones y manejo de eventos (Clase 03)
 * Conecta con json-server usando fetch/async-await (Clase 03)
 * Recibe navigateTo como prop para navegación con useState
 */
export default function Register() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  // Estados para cada campo del formulario
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados para UI y validaciones
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Regex para validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Maneja el envío del formulario
   * Implementa validaciones del lado del cliente y llamada a la API
   */
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Limpiar mensajes previos
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validaciones del lado del cliente
    if (!firstName.trim() || !lastName.trim() || !email.trim() || 
        !username.trim() || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un email válido.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    // Preparar datos para enviar
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password: password
    };

    try {
      // Llamada al servicio de registro
      const response = await registerUser(payload);

      if (!response.ok) {
        setError(response.error || 'Error al registrar usuario.');
        setIsLoading(false);
        return;
      }

      // Éxito en el registro
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo a productos...');
      
      // Limpiar formulario
      setFirstName('');
      setLastName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      
      // Auto-login after successful registration
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('usuario', JSON.stringify(result.user));
      
      // Check if there's a pending cart item to add after registration
      const pendingCartItem = localStorage.getItem('pendingCartItem');
      if (pendingCartItem) {
        try {
          const { product, quantity } = JSON.parse(pendingCartItem);
          addToCart(product, quantity);
          localStorage.removeItem('pendingCartItem'); // Clear the pending item
          
          // Update success message to include cart addition
          setSuccessMessage(`¡Cuenta creada exitosamente! Producto agregado al carrito.`);
        } catch (error) {
          console.error('Error adding pending cart item:', error);
        }
      }
      
      // Redirigir después de 2 segundos usando navigate
      setTimeout(() => {
        navigate('/products');
      }, 2000);

    } catch (error) {
      console.error('Error en handleSubmit:', error);
      setError('Error inesperado. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Toggle para mostrar/ocultar contraseña
   */
  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);
  }

  /**
   * Limpia los mensajes de error/success
   */
  function clearMessages() {
    setError('');
    setSuccess('');
  }

  return (
    <div className="register-page-container">
      <div className="register-form-container">
        {/* Logo Section */}
        <div className="register-logo-section">
          <div className="register-logo">
            <div className="register-logo-icon">🛍️</div>
            <span>ShopHub</span>
          </div>
          <p className="register-welcome-text">¡Únete a nuestra comunidad!</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="register-error-message show" aria-live="polite" role="alert">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="register-success-message show" aria-live="polite" role="status">
            {success}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className="register-form-group full-width">
            <label htmlFor="firstName" className="register-form-label">
              Nombre *
            </label>
            <input
              id="firstName"
              type="text"
              className="register-form-input"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                clearMessages();
              }}
              placeholder="Tu nombre"
              required
              disabled={isLoading}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>

          {/* Apellido */}
          <div className="register-form-group full-width">
            <label htmlFor="lastName" className="register-form-label">
              Apellido *
            </label>
            <input
              id="lastName"
              type="text"
              className="register-form-input"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                clearMessages();
              }}
              placeholder="Tu apellido"
              required
              disabled={isLoading}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>

          {/* Email */}
          <div className="register-form-group full-width">
            <label htmlFor="email" className="register-form-label">
              Correo Electrónico *
            </label>
            <input
              id="email"
              type="email"
              className="register-form-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearMessages();
              }}
              placeholder="tu@email.com"
              required
              disabled={isLoading}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>

          {/* Username */}
          <div className="register-form-group full-width">
            <label htmlFor="username" className="register-form-label">
              Nombre de Usuario *
            </label>
            <input
              id="username"
              type="text"
              className="register-form-input"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearMessages();
              }}
              placeholder="usuario123"
              required
              disabled={isLoading}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>

          {/* Contraseña */}
          <div className="register-form-group full-width">
            <label htmlFor="password" className="register-form-label">
              Contraseña *
            </label>
            <div className="register-password-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="register-form-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearMessages();
                }}
                placeholder="••••••••"
                required
                disabled={isLoading}
                aria-describedby={error ? "error-message" : undefined}
              />
              <button
                type="button"
                className="register-password-toggle"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="register-form-group full-width">
            <label htmlFor="confirmPassword" className="register-form-label">
              Confirmar Contraseña *
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className="register-form-input"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearMessages();
              }}
              placeholder="••••••••"
              required
              disabled={isLoading}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="register-btn-primary"
            disabled={isLoading}
            aria-describedby={error ? "error-message" : undefined}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Login Link */}
        <p className="register-login-link">
          ¿Ya tienes una cuenta? <button 
            type="button" 
            onClick={() => navigate('/login')}
            style={{background: 'none', border: 'none', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer'}}
          >
            Iniciar Sesión
          </button>
        </p>
      </div>
    </div>
  );
}
