import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Waves, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROLES } from '../services/dummyData';

export default function Login() {
  const [email, setEmail] = useState('vedant.rathore@adityabirla.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(ROLES[1]);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(role);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-secondary-500 relative overflow-hidden flex items-center justify-center p-4">
      {/* Ambient factory-floor background */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl float-slow" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl float-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Left: illustration panel */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-500 p-10 relative">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-md bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Waves className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-white tracking-wide">SmartPlant 360</span>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-10">
            <FactoryIllustration />
          </div>

          <div>
            <p className="font-display text-2xl text-white leading-snug">
              Manufacturing intelligence,<br /> in one live console.
            </p>
            <p className="text-sm text-white/60 mt-3 max-w-sm">
              Real-time production, predictive maintenance and sustainability
              telemetry across the plant floor — unified for every role.
            </p>
          </div>
        </div>

        {/* Right: form panel */}
        <div className="bg-white/[0.04] backdrop-blur-2xl p-8 sm:p-12 flex flex-col justify-center border-l border-white/10">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center">
              <Waves className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-white tracking-wide">SmartPlant 360</span>
          </div>

          <p className="text-xs font-medium tracking-widest text-accent-400 uppercase mb-2">Aditya Birla Group</p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-white/50 mb-8">Sign in to access your plant console.</p>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="text-xs font-medium text-white/60 mb-1.5 block">Work email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white/[0.06] border border-white/10 focus:border-accent-400 focus:outline-none px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white/60 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-white/[0.06] border border-white/10 focus:border-accent-400 focus:outline-none px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-white/30 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-white/60 mb-1.5 block">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none rounded-lg bg-white/[0.06] border border-white/10 focus:border-accent-400 focus:outline-none px-3.5 py-2.5 pr-9 text-sm text-white transition-colors"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r} className="bg-secondary-500 text-white">{r}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 text-white/60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 accent-accent-500"
                />
                Remember me
              </label>
              <a href="#" className="text-accent-400 hover:text-accent-300 font-medium">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 transition-all text-white font-medium text-sm py-2.5 mt-2 disabled:opacity-70 shadow-lg shadow-primary-500/20"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </motion.form>

          <p className="text-xs text-white/30 mt-8 text-center">
            Demo build — any credentials will sign you in as the selected role.
          </p>
        </div>
      </div>
    </div>
  );
}

function FactoryIllustration() {
  return (
    <svg viewBox="0 0 320 240" className="w-full max-w-sm">
      <defs>
        <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="20" y="140" width="70" height="80" rx="3" fill="url(#bld)" stroke="#ffffff33" />
      <rect x="100" y="100" width="90" height="120" rx="3" fill="url(#bld)" stroke="#ffffff33" />
      <rect x="200" y="130" width="60" height="90" rx="3" fill="url(#bld)" stroke="#ffffff33" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={115 + i * 22} y={120 + (i % 2) * 10} width="14" height="14" fill="#2dd4c4" opacity="0.5" rx="1" />
      ))}
      <motion.rect
        x="240" y="60" width="10" height="70" fill="#ffffff44"
        animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle cx="245" cy="55" r="6" fill="#2dd4c4"
        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <line x1="10" y1="220" x2="300" y2="220" stroke="#ffffff33" strokeWidth="1.5" />
      <motion.g
        animate={{ x: [0, 6, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <circle cx="40" cy="90" r="18" fill="none" stroke="#ffffff22" strokeWidth="10" />
      </motion.g>
    </svg>
  );
}
