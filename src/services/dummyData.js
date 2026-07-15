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

export const getProductionLineStatus = () => ([
  { line: 'Line A - Spinning', status: 'running', target: 240, actual: 231, efficiency: 96.3, operator: 'R. Deshmukh', output: 231 },
  { line: 'Line B - Drawing', status: 'warning', target: 220, actual: 189, efficiency: 85.9, operator: 'S. Pawar', output: 189 },
  { line: 'Line C - Twisting', status: 'critical', target: 210, actual: 148, efficiency: 70.5, operator: 'A. Kulkarni', output: 148 },
  { line: 'Line D - Dipping', status: 'running', target: 230, actual: 224, efficiency: 97.4, operator: 'M. Joshi', output: 224 },
]);

export const getHourlyOutput = () => {
  const hours = Array.from({ length: 12 }, (_, i) => `${(i * 2).toString().padStart(2, '0')}:00`);
  return hours.map((h) => ({ hour: h, output: Math.round(28 + Math.random() * 18), target: 38 }));
};

export const getMonthlyOutput = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  return months.map((m) => ({ month: m, target: 24500, actual: Math.round(20500 + Math.random() * 4200) }));
};

export const getProductionForecast = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri (today)', 'Sat', 'Sun', 'Mon', 'Tue'];
  return days.map((d, i) => {
    const isFuture = i > 4;
    return {
      day: d,
      actual: isFuture ? null : Math.round(780 + Math.random() * 160),
      forecast: isFuture || i === 4 ? Math.round(800 + Math.random() * 140) : null,
    };
  });
};

export const getRawMaterials = () => ([
  { id: 'RM-001', name: 'Viscose Pulp', category: 'Raw Material', stock: 12, unit: 't', reorderLevel: 40, supplier: 'Tarapur Pulp Mills', status: 'critical' },
  { id: 'RM-002', name: 'Caustic Soda', category: 'Raw Material', stock: 68, unit: 't', reorderLevel: 50, supplier: 'Gujarat Alkalies', status: 'running' },
  { id: 'RM-003', name: 'Sulphuric Acid', category: 'Raw Material', stock: 34, unit: 't', reorderLevel: 45, supplier: 'DCW Ltd', status: 'warning' },
  { id: 'RM-004', name: 'Carbon Disulphide', category: 'Raw Material', stock: 21, unit: 't', reorderLevel: 25, supplier: 'Bhaskar Industries', status: 'warning' },
  { id: 'RM-005', name: 'Zinc Sulphate', category: 'Raw Material', stock: 58, unit: 't', reorderLevel: 30, supplier: 'Hindustan Zinc', status: 'running' },
  { id: 'RM-006', name: 'RFL Dip Chemicals', category: 'Raw Material', stock: 9.5, unit: 't', reorderLevel: 15, supplier: 'Kemira Chemicals', status: 'critical' },
]);

export const getFinishedGoods = () => ([
  { id: 'FG-101', name: 'Tyre Cord Fabric — Grade A', category: 'Finished Good', stock: 412, unit: 't', reorderLevel: 100, supplier: '—', status: 'running' },
  { id: 'FG-102', name: 'Rayon Filament Yarn 1650D', category: 'Finished Good', stock: 186, unit: 't', reorderLevel: 80, supplier: '—', status: 'running' },
  { id: 'FG-103', name: 'Industrial Yarn — Grade B', category: 'Finished Good', stock: 64, unit: 't', reorderLevel: 70, supplier: '—', status: 'warning' },
  { id: 'FG-104', name: 'Dipped Cord Fabric — Export', category: 'Finished Good', stock: 298, unit: 't', reorderLevel: 120, supplier: '—', status: 'running' },
]);

export const getSuppliers = () => ([
  { name: 'Tarapur Pulp Mills', category: 'Viscose Pulp', reliability: 94, leadTime: '5 days', lastDelivery: '2026-07-04' },
  { name: 'Gujarat Alkalies', category: 'Caustic Soda', reliability: 98, leadTime: '3 days', lastDelivery: '2026-07-08' },
  { name: 'DCW Ltd', category: 'Sulphuric Acid', reliability: 89, leadTime: '4 days', lastDelivery: '2026-07-02' },
  { name: 'Bhaskar Industries', category: 'Carbon Disulphide', reliability: 91, leadTime: '6 days', lastDelivery: '2026-06-29' },
  { name: 'Hindustan Zinc', category: 'Zinc Sulphate', reliability: 96, leadTime: '4 days', lastDelivery: '2026-07-06' },
  { name: 'Kemira Chemicals', category: 'RFL Dip Chemicals', reliability: 87, leadTime: '9 days', lastDelivery: '2026-06-24' },
]);

