import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

const TITLES = {
  '/dashboard': 'Overview',
  '/production': 'Production Monitoring',
  '/machines': 'Machine Health',
  '/maintenance': 'Predictive Maintenance',
  '/inventory': 'Inventory',
  '/quality': 'Quality Control',
  '/energy': 'Energy Analytics',
  '/sustainability': 'Sustainability',
  '/digital-twin': 'Digital Twin',
  '/reports': 'Reports',
  '/ai-assistant': 'AI Assistant',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/profile': 'Profile',
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = TITLES[location.pathname] || 'SmartPlant 360';

  return (
    <div className="flex min-h-screen bg-surface dark:bg-[#0b1220]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
