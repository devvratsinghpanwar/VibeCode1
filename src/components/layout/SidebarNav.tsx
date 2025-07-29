import { NavLink } from 'react-router-dom';
import type { NavItem } from '../../types/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: HomeIcon },
  { label: 'Analytics', path: '/analytics', icon: ChartBarIcon },
  { label: 'Reports', path: '/reports', icon: DocumentChartBarIcon },
  { label: 'Settings', path: '/settings', icon: Cog6ToothIcon },
  { label: 'Users', path: '/users', icon: UsersIcon },
];

export function SidebarNav() {
  return (
    <nav className="flex-1 p-4 space-y-2">
      {navItems.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded font-medium transition-colors duration-200
            ${isActive ? 'bg-primary/10 text-primary' : 'text-neutral-900 dark:text-neutral-100 hover:bg-primary/5'}`
          }
        >
          {Icon && <Icon className="w-5 h-5" />}
          {label}
        </NavLink>
      ))}
    </nav>
  );
} 