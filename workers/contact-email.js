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

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed.' }, 405);
    }

    const auth = request.headers.get('Authorization') || '';
    if (!env.EMAIL_WORKER_TOKEN || auth !== `Bearer ${env.EMAIL_WORKER_TOKEN}`) {
      return jsonResponse({ error: 'Unauthorized.' }, 401);
    }

    if (!env.EMAIL || !env.CONTACT_TO || !env.CONTACT_FROM) {
      return jsonResponse({ error: 'Email Worker is not configured.' }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return jsonResponse({ error: 'Invalid request.' }, 400);
    }

    const replyTo = clean(body.replyTo);
    const name = clean(body.name);

    await env.EMAIL.send({
      to: env.CONTACT_TO,
      from: env.CONTACT_FROM,
      replyTo,
      subject: `Family ancestry message from ${name || 'the contact form'}`,
      text: clean(body.text),
      html: clean(body.html)
    });

    return jsonResponse({ ok: true }, 200);
  }
};
