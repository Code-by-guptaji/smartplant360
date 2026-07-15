import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import {
  getDashboardStats, getProductionTrend, getEnergyTrend, getShiftPerformance,
  getMachineUtilization, getDowntimeAnalysis, getQualityTrend,
  getRecentActivities, getAIRecommendations,
} from '../services/dummyData';

const ACTIVITY_DOT = { critical: 'bg-danger-500', success: 'bg-primary-500', warning: 'bg-warning-500', info: 'bg-accent-500' };

export default function Dashboard() {
  const stats = getDashboardStats();
  const production = getProductionTrend();
  const energy = getEnergyTrend();
  const shifts = getShiftPerformance();
  const utilization = getMachineUtilization();
  const downtime = getDowntimeAnalysis();
  const quality = getQualityTrend();
  const activities = getRecentActivities();
  const recommendations = getAIRecommendations();

  return (
    <div className="space-y-6">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.key} {...s} index={i} />)}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Production Trend — Target vs Actual" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={production}>
              <defs>
                <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="actual" name="Actual (t)" stroke="#14b8a6" fill="url(#actualFill)" strokeWidth={2} />
              <Line type="monotone" dataKey="target" name="Target (t)" stroke="#0f172a" strokeDasharray="4 3" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Downtime Analysis">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={downtime} dataKey="hours" nameKey="reason" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {downtime.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Energy Consumption (24h)">
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={energy}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="electricity" name="Electricity (kW)" stroke="#1e6f5c" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="steam" name="Steam (kg/hr)" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Shift Performance">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={shifts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="shift" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="output" name="Output (t)" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Machine Utilization by Line">
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={utilization}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="line" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Radar dataKey="utilization" stroke="#1e6f5c" fill="#1e6f5c" fillOpacity={0.35} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom row: quality trend, activities, AI recs */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Quality Trend (6 weeks)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={quality}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Line type="monotone" dataKey="passRate" name="Pass rate (%)" stroke="#1e6f5c" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Recent Activity">
          <ul className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
            {activities.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${ACTIVITY_DOT[a.type]}`} />
                <div>
                  <p className="text-xs text-secondary-500 dark:text-slate-200 leading-snug">{a.text}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="AI Recommendations"
          action={<Sparkles className="h-4 w-4 text-accent-500" />}
        >
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {recommendations.map((r) => (
              <motion.div
                key={r.id}
                whileHover={{ x: 2 }}
                className="rounded-lg bg-accent-500/5 border border-accent-500/15 p-3"
              >
                <p className="text-xs font-medium text-secondary-500 dark:text-slate-100 leading-snug">{r.title}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{r.impact}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-mono-data text-accent-600 dark:text-accent-400">{r.confidence}% confidence</span>
                  <ArrowRight className="h-3 w-3 text-accent-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
