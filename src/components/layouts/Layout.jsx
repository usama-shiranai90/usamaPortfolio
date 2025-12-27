import { Sidebar } from '@/components/layouts/Sidebar'
import { RightSidebar } from '@/components/layouts/RightSidebar'

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-theme-bg text-theme-text transition-colors duration-500">
      <Sidebar />
      <main className="flex-1 lg:pl-24 lg:pr-24 relative flex flex-col min-h-screen">
        <div className="flex-1 w-full">
          {children}
        </div>
      </main>
      <RightSidebar />
    </div>
  )
}
