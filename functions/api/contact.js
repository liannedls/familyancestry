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
  if (!env.EMAIL_WORKER_URL || !env.EMAIL_WORKER_TOKEN) {
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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const emailResponse = await fetch(env.EMAIL_WORKER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.EMAIL_WORKER_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      replyTo: email,
      name,
      email,
      message,
      html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  });

  if (!emailResponse.ok) {
    return jsonResponse({ error: 'Message could not be sent.' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

export function onRequestGet() {
  return jsonResponse({ error: 'Method not allowed.' }, 405);
}
