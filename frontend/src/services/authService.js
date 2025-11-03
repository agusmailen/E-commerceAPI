const BASE_URL = "http://localhost:8080/api";

export async function registerUser(payload) {
  try {
    // Crear usuario directamente (el backend maneja la validación de email único)
    // Mappear `username` -> `user` porque el DTO del backend espera la propiedad `user`
    const userData = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      user: payload.username,
      password: payload.password
    };

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (!res.ok) {
      const error = await res.json();
      return { ok: false, error: error.message || "No se pudo crear la cuenta." };
    }
    
    const data = await res.json();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Error de conexión con el servidor." };
  }
}