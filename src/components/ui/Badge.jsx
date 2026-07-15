import { STATUS_META } from '../../services/dummyData';

export default function Badge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.running;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color: meta.color, backgroundColor: meta.bg }}
    >
      <span className="h-1.5 w-1.5 rounded-full status-pulse" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
}
