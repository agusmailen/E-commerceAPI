const BASE_URL = "http://localhost:3000";

export async function registerUser(payload) {
  // verificar email único
  const r = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(payload.email)}`);
  const exists = await r.json();
  if (exists.length) return { ok: false, error: "El email ya está registrado." };

  // crear usuario
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) return { ok: false, error: "No se pudo crear la cuenta." };
  return { ok: true, data: await res.json() };
}