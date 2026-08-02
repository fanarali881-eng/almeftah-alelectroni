// Netlify Function: mojaz.mjs
// Proxy for Mojaz API - handles /api/mojaz/* routes
// Routes:
//   GET  /api/mojaz/captcha  -> fetch captcha image from mojaz.com.sa
//   POST /api/mojaz/search   -> submit captcha + VIN to mojaz.com.sa

const MOJAZ_BASE = 'https://mojaz.com.sa/MojazWeb';

const COMMON_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'ar-SA,ar;q=0.9,en-US;q=0.8,en;q=0.7',
  'Referer': 'https://mojaz.com.sa/mojaz/',
  'Origin': 'https://mojaz.com.sa',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const handler = async function (event, context) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  // Determine sub-route from path
  const path = event.path || '';
  const subPath = path.replace(/.*\/mojaz\/?/, '') || '';

  try {
    // ─── GET /captcha ────────────────────────────────────────────────────────
    if (event.httpMethod === 'GET' && (subPath === 'captcha' || subPath === '')) {
      const ts = Date.now();
      const captchaUrl = `${MOJAZ_BASE}/captcha-controller/v2/captcha-image?${ts}`;

      const resp = await fetch(captchaUrl, {
        method: 'GET',
        headers: COMMON_HEADERS,
      });

      if (!resp.ok) {
        return {
          statusCode: resp.status,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Failed to fetch captcha from Mojaz', status: resp.status }),
        };
      }

      // Extract cookies for session persistence
      const setCookieHeader = resp.headers.get('set-cookie') || '';
      const cookies = setCookieHeader
        .split(/,(?=[^;]+=[^;]+)/)
        .map(c => c.split(';')[0].trim())
        .filter(Boolean)
        .join('; ');

      const data = await resp.json();

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          imageB64: data.imageB64 || '',
          uuid: data.uuid || '',
          cookies: cookies,
        }),
      };
    }

    // ─── POST /search ────────────────────────────────────────────────────────
    if (event.httpMethod === 'POST' && subPath === 'search') {
      const body = JSON.parse(event.body || '{}');
      const { vehicles, captcha, captchaUuid, cookies } = body;

      if (!vehicles || !captcha || !captchaUuid) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Missing required fields: vehicles, captcha, captchaUuid' }),
        };
      }

      const searchUrl = `${MOJAZ_BASE}/api/v1/vehicle/search`;

      const reqHeaders = {
        ...COMMON_HEADERS,
        'Content-Type': 'application/json',
      };

      // Forward session cookies if available
      if (cookies) {
        reqHeaders['Cookie'] = cookies;
      }

      const searchResp = await fetch(searchUrl, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({
          vehicles: vehicles,
          captcha: captcha,
          captchaUuid: captchaUuid,
        }),
      });

      const respText = await searchResp.text();
      let respData;
      try {
        respData = JSON.parse(respText);
      } catch {
        respData = { raw: respText };
      }

      return {
        statusCode: searchResp.status,
        headers: CORS_HEADERS,
        body: JSON.stringify(respData),
      };
    }

    // ─── Unknown route ───────────────────────────────────────────────────────
    return {
      statusCode: 404,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Route not found', path: subPath }),
    };

  } catch (err) {
    console.error('Mojaz proxy error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal proxy error', message: err.message }),
    };
  }
};