export const getWarehouseOverview = () => ([
  { zone: 'Raw Material Store', capacity: 1200, occupied: 890, unit: 't' },
  { zone: 'Finished Goods Warehouse', capacity: 1800, occupied: 960, unit: 't' },
  { zone: 'Chemical Store (Hazmat)', capacity: 400, occupied: 312, unit: 't' },
  { zone: 'Spares & Consumables', capacity: 250, occupied: 141, unit: 't' },
]);

export const getBatchInspections = () => ([
  { batch: 'QC-8841', line: 'Line A - Spinning', date: '2026-07-11', tested: 480, passed: 469, passRate: 97.7, status: 'running', inspector: 'N. Iyer' },
  { batch: 'QC-8840', line: 'Line D - Dipping', date: '2026-07-10', tested: 512, passed: 494, passRate: 96.5, status: 'running', inspector: 'P. Shah' },
  { batch: 'QC-8839', line: 'Line B - Drawing', date: '2026-07-10', tested: 460, passed: 421, passRate: 91.5, status: 'critical', inspector: 'N. Iyer' },
  { batch: 'QC-8838', line: 'Line C - Twisting', date: '2026-07-09', tested: 388, passed: 351, passRate: 90.5, status: 'warning', inspector: 'R. Bhatt' },
  { batch: 'QC-8837', line: 'Line A - Spinning', date: '2026-07-09', tested: 502, passed: 493, passRate: 98.2, status: 'running', inspector: 'P. Shah' },
  { batch: 'QC-8836', line: 'Line D - Dipping', date: '2026-07-08', tested: 470, passed: 456, passRate: 97.0, status: 'running', inspector: 'R. Bhatt' },
]);

export const getDefectAnalysis = () => ([
  { defect: 'Tensile Strength Deviation', count: 18, color: '#e11d48' },
  { defect: 'Denier Variation', count: 12, color: '#f59e0b' },
  { defect: 'Dip Pickup Inconsistency', count: 9, color: '#14b8a6' },
  { defect: 'Surface Contamination', count: 6, color: '#64748b' },
  { defect: 'Twist Irregularity', count: 4, color: '#1e6f5c' },
]);

export const getRootCauseAnalysis = () => ([
  { cause: 'Machine calibration drift', linkedDefect: 'Tensile Strength Deviation', occurrences: 11, action: 'Recalibrate MC-2011 tension rollers' },
  { cause: 'Raw material moisture variance', linkedDefect: 'Denier Variation', occurrences: 8, action: 'Tighten incoming pulp moisture spec' },
  { cause: 'Dip bath concentration drift', linkedDefect: 'Dip Pickup Inconsistency', occurrences: 7, action: 'Increase dip bath sampling frequency' },
  { cause: 'Ambient humidity in spinning hall', linkedDefect: 'Surface Contamination', occurrences: 5, action: 'Review HVAC dehumidification setpoint' },
]);

export const getInspectionReports = () => ([
  { id: 'RPT-3301', title: 'Weekly QC Summary — W28', date: '2026-07-06', type: 'Weekly Summary' },
  { id: 'RPT-3300', title: 'Line B Deviation Investigation', date: '2026-07-05', type: 'Root Cause' },
  { id: 'RPT-3299', title: 'Monthly Quality Report — June', date: '2026-06-30', type: 'Monthly Summary' },
  { id: 'RPT-3298', title: 'Customer Complaint Batch Trace — QC-8790', date: '2026-06-27', type: 'Traceability' },
]);

export const getEnergyBreakdown = () => ([
  { source: 'Electricity', value: 62, cost: 412000, color: '#1e6f5c' },
  { source: 'Steam', value: 21, cost: 138000, color: '#f59e0b' },
  { source: 'Fuel (Furnace Oil)', value: 11, cost: 96000, color: '#e11d48' },
  { source: 'Water', value: 6, cost: 24000, color: '#14b8a6' },
]);

export const getDailyEnergyComparison = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((d) => ({ day: d, thisWeek: Math.round(4200 + Math.random() * 900), lastWeek: Math.round(4000 + Math.random() * 900) }));
};

export const getMonthlyEnergyComparison = () => {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  return months.map((m) => ({ month: m, electricity: Math.round(118000 + Math.random() * 20000), steam: Math.round(38000 + Math.random() * 9000), fuel: Math.round(22000 + Math.random() * 6000) }));
};

export const getEnergyEfficiencyKPIs = () => ([
  { key: 'sec', label: 'Specific Energy Consumption', value: 4.82, unit: 'MWh/t', delta: -2.1, status: 'running' },
  { key: 'pf', label: 'Power Factor', value: 0.96, unit: '', delta: 0.4, status: 'running' },
  { key: 'peakLoad', label: 'Peak Load', value: 6.4, unit: 'MW', delta: 3.2, status: 'warning' },
  { key: 'renewablePct', label: 'Renewable Share', value: 18.5, unit: '%', delta: 5.6, status: 'running' },
]);

