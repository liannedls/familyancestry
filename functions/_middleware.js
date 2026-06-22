import { clearSessionCookie, hasValidSession, isAuthConfigured } from './_auth.js';

const PUBLIC_PATHS = new Set(['/api/login']);

function loginPage(status = 401, message = '') {
  const error = message ? `<p class="error">${message}</p>` : '';

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
    ${error}
    <form method="post" action="/api/login">
      <input type="password" name="password" placeholder="Password" autocomplete="current-password" required autofocus>
      <button type="submit">Log in</button>
    </form>
  </main>
</body>
</html>`, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);

  if (PUBLIC_PATHS.has(url.pathname)) {
    return next();
  }

  if (url.pathname === '/api/logout') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/',
        'Set-Cookie': clearSessionCookie()
      }
    });
  }

  if (!isAuthConfigured(env)) {
    return loginPage(500, 'Login is not configured.');
  }

  if (await hasValidSession(request, env)) {
    return next();
  }

  return loginPage();
}
