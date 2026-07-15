// SmartPlant 360 — simulated manufacturing data layer.
// In production this module is replaced by REST calls to the Express/MongoDB API
// (see src/services/api.js placeholder). Shapes here mirror the intended API contracts
// so swapping the data source later requires no component changes.

const rand = (min, max) => Math.round((Math.random() * (max - min) + min) * 10) / 10;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const PRODUCTION_LINES = ['Line A - Spinning', 'Line B - Drawing', 'Line C - Twisting', 'Line D - Dipping'];

export const MACHINES = [
  { id: 'MC-1042', name: 'Spinning Frame 12', line: 'Line A - Spinning', status: 'running', temp: 68, vibration: 1.8, pressure: 4.2, runtime: 342, power: 44.2, health: 92 },
  { id: 'MC-1043', name: 'Spinning Frame 13', line: 'Line A - Spinning', status: 'running', temp: 71, vibration: 2.1, pressure: 4.0, runtime: 318, power: 46.1, health: 88 },
  { id: 'MC-2011', name: 'Draw Twister 4', line: 'Line B - Drawing', status: 'warning', temp: 84, vibration: 4.6, pressure: 5.1, runtime: 601, power: 52.7, health: 61 },
  { id: 'MC-2012', name: 'Draw Twister 5', line: 'Line B - Drawing', status: 'running', temp: 69, vibration: 1.6, pressure: 3.9, runtime: 210, power: 41.3, health: 95 },
  { id: 'MC-3005', name: 'Twisting Unit 2', line: 'Line C - Twisting', status: 'critical', temp: 96, vibration: 6.8, pressure: 6.4, runtime: 812, power: 61.4, health: 34 },
  { id: 'MC-3006', name: 'Twisting Unit 3', line: 'Line C - Twisting', status: 'running', temp: 66, vibration: 1.4, pressure: 3.7, runtime: 155, power: 39.8, health: 97 },
  { id: 'MC-4021', name: 'Dip & Cure Oven 1', line: 'Line D - Dipping', status: 'maintenance', temp: 40, vibration: 0.2, pressure: 1.1, runtime: 0, power: 2.1, health: 78 },
  { id: 'MC-4022', name: 'Dip & Cure Oven 2', line: 'Line D - Dipping', status: 'running', temp: 74, vibration: 2.0, pressure: 4.4, runtime: 289, power: 48.9, health: 90 },
];

export const STATUS_META = {
  running: { label: 'Running', color: '#1e6f5c', bg: '#ecfaf6' },
  warning: { label: 'Warning', color: '#f59e0b', bg: '#fffbeb' },
  critical: { label: 'Critical', color: '#e11d48', bg: '#fef2f2' },
  maintenance: { label: 'Maintenance', color: '#64748b', bg: '#f1f5f9' },
};

export const getDashboardStats = () => ([
  { key: 'production', label: "Today's Production", value: 812, unit: 't', target: 900, delta: +4.2, status: 'running' },
  { key: 'efficiency', label: 'Factory Efficiency', value: 87.4, unit: '%', delta: +1.1, status: 'running' },
  { key: 'machineHealth', label: 'Machine Health', value: 82, unit: '/100', delta: -2.3, status: 'warning' },
  { key: 'energy', label: 'Energy Consumption', value: 4.86, unit: 'MWh', delta: -3.5, status: 'running' },
  { key: 'water', label: 'Water Usage', value: 218, unit: 'kL', delta: -1.8, status: 'running' },
  { key: 'carbon', label: 'Carbon Emissions', value: 36.2, unit: 't CO₂e', delta: -5.4, status: 'running' },
  { key: 'quality', label: 'Quality Score', value: 96.1, unit: '%', delta: +0.6, status: 'running' },
  { key: 'alerts', label: 'Maintenance Alerts', value: 5, unit: 'open', delta: +2, status: 'critical' },
]);

export const getProductionTrend = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((d) => ({ day: d, target: 900, actual: Math.round(760 + Math.random() * 180) }));
};

export const getEnergyTrend = () => {
  const hours = ['00', '04', '08', '12', '16', '20', '23'];
  return hours.map((h) => ({ time: `${h}:00`, electricity: rand(180, 260), steam: rand(90, 150) }));
};

export const getShiftPerformance = () => ([
  { shift: 'Shift A (6-2)', output: rand(260, 320), efficiency: rand(82, 94) },
  { shift: 'Shift B (2-10)', output: rand(240, 300), efficiency: rand(78, 90) },
  { shift: 'Shift C (10-6)', output: rand(210, 270), efficiency: rand(74, 86) },
]);

