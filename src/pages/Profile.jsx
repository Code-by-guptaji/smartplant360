import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import abgLogo from '../assets/abg-logo.jpg';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-1">
        <div className="flex flex-col items-center text-center py-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-semibold shadow-lg shadow-primary-500/25"
          >
            {user?.avatarInitials || 'VR'}
          </motion.div>
          <h2 className="font-display text-lg font-semibold text-secondary-500 dark:text-white mt-4">{user?.name}</h2>
          <p className="text-sm text-slate-400">{user?.role}</p>
          <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mt-1">{user?.facility}</p>
          <img src={abgLogo} alt="Aditya Birla Group" className="h-10 mt-4 opacity-80 rounded" />
        </div>
      </Card>

      <Card title="Account Details" className="lg:col-span-2" delay={0.1}>
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <Field label="Full Name" value={user?.name} index={0} />
          <Field label="Role" value={user?.role} index={1} />
          <Field label="Facility" value={user?.facility} index={2} />
          <Field label="Employee ID" value="ABG-CR-4471" index={3} />
          <Field label="Email" value={user?.email} index={4} />
          <Field label="Phone" value={user?.mobile} index={5} />
        </div>
      </Card>
    </div>
  );
}

function Field({ label, value, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.04 }}
    >
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-secondary-500 dark:text-slate-100">{value}</p>
    </motion.div>
  );
}
