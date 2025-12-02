// middleware.js
import { NextResponse } from 'next/server';

const MAX_AGE = 15 * 60;

function hexEncode(buffer) {
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2,'0')).join('');
}

async function verify(auth) {
  if (!auth) return false;
  const [tsStr, sig] = auth.split('.');
  if (!tsStr || !sig) return false;
  const ts = parseInt(tsStr, 10);
  const now = Math.floor(Date.now() / 1000);
  if (isNaN(ts) || now - ts > MAX_AGE) return false;
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  // Web Crypto API (Edge runtime)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(tsStr));
  const expected = hexEncode(signatureBuffer);

  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

export async function middleware(req) {
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith('/dashboard')) {
    const auth = url.searchParams.get('auth');
    const ok = await verify(auth);
    if (!ok) {
      console.log('🛑 middleware: auth failed', { path: url.pathname, auth });
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
