import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Download, Filter, Gauge, Package, TrendingUp, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import {
  getProductionLineStatus, getHourlyOutput, getMonthlyOutput, getProductionForecast,
  getShiftPerformance, PRODUCTION_LINES,
} from '../services/dummyData';

export default function Production() {
  const [lineFilter, setLineFilter] = useState('all');
  const [range, setRange] = useState('today');

  const lines = useMemo(() => getProductionLineStatus(), []);
  const hourly = useMemo(() => getHourlyOutput(), []);
  const monthly = useMemo(() => getMonthlyOutput(), []);
  const forecast = useMemo(() => getProductionForecast(), []);
  const shifts = useMemo(() => getShiftPerformance(), []);

  const visibleLines = lineFilter === 'all' ? lines : lines.filter((l) => l.line === lineFilter);

  const totals = lines.reduce((acc, l) => ({ target: acc.target + l.target, actual: acc.actual + l.actual }), { target: 0, actual: 0 });
  const overallEff = ((totals.actual / totals.target) * 100).toFixed(1);

  const handleExport = () => window.print();

  return (
    <div className="space-y-6">
      {/* Filters + export */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={lineFilter}
            onChange={(e) => setLineFilter(e.target.value)}
            className="text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-secondary-400/40 text-secondary-500 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          >
            <option value="all">All Production Lines</option>
            {PRODUCTION_LINES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-secondary-400/40 text-secondary-500 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 text-xs font-medium rounded-lg bg-primary-500 hover:bg-primary-600 text-white px-3.5 py-2 transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> Export PDF
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Output" value={totals.actual} unit="t" delta={2.4} status="running" index={0} />
        <StatCard label="Target" value={totals.target} unit="t" delta={0} status="running" index={1} />
        <StatCard label="Overall Efficiency" value={Number(overallEff)} unit="%" delta={-1.2} status={overallEff > 85 ? 'running' : 'warning'} index={2} />
        <StatCard label="Active Lines" value={lines.filter((l) => l.status !== 'maintenance').length} unit={`/ ${lines.length}`} delta={0} status="running" index={3} />
      </div>

      {/* Per-line status */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {visibleLines.map((l, i) => (
          <motion.div
            key={l.line}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-xl bg-white dark:bg-secondary-400/40 border border-slate-200 dark:border-slate-700/60 shadow-sm p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-secondary-500 dark:text-white">{l.line.split(' - ')[1]}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{l.line.split(' - ')[0]}</p>
              </div>
              <Badge status={l.status} />
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-mono-data text-xl font-semibold text-secondary-500 dark:text-white tabular-nums">{l.actual}</span>
              <span className="text-xs text-slate-400 font-mono-data">/ {l.target} t</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, (l.actual / l.target) * 100)}%`,
                  backgroundColor: l.efficiency > 90 ? '#1e6f5c' : l.efficiency > 75 ? '#f59e0b' : '#e11d48',
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1"><Gauge className="h-3 w-3" /> {l.efficiency}% eff.</span>
              <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {l.operator}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Hourly Output vs Target (Today)">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={hourly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="output" name="Output (t)" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="target" name="Target (t)" stroke="#0f172a" strokeDasharray="4 3" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Output — Target vs Actual">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="actual" name="Actual (t)" fill="#1e6f5c" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="target" name="Target (t)" stroke="#f59e0b" strokeDasharray="4 3" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="9-Day Output Forecast" className="lg:col-span-2" action={<span className="inline-flex items-center gap-1 text-[11px] text-accent-600 dark:text-accent-400"><TrendingUp className="h-3.5 w-3.5" /> AI-projected</span>}>
          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis domain={[600, 1000]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="actual" name="Actual (t)" stroke="#1e6f5c" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
              <Line type="monotone" dataKey="forecast" name="Forecast (t)" stroke="#14b8a6" strokeDasharray="5 4" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Shift Comparison">
          <ul className="space-y-3">
            {shifts.map((s) => (
              <li key={s.shift} className="rounded-lg bg-slate-50 dark:bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-secondary-500 dark:text-slate-100">{s.shift}</span>
                  <span className="text-xs font-mono-data text-slate-500 dark:text-slate-400">{s.output} t</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full rounded-full bg-accent-500" style={{ width: `${s.efficiency}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{s.efficiency}% efficiency</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Line detail table */}
      <Card title="Production Line Detail" action={<Package className="h-4 w-4 text-slate-400" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="py-2 pr-4 font-medium">Line</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Target (t)</th>
                <th className="py-2 pr-4 font-medium">Actual (t)</th>
                <th className="py-2 pr-4 font-medium">Efficiency</th>
                <th className="py-2 pr-4 font-medium">Operator</th>
              </tr>
            </thead>
            <tbody>
              {visibleLines.map((l) => (
                <tr key={l.line} className="border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-secondary-500 dark:text-slate-100">{l.line}</td>
                  <td className="py-2.5 pr-4"><Badge status={l.status} /></td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{l.target}</td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{l.actual}</td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{l.efficiency}%</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{l.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
