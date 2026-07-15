import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { ClipboardCheck, FileText, Search, ShieldCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import {
  getBatchInspections, getDefectAnalysis, getRootCauseAnalysis, getInspectionReports,
} from '../services/dummyData';

export default function QualityControl() {
  const batches = useMemo(() => getBatchInspections(), []);
  const defects = useMemo(() => getDefectAnalysis(), []);
  const rootCauses = useMemo(() => getRootCauseAnalysis(), []);
  const reports = useMemo(() => getInspectionReports(), []);

  const totalTested = batches.reduce((a, b) => a + b.tested, 0);
  const totalPassed = batches.reduce((a, b) => a + b.passed, 0);
  const overallPassRate = ((totalPassed / totalTested) * 100).toFixed(1);
  const totalDefects = defects.reduce((a, d) => a + d.count, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Overall Pass Rate" value={Number(overallPassRate)} unit="%" delta={0.6} status="running" index={0} />
        <StatCard label="Batches Inspected" value={batches.length} unit="this week" delta={0} status="running" index={1} />
        <StatCard label="Units Tested" value={totalTested} unit="units" delta={3.1} status="running" index={2} />
        <StatCard label="Defects Logged" value={totalDefects} unit="this week" delta={-4.2} status={totalDefects > 40 ? 'warning' : 'running'} index={3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Defect analysis chart */}
        <Card title="Defect Analysis" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={defects} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="defect" width={170} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="count" name="Occurrences" radius={[0, 6, 6, 0]}>
                {defects.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pass rate summary */}
        <Card title="Batch Pass Rate" action={<ShieldCheck className="h-4 w-4 text-primary-500" />}>
          <div className="flex flex-col items-center justify-center py-3">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none" stroke="#1e6f5c" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(overallPassRate / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono-data text-xl font-semibold text-secondary-500 dark:text-white">{overallPassRate}%</span>
                <span className="text-[10px] text-slate-400">pass rate</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              {totalPassed.toLocaleString()} of {totalTested.toLocaleString()} tested units passed final inspection
            </p>
          </div>
        </Card>
      </div>

      {/* Root cause analysis */}
      <Card title="Root Cause Analysis" action={<Search className="h-4 w-4 text-slate-400" />}>
        <div className="grid sm:grid-cols-2 gap-3">
          {rootCauses.map((r, i) => (
            <motion.div
              key={r.cause}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg bg-slate-50 dark:bg-white/5 p-3.5"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold text-secondary-500 dark:text-slate-100">{r.cause}</p>
                <span className="text-[10px] font-mono-data text-danger-500 shrink-0 ml-2">{r.occurrences}x</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Linked to: {r.linkedDefect}</p>
              <p className="text-[11px] text-accent-600 dark:text-accent-400 mt-2">→ {r.action}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Batch inspection table */}
      <Card title="Batch Inspection Log" action={<ClipboardCheck className="h-4 w-4 text-slate-400" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="py-2 pr-4 font-medium">Batch</th>
                <th className="py-2 pr-4 font-medium">Line</th>
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Tested</th>
                <th className="py-2 pr-4 font-medium">Passed</th>
                <th className="py-2 pr-4 font-medium">Pass Rate</th>
                <th className="py-2 pr-4 font-medium">Inspector</th>
                <th className="py-2 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.batch} className="border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-300">{b.batch}</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{b.line}</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{b.date}</td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{b.tested}</td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{b.passed}</td>
                  <td className="py-2.5 pr-4 font-mono-data font-medium text-secondary-500 dark:text-slate-100">{b.passRate}%</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{b.inspector}</td>
                  <td className="py-2.5 pr-4"><Badge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Inspection reports */}
      <Card title="Inspection Reports" action={<FileText className="h-4 w-4 text-slate-400" />}>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {reports.map((r) => (
            <li key={r.id} className="flex items-center justify-between py-2.5">
              <div>
                <p className="text-xs font-medium text-secondary-500 dark:text-slate-100">{r.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{r.id} &middot; {r.type} &middot; {r.date}</p>
              </div>
              <button className="text-[11px] font-medium text-primary-500 hover:text-primary-600">Download</button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
