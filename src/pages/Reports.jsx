import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileBarChart, FileSpreadsheet, FileText, Plus, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import { REPORT_TYPES, getReportsList } from '../services/dummyData';

const FORMAT_ICON = { PDF: FileText, Excel: FileSpreadsheet };

export default function Reports() {
  const [reports, setReports] = useState(() => getReportsList());
  const [showGenerator, setShowGenerator] = useState(false);
  const [type, setType] = useState(REPORT_TYPES[0]);
  const [format, setFormat] = useState('PDF');
  const [range, setRange] = useState('this-week');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newReport = {
        id: `RPT-${4022 + reports.length}`,
        title: `${type} — ${range === 'this-week' ? 'This Week' : range === 'this-month' ? 'This Month' : 'Custom Range'}`,
        type,
        format,
        date: new Date().toISOString().slice(0, 10),
        size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      };
      setReports((prev) => [newReport, ...prev]);
      setGenerating(false);
      setShowGenerator(false);
    }, 1100);
  };

  const handleDownload = () => window.print();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          Generate and download plant reports across production, machine health, inventory, energy, quality and sustainability.
        </p>
        <button
          onClick={() => setShowGenerator((s) => !s)}
          className="inline-flex items-center gap-2 text-xs font-medium rounded-lg bg-primary-500 hover:bg-primary-600 text-white px-3.5 py-2 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Generate Report
        </button>
      </div>

      <AnimatePresence>
        {showGenerator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card title="Report Generator" action={<Sparkles className="h-4 w-4 text-accent-500" />}>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Report Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-secondary-400/40 text-secondary-500 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                  >
                    {REPORT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Date Range</label>
                  <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-secondary-400/40 text-secondary-500 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                  >
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-secondary-400/40 text-secondary-500 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium rounded-lg bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white px-4 py-2 transition-colors"
              >
                {generating ? 'Generating…' : 'Generate'}
              </button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card title="Report Library" action={<FileBarChart className="h-4 w-4 text-slate-400" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="py-2 pr-4 font-medium">Report</th>
                <th className="py-2 pr-4 font-medium">Type</th>
                <th className="py-2 pr-4 font-medium">Format</th>
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Size</th>
                <th className="py-2 pr-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {reports.map((r) => {
                  const Icon = FORMAT_ICON[r.format] || FileText;
                  return (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-slate-50 dark:border-slate-800 last:border-0"
                    >
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium text-secondary-500 dark:text-slate-100">{r.title}</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{r.type}</td>
                      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{r.format}</td>
                      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{r.date}</td>
                      <td className="py-2.5 pr-4 font-mono-data text-slate-500 dark:text-slate-400">{r.size}</td>
                      <td className="py-2.5 pr-4">
                        <button
                          onClick={handleDownload}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-500 hover:text-primary-600"
                        >
                          <Download className="h-3 w-3" /> Download
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
