'use client';
import { useEffect, useState } from 'react';

export default function ResumeEditor() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get('auth');
    if (!auth) {
      setError('Missing auth token');
      return;
    }
    fetch(`/api/resume?auth=${encodeURIComponent(auth)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(`Load failed: ${data.reason || data.error}`);
        } else {
          setContent(data.content);
        }
      })
      .catch(e => setError(String(e)));
  }, []);

  const save = async () => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get('auth');
    if (!auth) {
      setError('Missing auth token');
      return;
    }
    setStatus('Saving...');
    const res = await fetch(`/api/resume?auth=${encodeURIComponent(auth)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setStatus('Saved');
      // optionally log this action
    } else {
      setStatus('');
      setError(`Save failed: ${data.reason || data.error}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Edit Resume</h2>
      {error && <div className="text-red-600">{error}</div>}
      <textarea
        className="w-full h-64 font-mono p-2 border rounded"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">
          Save
        </button>
        {status && <span>{status}</span>}
      </div>
    </div>
  );
}
