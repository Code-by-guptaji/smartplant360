import { motion } from 'framer-motion';

export default function ComingSoon({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-secondary-400/20 flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <div className="h-14 w-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary-500" strokeWidth={2} />
      </div>
      <h2 className="font-display text-lg font-semibold text-secondary-500 dark:text-white">{title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md">{description}</p>
      <span className="mt-5 text-[11px] font-medium tracking-wide uppercase text-accent-600 dark:text-accent-400 bg-accent-500/10 px-3 py-1.5 rounded-full">
        Module in development
      </span>
    </motion.div>
  );
}
