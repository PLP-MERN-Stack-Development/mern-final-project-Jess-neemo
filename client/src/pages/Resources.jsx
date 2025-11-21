// client/src/pages/Resources.jsx
import { useState, useEffect } from 'react';
import { getResources } from '../services/api';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getResources(filter);
        setResources(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [filter]);

  const resourceTypes = [
    { key: '', label: 'All' },
    { key: 'hotline', label: 'Hotlines' },
    { key: 'safe-house', label: 'Safe Houses' },
    { key: 'legal', label: 'Legal Aid' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Emergency Resources</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {resourceTypes.map(type => (
          <button
            key={type.key}
            onClick={() => setFilter(type.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === type.key
                ? 'bg-primary text-white'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource._id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-slate-800">{resource.name}</h3>
              <p className="text-slate-600 text-sm mt-1">{resource.description}</p>
              <p className="mt-3 font-mono text-slate-800">{resource.contact}</p>
              {resource.location && (
                <p className="text-slate-500 text-sm mt-2">📍 {resource.location}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}