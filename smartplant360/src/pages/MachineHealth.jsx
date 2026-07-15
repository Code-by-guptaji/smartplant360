import { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Thermometer, Activity, Gauge, Clock, Zap, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { MACHINES } from '../services/dummyData';

const genSeries = (base, spread) =>
  Array.from({ length: 12 }, (_, i) => ({ t: `${i * 2}h`, v: Math.round((base + (Math.random() - 0.5) * spread) * 10) / 10 }));

export default function MachineHealth() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {MACHINES.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            onClick={() => setSelected(m)}
            className="text-left rounded-xl bg-white dark:bg-secondary-400/40 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-mono-data text-slate-400">{m.id}</p>
                <p className="text-sm font-semibold text-secondary-500 dark:text-white mt-0.5">{m.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{m.line}</p>
              </div>
              <Badge status={m.status} />
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <Metric icon={Thermometer} label="Temp" value={`${m.temp}°C`} />
              <Metric icon={Activity} label="Vibration" value={`${m.vibration} mm/s`} />
              <Metric icon={Gauge} label="Pressure" value={`${m.pressure} bar`} />
              <Metric icon={Zap} label="Power" value={`${m.power} kW`} />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Health Score</span>
                <span className="font-mono-data">{m.health}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${m.health}%`,
                    backgroundColor: m.health > 75 ? '#1e6f5c' : m.health > 50 ? '#f59e0b' : '#e11d48',
                  }}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {selected && <MachineDetail machine={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-white/5 px-2.5 py-2">
      <Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" strokeWidth={2} />
      <div className="leading-tight">
        <p className="text-[10px] text-slate-400">{label}</p>
        <p className="text-xs font-mono-data font-medium text-secondary-500 dark:text-slate-100">{value}</p>
      </div>
    </div>
  );
}

function MachineDetail({ machine, onClose }) {
  const tempSeries = genSeries(machine.temp, 6);
  const vibSeries = genSeries(machine.vibration, 1.2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-white dark:bg-secondary-500 border border-slate-200 dark:border-slate-700 shadow-2xl"
      >
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-secondary-500">
          <div>
            <p className="text-xs font-mono-data text-slate-400">{machine.id}</p>
            <h3 className="font-display text-lg font-semibold text-secondary-500 dark:text-white">{machine.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{machine.line}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge status={machine.status} />
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Metric icon={Thermometer} label="Temperature" value={`${machine.temp}°C`} />
            <Metric icon={Activity} label="Vibration" value={`${machine.vibration} mm/s`} />
            <Metric icon={Gauge} label="Pressure" value={`${machine.pressure} bar`} />
            <Metric icon={Clock} label="Runtime" value={`${machine.runtime} hrs`} />
          </div>

          <Card title="Temperature (24h)" noPadding className="!shadow-none !border-slate-100 dark:!border-slate-700">
            <div className="px-4 pb-4 pt-2">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={tempSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Line type="monotone" dataKey="v" stroke="#e11d48" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Vibration (24h)" noPadding className="!shadow-none !border-slate-100 dark:!border-slate-700">
            <div className="px-4 pb-4 pt-2">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={vibSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Line type="monotone" dataKey="v" stroke="#14b8a6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div>
            <p className="text-sm font-semibold text-secondary-500 dark:text-white mb-2">Maintenance History</p>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
              <li>• Lubrication service — 18 days ago</li>
              <li>• Bearing inspection — 46 days ago</li>
              <li>• Full overhaul — 5 months ago</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
