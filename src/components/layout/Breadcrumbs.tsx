import { Link, useLocation } from 'react-router-dom';
import type { BreadcrumbItem } from '../../types/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const routeMap: Record<string, string> = {
  '/': 'Dashboard',
  '/analytics': 'Analytics',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/users': 'Users',
};

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  let path = '';
  const crumbs: BreadcrumbItem[] = [];
  if (segments.length === 0) {
    return [{ label: 'Dashboard', path: '/' }];
  }
  segments.forEach((seg) => {
    path += '/' + seg;
    crumbs.push({
      label: routeMap[path] || seg.charAt(0).toUpperCase() + seg.slice(1),
      path,
    });
  });
  return [{ label: 'Dashboard', path: '/' }, ...crumbs.slice(1)];
}

export function Breadcrumbs() {
  const location = useLocation();
  const crumbs = getBreadcrumbs(location.pathname);
  return (
    <nav className="mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <AnimatePresence initial={false}>
          {crumbs.map((crumb, i) => (
            <motion.li
              key={crumb.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              {i > 0 && <span className="mx-1">/</span>}
              {i < crumbs.length - 1 ? (
                <Link to={crumb.path} className="hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{crumb.label}</span>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </nav>
  );
} 