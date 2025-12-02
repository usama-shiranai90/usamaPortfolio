'use client';
import { useEffect, useState } from 'react';

export default function LogViewer() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get('auth');
    if (!auth) {
      setError('Missing auth token');
      return;
    }
    fetch(`/api/logs?auth=${encodeURIComponent(auth)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setLogs(data.logs || []);
      })
      .catch(e => setError(String(e)));
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Activity Logs</h2>
      {logs.length === 0 && <div className="text-sm text-gray-500">No logs yet.</div>}
      <div className="bg-white shadow rounded p-4 max-h-[400px] overflow-auto text-sm">
        <ul>
          {logs.map((l, i) => (
            <li key={i} className="mb-2 border-b pb-1">
              <div>
                <strong>{new Date(l.timestamp).toLocaleString()}</strong> — {l.action}
              </div>
              {l.metadata && (
                <pre className="bg-gray-100 p-2 rounded mt-1">
                  {JSON.stringify(l.metadata, null, 2)}
                </pre>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
