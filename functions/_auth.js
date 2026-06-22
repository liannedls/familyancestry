export const AUTH_COOKIE = 'familyancestry_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return bytesToHex(new Uint8Array(signature));
}

function getCookie(request, name) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const prefix = `${name}=`;
  const cookie = cookies.find((item) => item.startsWith(prefix));
  return cookie ? cookie.slice(prefix.length) : '';
}

function getSecret(env) {
  return env.AUTH_SECRET || env.SITE_PASSWORD || '';
}

export async function createSessionCookie(env) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = String(expiresAt);
  const signature = await sign(payload, getSecret(env));

  return `${AUTH_COOKIE}=${payload}.${signature}; Max-Age=${SESSION_TTL_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

export function clearSessionCookie() {
  return `${AUTH_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

export async function hasValidSession(request, env) {
  const secret = getSecret(env);
  const value = getCookie(request, AUTH_COOKIE);

  if (!secret || !value || !value.includes('.')) {
    return false;
  }

  const [payload, signature] = value.split('.');
  const expiresAt = Number(payload);

  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }

  const expected = await sign(payload, secret);
  return signature === expected;
}

export function isAuthConfigured(env) {
  return Boolean(env.SITE_PASSWORD);
}
