import { createSessionCookie, isAuthConfigured } from '../_auth.js';

function loginFailed(message = 'Incorrect password.') {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Family De La Salle</title>
  <style>
    body {
      align-items: center;
      background: #f7f5f0;
      color: #222;
      display: flex;
      font-family: Arial, sans-serif;
      justify-content: center;
      margin: 0;
      min-height: 100vh;
    }
    main {
      max-width: 340px;
      padding: 24px;
      width: 100%;
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 16px;
    }
    input,
    button {
      box-sizing: border-box;
      display: block;
      font-size: 16px;
      margin-top: 12px;
      min-height: 44px;
      width: 100%;
    }
    input {
      border: 1px solid #b7b7b7;
      padding: 8px 10px;
    }
    button {
      background: #222;
      border: 0;
      color: #fff;
      cursor: pointer;
      padding: 10px;
    }
    .error {
      color: #9b1c1c;
      margin: 0 0 12px;
    }
  </style>
</head>
<body>
  <main>
    <h1>Family De La Salle</h1>
    <p class="error">${message}</p>
    <form method="post" action="/api/login">
      <input type="password" name="password" placeholder="Password" autocomplete="current-password" required autofocus>
      <button type="submit">Log in</button>
    </form>
  </main>
</body>
</html>`, {
    status: 401,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

export async function onRequestPost({ request, env }) {
  if (!isAuthConfigured(env)) {
    return loginFailed('Login is not configured.');
  }

  const formData = await request.formData();
  const password = String(formData.get('password') || '');

  if (password !== env.SITE_PASSWORD) {
    return loginFailed();
  }

  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/',
      'Set-Cookie': await createSessionCookie(env)
    }
  });
}

export function onRequestGet() {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/'
    }
  });
}
