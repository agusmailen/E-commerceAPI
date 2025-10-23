import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'El correo electrónico es requerido';
    }
    if (!emailRegex.test(email)) {
      return 'Ingresa un correo electrónico válido';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'La contraseña es requerida';
    }
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Expecting { token, usuario }
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const auth = await authenticateUser(formData.email, formData.password);
      
      if (auth && auth.token && auth.usuario) {
        setLoginMessage({
          type: 'success',
          text: `¡Bienvenido, ${auth.usuario.nombre}!`
        });
        
        setIsAnimating(true);
        
        // Save authentication state and user data to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('usuario', JSON.stringify(auth.usuario));
        localStorage.setItem('authToken', auth.token);
        
        // Check if there's a pending cart item to add after login
        const pendingCartItem = localStorage.getItem('pendingCartItem');
        if (pendingCartItem) {
          try {
            const { product, quantity } = JSON.parse(pendingCartItem);
            addToCart(product, quantity);
            localStorage.removeItem('pendingCartItem'); // Clear the pending item
            
            // Update success message to include cart addition
            setLoginMessage({
              type: 'success',
              text: `¡Bienvenido, ${auth.usuario.nombre}! Producto agregado al carrito.`
            });
          } catch (error) {
            console.error('Error adding pending cart item:', error);
          }
        }
        
        // Redirect to products page after success animation
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      } else {
        setLoginMessage({
          type: 'error',
          text: 'Credenciales incorrectas. Verifica tu email y contraseña.'
        });
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      setLoginMessage({
        type: 'error',
        text: 'Error de conexión. Intenta nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="login-logo-icon">
              🛍️
            </div>
            <span className="login-logo-text">ShopHub</span>
          </div>
          <h1 className="login-welcome-text">¡Bienvenido de vuelta!</h1>
        </div>

        {loginMessage && (
          <div className={`login-message ${loginMessage.type}`}>
            {loginMessage.text}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`login-form-input ${errors.email ? 'error' : ''}`}
              placeholder="tu@email.com"
              disabled={isLoading || isAnimating}
            />
            {errors.email && <span className="login-error-message">{errors.email}</span>}
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`login-form-input ${errors.password ? 'error' : ''}`}
              placeholder="••••••••"
              disabled={isLoading || isAnimating}
            />
            {errors.password && <span className="login-error-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''} ${isAnimating ? 'animating' : ''}`}
            disabled={isLoading || isAnimating}
          >
            {isAnimating ? '¡Redirigiendo...!' : isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p className="register-text">
            ¿No tienes una cuenta? <button 
              className="register-link" 
              onClick={() => navigate('/register')}
              disabled={isLoading || isAnimating}
            >
              Registrate aqui
            </button>
          </p>
        </div>

        <div className="demo-credentials-section">
          <button 
            className="show-credentials-btn" 
            onClick={() => setShowCredentials(!showCredentials)}
            disabled={isLoading || isAnimating}
          >
            {showCredentials ? 'Ocultar credenciales' : 'Ver credenciales de prueba'}
          </button>
          
          {showCredentials && (
            <div className="demo-credentials">
              <h4>Credenciales de prueba:</h4>
              <p><strong>Admin:</strong> admin@shophub.com / admin123</p>
              <p><strong>Usuario:</strong> usuario@shophub.com / usuario123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
