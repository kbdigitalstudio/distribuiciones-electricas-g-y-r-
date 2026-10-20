import { NextResponse } from "next/server";

/**
 * Endpoint de contacto.
 *
 * NO existe backend de correo conectado (sin SMTP, sin Resend, sin CRM).
 * Por regla del proyecto está PROHIBIDO simular un envío exitoso:
 * este endpoint responde 503 con un código explícito para que la UI
 * muestre el estado real ("canal en configuración") en ambos idiomas.
 *
 * Integración pendiente: conectar un proveedor (p. ej. Resend) usando
 * variables de entorno y validar los datos de contacto de la empresa.
 */
export async function POST(request: Request) {
  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const body =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    name.length === 0 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10
  ) {
    return NextResponse.json({ ok: false, code: "VALIDATION_ERROR" }, { status: 422 });
  }

  return NextResponse.json(
    { ok: false, code: "QUOTE_BACKEND_NOT_CONFIGURED" },
    { status: 503 },
  );
}
