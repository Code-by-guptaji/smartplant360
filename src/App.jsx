import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';

// Route-level code splitting: everything behind the dashboard shell is lazy-loaded
// so the initial bundle only pays for auth + login + layout.
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Production = lazy(() => import('./pages/Production'));
const MachineHealth = lazy(() => import('./pages/MachineHealth'));
const PredictiveMaintenance = lazy(() => import('./pages/PredictiveMaintenance'));
const Inventory = lazy(() => import('./pages/Inventory'));
const QualityControl = lazy(() => import('./pages/QualityControl'));
const Energy = lazy(() => import('./pages/Energy'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const DigitalTwin = lazy(() => import('./pages/DigitalTwin'));
const Reports = lazy(() => import('./pages/Reports'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-8 w-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/production" element={<Production />} />
          <Route path="/machines" element={<MachineHealth />} />
          <Route path="/maintenance" element={<PredictiveMaintenance />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/quality" element={<QualityControl />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