export const getMachineUtilization = () => (
  PRODUCTION_LINES.map((line) => ({ line: line.split(' - ')[1], utilization: rand(68, 96) }))
);

export const getDowntimeAnalysis = () => ([
  { reason: 'Unplanned Failure', hours: 6.2, color: '#e11d48' },
  { reason: 'Planned Maintenance', hours: 4.5, color: '#64748b' },
  { reason: 'Changeover', hours: 2.1, color: '#f59e0b' },
  { reason: 'Material Wait', hours: 1.4, color: '#14b8a6' },
]);

export const getQualityTrend = () => {
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
  return weeks.map((w) => ({ week: w, passRate: rand(93, 98.5) }));
};

export const getRecentActivities = () => ([
  { id: 1, text: 'Twisting Unit 2 (MC-3005) flagged critical vibration levels', time: '4 min ago', type: 'critical' },
  { id: 2, text: 'Batch QC-8841 passed final inspection at 97.8% pass rate', time: '22 min ago', type: 'success' },
  { id: 3, text: 'Shift B handover completed for Line B - Drawing', time: '48 min ago', type: 'info' },
  { id: 4, text: 'Inventory: Viscose pulp stock fell below reorder threshold', time: '1 hr ago', type: 'warning' },
  { id: 5, text: 'Dip & Cure Oven 1 entered scheduled maintenance window', time: '2 hr ago', type: 'info' },
]);

export const getAIRecommendations = () => ([
  { id: 1, title: 'Schedule preemptive bearing replacement on MC-3005', impact: 'Prevents an estimated 14-hour unplanned stoppage', confidence: 91 },
  { id: 2, title: 'Shift Line C load to Shift A window', impact: 'Could lift factory efficiency by ~1.8% this week', confidence: 76 },
  { id: 3, title: 'Reduce dip-oven idle temperature by 6°C overnight', impact: 'Projected energy saving of 3.1 MWh / week', confidence: 83 },
]);

export const getPredictiveMaintenance = () => MACHINES.map((m) => {
  const risk = Math.min(97, Math.max(3, Math.round(100 - m.health + rand(-5, 5))));
  return {
    ...m,
    riskScore: risk,
    failureProbability: Math.min(95, Math.round(risk * 0.85)),
    remainingUsefulLife: Math.max(2, Math.round((100 - risk) * 1.4)),
    recommendedAction: risk > 70 ? 'Immediate inspection required' : risk > 40 ? 'Schedule maintenance within 7 days' : 'Continue routine monitoring',
  };
});

export const getMaintenanceCalendar = () => ([
  { id: 1, machine: 'MC-3005', task: 'Bearing & vibration dampener replacement', date: '2026-07-13', priority: 'critical' },
  { id: 2, machine: 'MC-2011', task: 'Coolant system inspection', date: '2026-07-15', priority: 'high' },
  { id: 3, machine: 'MC-4021', task: 'Oven calibration & seal check', date: '2026-07-16', priority: 'medium' },
  { id: 4, machine: 'MC-1043', task: 'Routine lubrication service', date: '2026-07-19', priority: 'low' },
  { id: 5, machine: 'MC-1042', task: 'Quarterly safety audit', date: '2026-07-22', priority: 'medium' },
]);

export const getNotifications = () => ([
  { id: 1, title: 'Machine Overheating', message: 'MC-3005 temperature exceeded 95°C threshold', severity: 'critical', time: '4 min ago' },
  { id: 2, title: 'Inventory Low', message: 'Viscose pulp stock at 12% of reorder level', severity: 'warning', time: '1 hr ago' },
  { id: 3, title: 'Maintenance Due', message: 'MC-2011 coolant inspection due in 2 days', severity: 'info', time: '3 hr ago' },
  { id: 4, title: 'Production Delay', message: 'Line C running 8% behind hourly target', severity: 'warning', time: '5 hr ago' },
  { id: 5, title: 'Energy Spike', message: 'Electricity draw spiked 18% above baseline at 14:00', severity: 'warning', time: '6 hr ago' },
  { id: 6, title: 'Quality Issue', message: 'Batch QC-8839 flagged for tensile strength deviation', severity: 'critical', time: 'Yesterday' },
]);

export const getUser = (role = 'Plant Manager') => ({
  name: 'Vedant Rathore',
  role,
  facility: 'Century Rayon — Tyre Cord Plant, Shahad',
  avatarInitials: 'VR',
});

export const ROLES = ['Admin', 'Plant Manager', 'Maintenance Engineer', 'Production Supervisor', 'Sustainability Officer'];
