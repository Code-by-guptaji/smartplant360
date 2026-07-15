import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Boxes, QrCode, Truck, Warehouse } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import {
  getRawMaterials, getFinishedGoods, getSuppliers, getWarehouseOverview,
} from '../services/dummyData';

export default function Inventory() {
  const [tab, setTab] = useState('raw');
  const rawMaterials = useMemo(() => getRawMaterials(), []);
  const finishedGoods = useMemo(() => getFinishedGoods(), []);
  const suppliers = useMemo(() => getSuppliers(), []);
  const warehouses = useMemo(() => getWarehouseOverview(), []);

  const allItems = [...rawMaterials, ...finishedGoods];
  const lowStock = allItems.filter((i) => i.stock < i.reorderLevel);
  const totalWarehouseCap = warehouses.reduce((a, w) => a + w.capacity, 0);
  const totalWarehouseOcc = warehouses.reduce((a, w) => a + w.occupied, 0);

  const activeItems = tab === 'raw' ? rawMaterials : finishedGoods;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total SKUs" value={allItems.length} unit="items" delta={0} status="running" index={0} />
        <StatCard label="Low Stock Alerts" value={lowStock.length} unit="items" delta={lowStock.length > 2 ? 1 : -1} status={lowStock.length > 0 ? 'critical' : 'running'} index={1} />
        <StatCard label="Warehouse Utilization" value={Number(((totalWarehouseOcc / totalWarehouseCap) * 100).toFixed(1))} unit="%" delta={1.4} status="running" index={2} />
        <StatCard label="Active Suppliers" value={suppliers.length} unit="vendors" delta={0} status="running" index={3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Low stock alerts */}
        <Card title="Low Stock Alerts" className="lg:col-span-2" action={<AlertTriangle className="h-4 w-4 text-danger-500" />}>
          {lowStock.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No items currently below reorder level.</p>
          ) : (
            <ul className="space-y-2.5">
              {lowStock.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-lg bg-danger-500/5 border border-danger-500/15 px-3.5 py-2.5"
                >
                  <div>
                    <p className="text-xs font-medium text-secondary-500 dark:text-slate-100">{item.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.id} &middot; {item.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono-data text-danger-500 font-semibold">{item.stock} {item.unit}</p>
                    <p className="text-[10px] text-slate-400">reorder at {item.reorderLevel} {item.unit}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </Card>

        {/* QR placeholder */}
        <Card title="Batch Tracking" action={<QrCode className="h-4 w-4 text-slate-400" />}>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="h-32 w-32 rounded-lg bg-slate-100 dark:bg-white/5 border border-dashed border-slate-300 dark:border-slate-600 grid grid-cols-5 grid-rows-5 gap-0.5 p-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`rounded-[1px] ${[0,1,2,4,5,9,10,14,15,19,20,21,22,24,3,6,12,18].includes(i) ? 'bg-secondary-500 dark:bg-white' : 'bg-transparent'}`} />
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-3 text-center max-w-[180px]">Scan a batch label to pull full traceability — origin, line, QC result</p>
          </div>
        </Card>
      </div>

      {/* Warehouse overview */}
      <Card title="Warehouse Overview" action={<Warehouse className="h-4 w-4 text-slate-400" />}>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {warehouses.map((w, i) => {
            const pct = Math.round((w.occupied / w.capacity) * 100);
            return (
              <motion.div
                key={w.zone}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg bg-slate-50 dark:bg-white/5 p-3.5"
              >
                <p className="text-xs font-medium text-secondary-500 dark:text-slate-100">{w.zone}</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-mono-data text-lg font-semibold text-secondary-500 dark:text-white">{w.occupied}</span>
                  <span className="text-[11px] text-slate-400 font-mono-data">/ {w.capacity} {w.unit}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: pct > 90 ? '#e11d48' : pct > 70 ? '#f59e0b' : '#1e6f5c' }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{pct}% occupied</p>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Item tables */}
      <Card
        title="Inventory Items"
        action={<Boxes className="h-4 w-4 text-slate-400" />}
      >
        <div className="flex items-center gap-2 mb-3">
          {[{ key: 'raw', label: 'Raw Materials' }, { key: 'fg', label: 'Finished Goods' }].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                tab === t.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="py-2 pr-4 font-medium">ID</th>
                <th className="py-2 pr-4 font-medium">Item</th>
                <th className="py-2 pr-4 font-medium">Stock</th>
                <th className="py-2 pr-4 font-medium">Reorder Level</th>
                <th className="py-2 pr-4 font-medium">Supplier</th>
                <th className="py-2 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <td className="py-2.5 pr-4 font-mono-data text-slate-400">{item.id}</td>
                  <td className="py-2.5 pr-4 font-medium text-secondary-500 dark:text-slate-100">{item.name}</td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{item.stock} {item.unit}</td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{item.reorderLevel} {item.unit}</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{item.supplier}</td>
                  <td className="py-2.5 pr-4"><Badge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Suppliers */}
      <Card title="Supplier Details" action={<Truck className="h-4 w-4 text-slate-400" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="py-2 pr-4 font-medium">Supplier</th>
                <th className="py-2 pr-4 font-medium">Supplies</th>
                <th className="py-2 pr-4 font-medium">Reliability</th>
                <th className="py-2 pr-4 font-medium">Lead Time</th>
                <th className="py-2 pr-4 font-medium">Last Delivery</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.name} className="border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-secondary-500 dark:text-slate-100">{s.name}</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{s.category}</td>
                  <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{s.reliability}%</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{s.leadTime}</td>
                  <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{s.lastDelivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
