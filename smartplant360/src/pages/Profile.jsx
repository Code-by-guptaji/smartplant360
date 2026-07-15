import Card from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-1">
        <div className="flex flex-col items-center text-center py-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-semibold">
            {user?.avatarInitials || 'VR'}
          </div>
          <h2 className="font-display text-lg font-semibold text-secondary-500 dark:text-white mt-4">{user?.name}</h2>
          <p className="text-sm text-slate-400">{user?.role}</p>
          <p className="text-xs text-slate-400 mt-1">{user?.facility}</p>
        </div>
      </Card>

      <Card title="Account Details" className="lg:col-span-2">
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <Field label="Full Name" value={user?.name} />
          <Field label="Role" value={user?.role} />
          <Field label="Facility" value={user?.facility} />
          <Field label="Employee ID" value="ABG-CR-4471" />
          <Field label="Email" value="vedant.rathore@adityabirla.com" />
          <Field label="Phone" value="+91 98XXX XXXXX" />
        </div>
      </Card>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-secondary-500 dark:text-slate-100">{value}</p>
    </div>
  );
}
