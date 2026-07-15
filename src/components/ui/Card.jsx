import { motion } from 'framer-motion';

export default function Card({ title, action, children, className = '', noPadding = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
      className={`rounded-xl bg-white dark:bg-secondary-400/40 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-shadow duration-300 ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          {title && <h3 className="text-sm font-semibold text-secondary-500 dark:text-white">{title}</h3>}
          {action}
        </div>
      )}
      <div className={noPadding ? '' : 'px-5 pb-5 pt-2'}>{children}</div>
    </motion.div>
  );
}
