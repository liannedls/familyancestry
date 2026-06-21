const MAX_MESSAGE_LENGTH = 4000;

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

function clean(value) {
  return String(value || '').trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function onRequestPost({ request, env }) {
  if (!env.EMAIL) {
    return jsonResponse({ error: 'Email service is not configured.' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return jsonResponse({ error: 'Invalid request.' }, 400);
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const message = clean(body.message);
  const honeypot = clean(body.website);

  if (honeypot) {
    return jsonResponse({ ok: true }, 200);
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: 'Name, email, and message are required.' }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Email is invalid.' }, 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: 'Message is too long.' }, 400);
  }

  if (!env.CONTACT_TO || !env.CONTACT_FROM) {
    return jsonResponse({ error: 'Contact email is not configured.' }, 500);
  }

  const to = env.CONTACT_TO;
  const from = env.CONTACT_FROM;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  await env.EMAIL.send({
    to,
    from,
    replyTo: email,
    subject: `Family ancestry message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`
  });

  return jsonResponse({ ok: true }, 200);
}

export function onRequestGet() {
  return jsonResponse({ error: 'Method not allowed.' }, 405);
}
