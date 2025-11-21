// client/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import Resources from './pages/Resources';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/reports" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <footer className="bg-slate-800 text-white text-center py-4 text-sm">
          © {new Date().getFullYear()} SafeVoice — Confidential. Secure. Survivor-centered.
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;