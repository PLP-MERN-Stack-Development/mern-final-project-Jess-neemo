// client/src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          You Are Not Alone
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          SafeVoice provides confidential support for survivors of gender-based violence.
          File a report, find emergency help, or connect with verified resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-slate-800 mb-2">Anonymous Report</h3>
            <p className="text-slate-600 text-sm">Share your story securely</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-slate-800 mb-2">Emergency SOS</h3>
            <p className="text-slate-600 text-sm">Hotlines & safe houses</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-slate-800 mb-2">Verified Support</h3>
            <p className="text-slate-600 text-sm">Counseling & legal aid</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            to="/report" 
            className="block bg-primary hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition"
          >
            File a Secure Report
          </Link>
          <Link 
            to="/resources" 
            className="block bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-8 rounded-lg transition"
          >
            View Emergency Resources
          </Link>
        </div>
      </div>
    </div>
  );
}