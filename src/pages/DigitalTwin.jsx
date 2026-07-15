import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Activity, Gauge, Zap, X, Orbit } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { MACHINES, STATUS_META } from '../services/dummyData';

// Fixed layout positions for the 8 machines across 4 lines on the floor plan.
const LAYOUT = {
  'MC-1042': { x: 70, y: 70 },
  'MC-1043': { x: 70, y: 150 },
  'MC-2011': { x: 250, y: 70 },
  'MC-2012': { x: 250, y: 150 },
  'MC-3005': { x: 430, y: 70 },
  'MC-3006': { x: 430, y: 150 },
  'MC-4021': { x: 610, y: 70 },
  'MC-4022': { x: 610, y: 150 },
};

const LINE_ZONES = [
  { label: 'Line A - Spinning', x: 20, width: 160 },
  { label: 'Line B - Drawing', x: 200, width: 160 },
  { label: 'Line C - Twisting', x: 380, width: 160 },
  { label: 'Line D - Dipping', x: 560, width: 160 },
];

export default function DigitalTwin() {
  const [selected, setSelected] = useState(null);

  const statusCounts = MACHINES.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          Live-status digital twin of the tyre cord plant floor. Click any machine node to inspect it in real time.
        </p>
        <div className="flex items-center gap-3">
          {Object.entries(STATUS_META).map(([key, meta]) => (
            <span key={key} className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full status-pulse" style={{ backgroundColor: meta.color }} />
              {meta.label} ({statusCounts[key] || 0})
            </span>
          ))}
        </div>
      </div>

      <Card title="Factory Floor Plan" action={<Orbit className="h-4 w-4 text-slate-400" />} noPadding>
        <div className="p-4 overflow-x-auto">
          <svg viewBox="0 0 760 240" className="w-full min-w-[720px] h-[300px]">
            {/* Floor background */}
            <rect x="0" y="0" width="760" height="240" rx="12" fill="var(--color-surface)" className="dark:opacity-10" />

            {/* Line zones */}
            {LINE_ZONES.map((z) => (
              <g key={z.label}>
                <rect x={z.x} y={20} width={z.width} height={200} rx="10" fill="#94a3b8" fillOpacity="0.06" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1" />
                <text x={z.x + z.width / 2} y="14" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="var(--font-mono)">
                  {z.label}
                </text>
              </g>
            ))}

            {/* Conveyor connector lines, animated flow */}
            <line x1="150" y1="110" x2="250" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="330" y1="110" x2="430" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="510" y1="110" x2="610" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
            </line>

            {/* Machine nodes */}
            {MACHINES.map((m) => {
              const pos = LAYOUT[m.id];
              const meta = STATUS_META[m.status];
              return (
                <g
                  key={m.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelected(m)}
                  className="cursor-pointer"
                >
                  {m.status === 'running' && (
                    <circle r="22" fill={meta.color} fillOpacity="0.15">
                      <animate attributeName="r" values="18;26;18" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="fill-opacity" values="0.2;0.02;0.2" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <rect x="-32" y="-20" width="64" height="40" rx="8" fill="white" className="dark:fill-slate-800" stroke={meta.color} strokeWidth="2" />
                  <circle cx="-22" cy="-10" r="3.5" fill={meta.color}>
                    {(m.status === 'running' || m.status === 'critical') && (
                      <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
                    )}
                  </circle>
                  <text x="4" y="-6" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0f172a" className="dark:fill-white" fontFamily="var(--font-mono)">
                    {m.id}
                  </text>
                  <text x="4" y="8" textAnchor="middle" fontSize="8" fill="#64748b">
                    {m.temp}°C
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl bg-white dark:bg-secondary-500 border border-slate-200 dark:border-slate-700 shadow-2xl"
            >
              <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-xs font-mono-data text-slate-400">{selected.id}</p>
                  <h3 className="font-display text-lg font-semibold text-secondary-500 dark:text-white">{selected.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selected.line}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={selected.status} />
                  <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                <TwinMetric icon={Thermometer} label="Temperature" value={`${selected.temp}°C`} />
                <TwinMetric icon={Activity} label="Vibration" value={`${selected.vibration} mm/s`} />
                <TwinMetric icon={Gauge} label="Pressure" value={`${selected.pressure} bar`} />
                <TwinMetric icon={Zap} label="Power Draw" value={`${selected.power} kW`} />
              </div>
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Health Score</span>
                  <span className="font-mono-data">{selected.health}/100</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${selected.health}%`, backgroundColor: selected.health > 75 ? '#1e6f5c' : selected.health > 50 ? '#f59e0b' : '#e11d48' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TwinMetric({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-white/5 px-3 py-2.5">
      <Icon className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2} />
      <div className="leading-tight">
        <p className="text-[10px] text-slate-400">{label}</p>
        <p className="text-xs font-mono-data font-medium text-secondary-500 dark:text-slate-100">{value}</p>
      </div>
    </div>
  );
}
