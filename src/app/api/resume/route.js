// app/api/resume/route.js
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const MAX_AGE = 15 * 60; // token validity in seconds
const RESUME_PATH = path.join(process.cwd(), 'content', 'resume.mdx');

function verifyAdminToken(auth) {
  if (!auth) return { ok: false, reason: 'missing auth param' };
  const parts = auth.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'malformed token' };
  const [tsStr, sig] = parts;
  const ts = parseInt(tsStr, 10);
  if (isNaN(ts)) return { ok: false, reason: 'invalid timestamp' };
  const now = Math.floor(Date.now() / 1000);
  if (now - ts > MAX_AGE) return { ok: false, reason: 'token expired' };

  const secret = process.env.ADMIN_SECRET;
  if (!secret) return { ok: false, reason: 'missing ADMIN_SECRET env' };

  const expected = crypto.createHmac('sha256', secret).update(tsStr).digest('hex');

  if (sig.length !== expected.length) return { ok: false, reason: 'signature length mismatch' };

  let bufferA, bufferB;
  try {
    bufferA = Buffer.from(expected, 'hex');
    bufferB = Buffer.from(sig, 'hex');
  } catch {
    return { ok: false, reason: 'signature not valid hex' };
  }

  if (bufferA.length !== bufferB.length) return { ok: false, reason: 'signature buffer length mismatch' };
  if (!crypto.timingSafeEqual(bufferA, bufferB)) return { ok: false, reason: 'HMAC mismatch' };

  return { ok: true };
}

export async function GET(req) {
  const url = new URL(req.url);
  const auth = url.searchParams.get('auth');
  const verification = verifyAdminToken(auth);

  if (!verification.ok) {
    console.warn('Resume GET auth failed:', verification.reason);
    return new Response(
      JSON.stringify({ error: 'Unauthorized', reason: verification.reason }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const content = await fs.readFile(RESUME_PATH, 'utf-8');
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resume GET read error:', err);
    if (err.code === 'ENOENT') {
      return new Response(
        JSON.stringify({ error: 'Not found', reason: 'resume file missing' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ error: 'Read error', reason: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  const url = new URL(req.url);
  const auth = url.searchParams.get('auth');
  const verification = verifyAdminToken(auth);

  if (!verification.ok) {
    console.warn('Resume POST auth failed:', verification.reason);
    return new Response(
      JSON.stringify({ error: 'Unauthorized', reason: verification.reason }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON', reason: String(err) }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { content } = body;
  if (typeof content !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Missing content' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await fs.writeFile(RESUME_PATH, content, 'utf-8');
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resume POST write error:', err);
    return new Response(
      JSON.stringify({ error: 'Write failed', reason: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
