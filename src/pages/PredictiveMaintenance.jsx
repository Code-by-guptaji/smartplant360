import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, TrendingDown } from 'lucide-react';
import Card from '../components/ui/Card';
import { getPredictiveMaintenance, getMaintenanceCalendar } from '../services/dummyData';

const PRIORITY_COLOR = {
  critical: 'text-danger-500 bg-danger-500/10',
  high: 'text-warning-500 bg-warning-500/10',
  medium: 'text-accent-600 bg-accent-500/10',
  low: 'text-slate-500 bg-slate-500/10',
};

export default function PredictiveMaintenance() {
  const machines = getPredictiveMaintenance().sort((a, b) => b.riskScore - a.riskScore);
  const calendar = getMaintenanceCalendar();
  const critical = machines.filter((m) => m.riskScore > 70);

  return (
    <div className="space-y-6">
      {critical.length > 0 && (
        <div className="rounded-xl border border-danger-500/30 bg-danger-500/5 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-danger-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-danger-600 dark:text-danger-400">
              {critical.length} machine{critical.length > 1 ? 's' : ''} at critical failure risk
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {critical.map((m) => m.name).join(', ')} — immediate inspection recommended.
            </p>
          </div>
        </div>
      )}

      <Card title="AI Risk Scoring — All Machines" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="px-5 py-3 font-medium">Machine</th>
                <th className="px-5 py-3 font-medium">Risk Score</th>
                <th className="px-5 py-3 font-medium">Failure Probability</th>
                <th className="px-5 py-3 font-medium">Remaining Useful Life</th>
                <th className="px-5 py-3 font-medium">Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m, i) => (
                <motion.tr
                  key={m.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-slate-50 dark:border-slate-700/50 last:border-0"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-secondary-500 dark:text-slate-100">{m.name}</p>
                    <p className="text-xs font-mono-data text-slate-400">{m.id}</p>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${m.riskScore}%`,
                            backgroundColor: m.riskScore > 70 ? '#e11d48' : m.riskScore > 40 ? '#f59e0b' : '#1e6f5c',
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono-data text-slate-500 dark:text-slate-400">{m.riskScore}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono-data text-slate-600 dark:text-slate-300">{m.failureProbability}%</td>
                  <td className="px-5 py-3 font-mono-data text-slate-600 dark:text-slate-300">{m.remainingUsefulLife} days</td>
                  <td className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">{m.recommendedAction}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Upcoming Maintenance Calendar" action={<Calendar className="h-4 w-4 text-slate-400" />}>
          <ul className="space-y-3">
            {calendar.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-secondary-500 dark:text-slate-100">{c.task}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{c.machine} · {c.date}</p>
                </div>
                <span className={`text-[11px] font-medium px-2 py-1 rounded-full shrink-0 ${PRIORITY_COLOR[c.priority]}`}>
                  {c.priority}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Critical Machines" action={<TrendingDown className="h-4 w-4 text-slate-400" />}>
          {critical.length === 0 ? (
            <p className="text-sm text-slate-400">No machines currently at critical risk.</p>
          ) : (
            <ul className="space-y-3">
              {critical.map((m) => (
                <li key={m.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-slate-100">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.line}</p>
                  </div>
                  <span className="font-mono-data text-sm text-danger-500 font-semibold">{m.riskScore}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
