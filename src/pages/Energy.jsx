import { useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { IndianRupee, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import {
  getEnergyBreakdown, getDailyEnergyComparison, getMonthlyEnergyComparison, getEnergyEfficiencyKPIs,
} from '../services/dummyData';

const fmtINR = (n) => `₹${(n / 1000).toFixed(0)}k`;

export default function Energy() {
  const breakdown = useMemo(() => getEnergyBreakdown(), []);
  const daily = useMemo(() => getDailyEnergyComparison(), []);
  const monthly = useMemo(() => getMonthlyEnergyComparison(), []);
  const kpis = useMemo(() => getEnergyEfficiencyKPIs(), []);

  const totalCost = breakdown.reduce((a, b) => a + b.cost, 0);

  return (
    <div className="space-y-6">
      {/* Efficiency KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => <StatCard key={k.key} {...k} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Breakdown pie */}
        <Card title="Energy Source Breakdown" action={<Zap className="h-4 w-4 text-slate-400" />}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={breakdown} dataKey="value" nameKey="source" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {breakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 11 }} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Cost breakdown */}
        <Card title="Cost by Source (This Month)" className="lg:col-span-2" action={<IndianRupee className="h-4 w-4 text-slate-400" />}>
          <div className="space-y-3 mt-2">
            {breakdown.map((b) => (
              <div key={b.source}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-secondary-500 dark:text-slate-100">{b.source}</span>
                  <span className="font-mono-data text-slate-500 dark:text-slate-400">{fmtINR(b.cost)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(b.cost / totalCost) * 100}%`, backgroundColor: b.color }} />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
              <span className="font-semibold text-secondary-500 dark:text-white">Total energy spend</span>
              <span className="font-mono-data font-semibold text-secondary-500 dark:text-white">{fmtINR(totalCost)}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Daily Consumption — This Week vs Last Week">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="lastWeek" name="Last Week (kWh)" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="thisWeek" name="This Week (kWh)" fill="#1e6f5c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Trend by Source">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="electricity" name="Electricity" stroke="#1e6f5c" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="steam" name="Steam" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="fuel" name="Fuel" stroke="#e11d48" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
