import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const LOG_FILE = path.join(process.cwd(), 'private_logs.json');
const MAX_AGE = 15 * 60;

function verifyAuth(auth) {
  if (!auth) return false;
  const [tsStr, sig] = auth.split('.');
  if (!tsStr || !sig) return false;

  const ts = parseInt(tsStr, 10);
  const now = Math.floor(Date.now() / 1000);
  if (isNaN(ts) || now - ts > MAX_AGE) return false;

  const secret = process.env.ADMIN_SECRET || '';
  const expected = crypto.createHmac('sha256', secret).update(tsStr).digest('hex');

  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

export async function GET(req) {
  const url = new URL(req.url);
  const auth = url.searchParams.get('auth');
  if (!verifyAuth(auth)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  let logs = [];
  try {
    if (fs.existsSync(LOG_FILE)) {
      logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error(e);
  }

  return new Response(JSON.stringify({ logs }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  const url = new URL(req.url);
  const auth = url.searchParams.get('auth');
  if (!verifyAuth(auth)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid body' }), { status: 400 });
  }

  const entry = {
    timestamp: new Date().toISOString(),
    action: body.action || 'unknown',
    metadata: body.metadata || {},
  };

  let logs = [];
  try {
    if (fs.existsSync(LOG_FILE)) {
      logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
    }
  } catch {}

  logs.push(entry);
  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Write failed' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
