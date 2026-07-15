import { useMemo } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Droplets, Leaf, Recycle, FileText } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import {
  getSustainabilityStats, getCarbonTrend, getWasteBreakdown, getESGScorecard, getSustainabilityReports,
} from '../services/dummyData';

export default function Sustainability() {
  const stats = useMemo(() => getSustainabilityStats(), []);
  const carbon = useMemo(() => getCarbonTrend(), []);
  const waste = useMemo(() => getWasteBreakdown(), []);
  const esg = useMemo(() => getESGScorecard(), []);
  const reports = useMemo(() => getSustainabilityReports(), []);

  const overallScore = Math.round(esg.reduce((a, e) => a + e.score, 0) / esg.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.key} {...s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Carbon Emissions Trend" className="lg:col-span-2" action={<Leaf className="h-4 w-4 text-primary-500" />}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={carbon}>
              <defs>
                <linearGradient id="carbonFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e6f5c" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1e6f5c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="emissions" name="t CO₂e" stroke="#1e6f5c" fill="url(#carbonFill)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sustainability score */}
        <Card title="Sustainability Score">
          <div className="flex flex-col items-center justify-center py-3">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none" stroke="#14b8a6" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(overallScore / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono-data text-2xl font-semibold text-secondary-500 dark:text-white">{overallScore}</span>
                <span className="text-[10px] text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="w-full mt-4 space-y-2">
              {esg.map((e) => (
                <div key={e.pillar} className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">{e.pillar}</span>
                  <span className="font-mono-data font-medium" style={{ color: e.color }}>{e.score}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Waste Disposition" action={<Recycle className="h-4 w-4 text-slate-400" />}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={waste} dataKey="value" nameKey="type" innerRadius={48} outerRadius={78} paddingAngle={3}>
                {waste.map((w, i) => <Cell key={i} fill={w.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 10 }} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Water Stewardship" action={<Droplets className="h-4 w-4 text-accent-500" />}>
          <div className="space-y-4 py-2">
            <Metric label="Freshwater Withdrawal" value="218 kL/day" note="-1.8% vs last month" />
            <Metric label="Water Recycled" value="38.4%" note="+4.1% vs last month" />
            <Metric label="Zero Liquid Discharge Status" value="On Track" note="Target: FY27" />
          </div>
        </Card>

        <Card title="ESG Reports" action={<FileText className="h-4 w-4 text-slate-400" />}>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {reports.map((r) => (
              <li key={r.id} className="py-2.5">
                <p className="text-xs font-medium text-secondary-500 dark:text-slate-100">{r.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{r.id} &middot; {r.date}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value, note }) {
  return (
    <div>
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="text-lg font-mono-data font-semibold text-secondary-500 dark:text-white mt-0.5">{value}</p>
      <p className="text-[11px] text-success-500 mt-0.5">{note}</p>
    </div>
  );
}
