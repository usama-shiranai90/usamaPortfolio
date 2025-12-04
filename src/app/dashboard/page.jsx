import AdminLayout from '@/components/layouts/AdminLayout.jsx';
import dynamic from 'next/dynamic';

// client components
const LogViewer = dynamic(() => import('@/components/admin/LogViewer.jsx'), { ssr: false });
const ResumeEditor = dynamic(() => import('@/components/admin/ResumeEditor.jsx'), { ssr: false });

import { Suspense } from 'react';

export default function DashboardPage({ searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLayout>
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-4 rounded shadow">
            <ResumeEditor />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <LogViewer />
          </div>
        </div>
      </AdminLayout>
    </Suspense>
  );
}
