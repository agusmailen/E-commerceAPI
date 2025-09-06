import { useState } from "react";
import { registerUser } from "../services/authService";
import "./register.css";

export default function Register({ onCancel, onSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [showPwd,   setShowPwd]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState("");
  const [loading,   setLoading]   = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!firstName || !lastName || !email || !username || !password || !confirm) {
      return setError("Por favor, completa todos los campos.");
    }
    if (!emailRegex.test(email)) return setError("Por favor, ingresa un email válido.");
    if (password.length < 6)   return setError("La contraseña debe tener al menos 6 caracteres.");
    if (password !== confirm)  return setError("Las contraseñas no coinciden.");

    setLoading(true);
    const resp = await registerUser({ firstName, lastName, email, username, password });
    setLoading(false);

    if (!resp.ok) return setError(resp.error || "Error al registrar.");
    setSuccess("¡Cuenta creada exitosamente!");
    setTimeout(() => onSuccess?.(), 1200);
  }

  return (
    <div className="reg-page">
      <div className="reg-card">
        <div className="reg-logoRow">
          <div className="reg-logoIcon">🛍️</div>
          <div className="reg-logoText">ShopHub</div>
        </div>
        <p className="reg-welcome">¡Únete a nuestra comunidad!</p>

        {error   && <div className="reg-message reg-error"   aria-live="polite">{error}</div>}
        {success && <div className="reg-message reg-success" aria-live="polite">{success}</div>}

        <form className="reg-form" onSubmit={handleSubmit}>
          <label className="reg-label" htmlFor="firstName">Nombre</label>
          <input id="firstName" className="reg-input" placeholder="Tu nombre"
                 value={firstName} onChange={e=>setFirstName(e.target.value)} />

          <label className="reg-label" htmlFor="lastName">Apellido</label>
          <input id="lastName" className="reg-input" placeholder="Tu apellido"
                 value={lastName} onChange={e=>setLastName(e.target.value)} />

          <label className="reg-label" htmlFor="email">Correo Electrónico</label>
          <input id="email" type="email" className="reg-input" placeholder="tu@email.com"
                 value={email} onChange={e=>setEmail(e.target.value)} />

          <label className="reg-label" htmlFor="username">Nombre de Usuario</label>
          <input id="username" className="reg-input" placeholder="usuario123"
                 value={username} onChange={e=>setUsername(e.target.value)} />

          <label className="reg-label" htmlFor="password">Contraseña</label>
          <div className="reg-passwordRow">
            <input id="password" className="reg-input"
                   type={showPwd ? "text" : "password"} placeholder="••••••••"
                   value={password} onChange={e=>setPassword(e.target.value)} />
            <button type="button" className="reg-eyeBtn"
                    onClick={()=>setShowPwd(s=>!s)}>{showPwd ? "🙈" : "👁️"}</button>
          </div>

          <label className="reg-label" htmlFor="confirm">Confirmar Contraseña</label>
          <input id="confirm" className="reg-input"
                 type={showPwd ? "text" : "password"} placeholder="••••••••"
                 value={confirm} onChange={e=>setConfirm(e.target.value)} />

          <button type="submit" className="reg-primaryBtn" disabled={loading}>
            {loading ? "Creando..." : "Crear Cuenta"}
          </button>
        </form>

        <div className="reg-actions">
          <button className="reg-linkBtn" onClick={()=>onCancel?.()}>Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}
