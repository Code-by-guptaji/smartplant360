import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import { getNotifications } from '../services/dummyData';

const SEVERITY = {
  critical: { icon: AlertTriangle, color: 'text-danger-500', bg: 'bg-danger-500/10' },
  warning: { icon: AlertCircle, color: 'text-warning-500', bg: 'bg-warning-500/10' },
  info: { icon: Info, color: 'text-accent-600', bg: 'bg-accent-500/10' },
};

export default function Notifications() {
  const notifications = getNotifications();

  return (
    <Card title="All Notifications" noPadding>
      <ul className="divide-y divide-slate-100 dark:divide-slate-700/60">
        {notifications.map((n, i) => {
          const meta = SEVERITY[n.severity];
          const Icon = meta.icon;
          return (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50/70 dark:hover:bg-white/[0.03] transition-colors"
            >
              <div className={`h-9 w-9 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-4.5 w-4.5 ${meta.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-secondary-500 dark:text-slate-100">{n.title}</p>
                  <span className="text-[11px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Card>
  );
}