export const getSustainabilityStats = () => ([
  { key: 'carbon', label: 'Carbon Footprint', value: 1042, unit: 't CO₂e/mo', delta: -6.2, status: 'running' },
  { key: 'waterSaved', label: 'Water Saved (Recycling)', value: 38.4, unit: '%', delta: 4.1, status: 'running' },
  { key: 'waste', label: 'Waste Recycled', value: 71.2, unit: '%', delta: 2.8, status: 'running' },
  { key: 'renewable', label: 'Renewable Energy Use', value: 18.5, unit: '%', delta: 5.6, status: 'running' },
]);

export const getCarbonTrend = () => {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  return months.map((m, i) => ({ month: m, emissions: Math.round(1200 - i * 25 + Math.random() * 60) }));
};

export const getWasteBreakdown = () => ([
  { type: 'Recycled', value: 71.2, color: '#1e6f5c' },
  { type: 'Incinerated (Energy Recovery)', value: 18.3, color: '#14b8a6' },
  { type: 'Landfill', value: 10.5, color: '#94a3b8' },
]);

export const getESGScorecard = () => ([
  { pillar: 'Environmental', score: 82, color: '#1e6f5c' },
  { pillar: 'Social', score: 76, color: '#14b8a6' },
  { pillar: 'Governance', score: 88, color: '#0f172a' },
]);

export const getSustainabilityReports = () => ([
  { id: 'ESG-2607', title: 'Q2 FY26 ESG Performance Report', date: '2026-07-01' },
  { id: 'ESG-2606', title: 'Water Stewardship Progress — June', date: '2026-06-28' },
  { id: 'ESG-2605', title: 'Carbon Disclosure Submission (CDP)', date: '2026-06-15' },
]);

export const REPORT_TYPES = ['Production Summary', 'Machine Health', 'Inventory Status', 'Energy Consumption', 'Quality & QC', 'Sustainability / ESG'];

export const getReportsList = () => ([
  { id: 'RPT-4021', title: 'Weekly Production Summary — W28', type: 'Production Summary', format: 'PDF', date: '2026-07-10', size: '1.2 MB' },
  { id: 'RPT-4020', title: 'Machine Health Audit — Line C', type: 'Machine Health', format: 'PDF', date: '2026-07-09', size: '860 KB' },
  { id: 'RPT-4019', title: 'Monthly Inventory Status — June', type: 'Inventory Status', format: 'Excel', date: '2026-07-01', size: '2.4 MB' },
  { id: 'RPT-4018', title: 'Energy Consumption Report — June', type: 'Energy Consumption', format: 'PDF', date: '2026-06-30', size: '1.8 MB' },
  { id: 'RPT-4017', title: 'Quality Control Summary — June', type: 'Quality & QC', format: 'PDF', date: '2026-06-30', size: '990 KB' },
  { id: 'RPT-4016', title: 'ESG & Sustainability Report — Q2 FY26', type: 'Sustainability / ESG', format: 'PDF', date: '2026-06-28', size: '3.1 MB' },
]);

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
  facility: 'Aditya Birla Group',
  avatarInitials: 'VR',
});

export const ROLES = ['Admin', 'Plant Manager', 'Maintenance Engineer', 'Production Supervisor', 'Sustainability Officer'];

// --- Simple simulated account store (localStorage-backed) ---
// Registers a new account the first time someone logs in with a given email,
// and logs them back into their existing account on subsequent logins.
const USERS_KEY = 'sp360-accounts';

const initials = (fullName) =>
  fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('') || 'U';

const loadAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  } catch {
    return {};
  }
};

const saveAccounts = (accounts) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(accounts));
};

/**
 * Registers a new account for this email if one doesn't exist yet,
 * otherwise returns the existing account (updating role if it changed).
 */
export const registerOrLoginUser = ({ name, email, mobile, role, facility }) => {
  const accounts = loadAccounts();
  const key = email.trim().toLowerCase();

  if (accounts[key]) {
    // Existing account — sign back in, keep the name they registered with,
    // but allow role/mobile to update from whatever was entered this time.
    const existing = {
      ...accounts[key],
      role,
      mobile: mobile?.trim() || accounts[key].mobile,
    };
    accounts[key] = existing;
    saveAccounts(accounts);
    return existing;
  }

  // First time this email has been seen — create ("register") a new account.
  const newUser = {
    name: name?.trim() || email.split('@')[0],
    email: key,
    mobile: mobile?.trim() || '',
    role,
    facility: facility || 'Aditya Birla Group',
    avatarInitials: initials(name?.trim() || email.split('@')[0]),
    createdAt: new Date().toISOString(),
  };
  accounts[key] = newUser;
  saveAccounts(accounts);
  return newUser;
};
