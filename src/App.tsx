import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { PerformanceMonitor } from './components/layout/PerformanceMonitor';
import { DashboardHome } from './pages/DashboardHome';
import { UsersPage } from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';

const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout').then(m => ({ default: m.DashboardLayout })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const ReportsPage = lazy(() => import('./pages/ReportsPage').then(m => ({ default: m.ReportsPage })));

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route index element={<PageTransition><DashboardHome /></PageTransition>} />
              <Route path="analytics" element={<PageTransition><AnalyticsPage /></PageTransition>} />
              <Route path="reports" element={<PageTransition><ReportsPage /></PageTransition>} />
              <Route path="settings" element={<PageTransition><SettingsPage /></PageTransition>} />
              <Route path="users" element={<PageTransition><UsersPage /></PageTransition>} />
            </Route>
          </Routes>
          <PerformanceMonitor />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}


