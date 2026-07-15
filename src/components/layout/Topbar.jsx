import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { getNotifications } from '../../services/dummyData';

export default function Topbar({ title, onMenuClick }) {
  const { dark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifications = getNotifications().slice(0, 4);

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between gap-4 px-4 sm:px-6 bg-white/80 dark:bg-secondary-500/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/60">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-slate-500 dark:text-slate-300">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display font-semibold text-lg text-secondary-500 dark:text-white truncate">{title}</h1>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-md relative">
        <Search className="absolute left-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search machines, batches, reports…"
          className="w-full rounded-lg bg-slate-100 dark:bg-secondary-400/50 border border-transparent focus:border-accent-500 focus:bg-white dark:focus:bg-secondary-400 focus:outline-none pl-9 pr-3 py-2 text-sm text-secondary-500 dark:text-slate-200 placeholder:text-slate-400 transition-colors"
        />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white dark:ring-secondary-500" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-secondary-400 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden origin-top-right"
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <p className="text-sm font-semibold text-secondary-500 dark:text-white">Notifications</p>
                  <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-accent-600 dark:text-accent-400 font-medium">View all</Link>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                      className="px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0"
                    >
                      <p className="text-sm font-medium text-secondary-500 dark:text-slate-100">{n.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/profile" className="flex items-center gap-2 pl-2 sm:border-l border-slate-200 dark:border-slate-700">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {user?.avatarInitials || 'VR'}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-xs font-medium text-secondary-500 dark:text-white">{user?.name}</p>
            <p className="text-[11px] text-slate-400">{user?.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
