import { Factory, Boxes, ShieldCheck, Zap, Leaf, Orbit, FileBarChart } from 'lucide-react';
import ComingSoon from '../components/ui/ComingSoon';

export const Production = () => (
  <ComingSoon
    icon={Factory}
    title="Production Monitoring"
    description="Target vs actual output, live production-line status, shift comparison, hourly and monthly production, and AI-driven forecasting are being wired up to the plant's MES feed."
  />
);

export const Inventory = () => (
  <ComingSoon
    icon={Boxes}
    title="Inventory"
    description="Raw material and finished-goods tracking, supplier details, low-stock alerts and warehouse overview — coming as this module connects to the plant's inventory system."
  />
);

export const QualityControl = () => (
  <ComingSoon
    icon={ShieldCheck}
    title="Quality Control"
    description="Batch inspection, defect analysis, pass-rate tracking and root-cause analysis dashboards are in progress."
  />
);

export const Energy = () => (
  <ComingSoon
    icon={Zap}
    title="Energy Analytics"
    description="Detailed electricity, steam, fuel and water consumption breakdowns with cost and efficiency KPIs — this deep-dive view is in progress. See the Overview dashboard for a live energy summary in the meantime."
  />
);

export const Sustainability = () => (
  <ComingSoon
    icon={Leaf}
    title="Sustainability"
    description="Carbon footprint, water saving, waste recycling, renewable energy usage and the full ESG dashboard are being finalized."
  />
);

export const DigitalTwin = () => (
  <ComingSoon
    icon={Orbit}
    title="Digital Twin"
    description="An interactive, live-status factory layout — click any machine to inspect it in real time — is in development."
  />
);

export const Reports = () => (
  <ComingSoon
    icon={FileBarChart}
    title="Reports"
    description="PDF and Excel export for production, machine, inventory, energy and quality reports is being connected to the reporting engine."
  />
);
