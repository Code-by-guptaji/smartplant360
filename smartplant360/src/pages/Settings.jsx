import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Card from '../components/ui/Card';
import { useTheme } from '../contexts/ThemeContext';

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

export default function Settings() {
  const { dark, toggleTheme } = useTheme();
  const [prefs, setPrefs] = useState({ email: true, sms: false, push: true, weeklyDigest: true });
  const [language, setLanguage] = useState('English');

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card title="Appearance">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            {dark ? <Moon className="h-4 w-4 text-slate-400" /> : <Sun className="h-4 w-4 text-slate-400" />}
            <div>
              <p className="text-sm font-medium text-secondary-500 dark:text-slate-100">Dark Mode</p>
              <p className="text-xs text-slate-400">Switch between light and dark console themes</p>
            </div>
          </div>
          <Toggle checked={dark} onChange={toggleTheme} />
        </div>

        <div className="py-2 mt-1">
          <p className="text-sm font-medium text-secondary-500 dark:text-slate-100 mb-1.5">Language</p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-secondary-500 dark:text-slate-100"
          >
            {['English', 'हिन्दी', 'मराठी'].map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </Card>

      <Card title="Notification Preferences">
        {[
          ['email', 'Email alerts', 'Critical alerts and daily summaries'],
          ['sms', 'SMS alerts', 'Urgent machine-critical alerts only'],
          ['push', 'Push notifications', 'Real-time in-app alerts'],
          ['weeklyDigest', 'Weekly digest', 'Summary report every Monday'],
        ].map(([key, label, desc]) => (
          <div key={key} className="flex items-center justify-between py-2.5 border-b last:border-0 border-slate-50 dark:border-slate-700/50">
            <div>
              <p className="text-sm font-medium text-secondary-500 dark:text-slate-100">{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
            <Toggle checked={prefs[key]} onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))} />
          </div>
        ))}
      </Card>

      <Card title="Change Password" className="lg:col-span-2">
        <div className="grid sm:grid-cols-3 gap-3">
          <input type="password" placeholder="Current password" className="rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm" />
          <input type="password" placeholder="New password" className="rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm" />
          <input type="password" placeholder="Confirm new password" className="rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm" />
        </div>
        <button className="mt-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 transition-colors">
          Update Password
        </button>
      </Card>
    </div>
  );
}
