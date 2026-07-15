import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Factory, Cpu, Wrench, Boxes, ShieldCheck, Zap, Leaf,
  Orbit, FileBarChart, Bot, Bell, Settings, User, LogOut,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import abgLogo from '../../assets/abg-logo.jpg';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/production', label: 'Production', icon: Factory },
  { to: '/machines', label: 'Machines', icon: Cpu },
  { to: '/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/inventory', label: 'Inventory', icon: Boxes },
  { to: '/quality', label: 'Quality Control', icon: ShieldCheck },
  { to: '/energy', label: 'Energy', icon: Zap },
  { to: '/sustainability', label: 'Sustainability', icon: Leaf },
  { to: '/digital-twin', label: 'Digital Twin', icon: Orbit },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 bg-secondary-500 text-slate-300 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10 shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            className="h-9 w-9 rounded-md overflow-hidden ring-1 ring-white/20 shrink-0 shadow-[0_0_12px_rgba(247,148,30,0.35)]"
          >
            <img src={abgLogo} alt="Aditya Birla Group" className="h-full w-full object-cover" />
          </motion.div>
          <div className="leading-tight">
            <p className="font-display font-semibold text-white text-sm tracking-wide">SmartPlant 360</p>
            <p className="text-[10px] text-accent-400 tracking-wider uppercase">Aditya Birla Group</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <NavLink
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-white/10 text-white border-l-2 border-accent-400 pl-[10px]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-0.5'}`
                }
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                {label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" strokeWidth={2} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
