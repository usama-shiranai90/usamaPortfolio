import { Sidebar } from '@/components/layouts/Sidebar'

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-theme-bg text-theme-text transition-colors duration-500">
      <Sidebar />
      <main className="flex-1 lg:pl-24 relative flex flex-col min-h-screen">
        <div className="flex-1 w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
