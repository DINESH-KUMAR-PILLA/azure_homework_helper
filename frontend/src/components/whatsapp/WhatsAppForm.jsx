import { useState } from 'react';
import Spinner from '../ui/Spinner';

export default function WhatsAppForm({ onSubmit, loading, submissions }) {
  const [form, setForm] = useState({
    phone: '',
    submissionId: '',
    concept: '',
    includeArticles: true,
    includeVideos: true,
  });

  function set(field) {
    return (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setForm((f) => ({ ...f, [field]: value }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label">Submission *</label>
        <select
          className="glass-input"
          value={form.submissionId}
          onChange={set('submissionId')}
          required
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <option value="" style={{ background: '#1e1b4b' }}>Select a submission...</option>
          {submissions.map((s) => (
            <option key={s.id} value={s.id} style={{ background: '#1e1b4b' }}>
              #{s.id} — {s.candidateName} ({s.score}/100 · {new Date(s.createdAt).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">WhatsApp Phone Number *</label>
        <input
          className="glass-input"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={set('phone')}
          required
        />
        <p className="text-xs text-slate-500 mt-1">Include country code (e.g. +91 for India)</p>
      </div>

      <div>
        <label className="label">Concept Name (for resources)</label>
        <input
          className="glass-input"
          placeholder="e.g. Binary Search, Azure Functions"
          value={form.concept}
          onChange={set('concept')}
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.includeArticles} onChange={set('includeArticles')}
            className="w-4 h-4 accent-violet-500" />
          <span className="text-sm text-slate-300">Include Articles</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.includeVideos} onChange={set('includeVideos')}
            className="w-4 h-4 accent-violet-500" />
          <span className="text-sm text-slate-300">Include Videos</span>
        </label>
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? <><Spinner size="sm" /> Sending...</> : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send to WhatsApp
          </>
        )}
      </button>
    </form>
  );
}
