const BASE_URL = "http://localhost:3000";

export async function registerUser(payload) {
  // verificar email único en /usuarios
  const r = await fetch(`${BASE_URL}/usuarios?email=${encodeURIComponent(payload.email)}`);
  const exists = await r.json();
  if (exists.length) return { ok: false, error: "El email ya está registrado." };

  // crear usuario con estructura compatible con Login
  const userData = {
    id: Date.now().toString(), // ID como string para compatibilidad
    firstName: payload.firstName,
    lastName: payload.lastName,
    nombre: `${payload.firstName} ${payload.lastName}`, // Campo que espera el Login
    email: payload.email,
    username: payload.username,
    password: payload.password
  };

  // Crear en /usuarios (mismo endpoint que usa el Login)
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  if (!res.ok) return { ok: false, error: "No se pudo crear la cuenta." };
  return { ok: true, data: await res.json() };
}