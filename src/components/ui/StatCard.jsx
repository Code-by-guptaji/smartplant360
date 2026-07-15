import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { STATUS_META } from '../../services/dummyData';

// Animated count-up hook — gives every readout a live-instrument feel.
function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function StatCard({ label, value, unit, delta, status = 'running', decimals, index = 0 }) {
  const animated = useCountUp(value);
  const meta = STATUS_META[status] || STATUS_META.running;
  const isPositive = delta >= 0;
  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-secondary-400/40 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow duration-300 pl-4 pr-4 py-4"
      style={{ borderLeftWidth: 3, borderLeftColor: meta.color }}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase">{label}</p>
        <span
          className="h-1.5 w-1.5 rounded-full status-pulse"
          style={{ backgroundColor: meta.color }}
        />
      </div>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-mono-data text-2xl font-semibold text-secondary-500 dark:text-white tabular-nums">
          {animated.toFixed(dp)}
        </span>
        <span className="text-xs text-slate-400 font-mono-data">{unit}</span>
      </div>

      <div className="mt-1.5 flex items-center gap-1">
        {isPositive ? (
          <ArrowUpRight className="h-3.5 w-3.5 text-success-500" strokeWidth={2.5} />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5 text-danger-500" strokeWidth={2.5} />
        )}
        <span className={`text-xs font-medium font-mono-data ${isPositive ? 'text-success-500' : 'text-danger-500'}`}>
          {isPositive ? '+' : ''}{delta}%
        </span>
        <span className="text-xs text-slate-400">vs yesterday</span>
      </div>
    </motion.div>
  );
}
