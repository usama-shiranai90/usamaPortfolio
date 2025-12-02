'use client';
import { useSearchParams } from 'next/navigation';

export default function AdminLayout({ children }) {
  const searchParams = useSearchParams();
  const auth = searchParams.get('auth');

  const removeAuth = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('auth');
    window.history.replaceState({}, '', url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="font-bold text-xl">Admin</div>
        <div className="flex gap-4">
          <span className="text-sm">Token: {auth ? 'valid' : 'missing'}</span>
          <button onClick={removeAuth} className="text-sm underline">
            Exit
          </button>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
