// client/src/pages/ReportForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitReport } from '../services/api';

export default function ReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    contactMethod: 'anonymous',
    contactInfo: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('contactMethod', formData.contactMethod);
      if (formData.contactInfo) {
        data.append('contactInfo', formData.contactInfo);
      }
      files.forEach(file => data.append('documents', file));

      await submitReport(data);
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError('Failed to submit report. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Anonymous GBV Report</h1>

      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
          Thank you. Your report has been submitted securely.
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-slate-700 mb-2">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Brief summary of the incident"
          />
        </div>

        <div>
          <label className="block text-slate-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Describe what happened (as much as you feel safe sharing)"
          />
        </div>

        <div>
          <label className="block text-slate-700 mb-2">Location (optional)</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="border-t pt-6">
          <label className="block text-slate-700 mb-2">Contact Preference</label>
          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="anonymous">Remain Anonymous</option>
            <option value="email">Contact by Email</option>
          </select>

          {(formData.contactMethod === 'email') && (
            <input
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              type="email"
              required
              className="w-full p-3 border border-slate-300 rounded mt-2 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="your@email.com"
            />
          )}
        </div>

        <div>
          <label className="block text-slate-700 mb-2">Supporting Documents (optional)</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-slate-300 rounded"
          />
          <p className="text-sm text-slate-500 mt-1">
            Files are encrypted before upload
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-red-700 text-white font-medium py-3 px-6 rounded disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium py-3 px-6 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}