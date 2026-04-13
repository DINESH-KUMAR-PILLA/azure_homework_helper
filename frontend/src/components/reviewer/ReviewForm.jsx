import { useState } from 'react';
import Spinner from '../ui/Spinner';

const LANGUAGES = ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Go', 'TypeScript', 'Ruby', 'Other'];

const DEFAULTS = {
  candidateName: '',
  problemStatement: '',
  inputOutputExamples: '',
  code: '',
  language: 'Python',
};

export default function ReviewForm({ onSubmit, loading }) {
  const [form, setForm] = useState(DEFAULTS);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Candidate Name *</label>
          <input
            className="glass-input"
            placeholder="e.g. Dinesh Kumar"
            value={form.candidateName}
            onChange={set('candidateName')}
            required
          />
        </div>
        <div>
          <label className="label">Language</label>
          <select
            className="glass-input"
            value={form.language}
            onChange={set('language')}
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {LANGUAGES.map((l) => <option key={l} value={l} style={{ background: '#1e1b4b' }}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* Problem Statement */}
      <div>
        <label className="label">Problem Statement *</label>
        <textarea
          className="glass-input resize-none"
          rows={3}
          placeholder="Describe the problem the candidate was asked to solve..."
          value={form.problemStatement}
          onChange={set('problemStatement')}
          required
        />
      </div>

      {/* Input/Output */}
      <div>
        <label className="label">Input / Output Examples</label>
        <textarea
          className="glass-input resize-none font-mono text-xs"
          rows={3}
          placeholder={'Input: [1, 2, 3]\nOutput: 6\n\nInput: []\nOutput: 0'}
          value={form.inputOutputExamples}
          onChange={set('inputOutputExamples')}
        />
      </div>

      {/* Code */}
      <div>
        <label className="label">Candidate Code *</label>
        <textarea
          className="glass-input resize-none font-mono text-xs leading-relaxed"
          rows={12}
          placeholder="Paste the candidate's code here..."
          value={form.code}
          onChange={set('code')}
          required
          spellCheck={false}
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? <><Spinner size="sm" /> Reviewing with AI...</> : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Review with AI
          </>
        )}
      </button>
    </form>
  );
}
