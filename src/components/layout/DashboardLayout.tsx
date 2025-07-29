import { useState } from 'react';
import { ThemeToggle } from '../ui';
import { UserCircleIcon, BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { SidebarNav } from './SidebarNav';
import { Breadcrumbs } from './Breadcrumbs';
import { Outlet } from 'react-router-dom';

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col max-w-full">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
          <span className="font-bold text-lg tracking-tight text-primary">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Notifications">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          <ThemeToggle />
          <button className="ml-2 p-1 rounded-full hover:ring-2 hover:ring-primary/50 focus:outline-none">
            <UserCircleIcon className="w-8 h-8 text-neutral-400" />
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={clsx(
            'fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'md:translate-x-0 md:w-64 md:relative md:h-auto'
          )}
        >
          <SidebarNav />
        </aside>
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300 w-full md:ml-0">
          <div className="w-full">
            <Breadcrumbs />
          </div>
          <div className="w-full mt-6">
            {children ?? <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
} 
