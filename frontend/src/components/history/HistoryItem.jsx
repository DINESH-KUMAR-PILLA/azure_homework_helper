import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSubmission } from '../../api/client';

function scoreBadge(score) {
  if (score >= 80) return 'bg-green-500/20 text-green-300 border-green-500/30';
  if (score >= 50) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  return 'bg-red-500/20 text-red-300 border-red-500/30';
}

export default function HistoryItem({ submission, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail]     = useState(null);
  const [loading, setLoading]   = useState(false);

  async function toggle() {
    if (expanded) { setExpanded(false); return; }
    setExpanded(true);
    if (!detail) {
      setLoading(true);
      try {
        const res = await fetchSubmission(submission.id);
        setDetail(res.data);
      } finally {
        setLoading(false);
      }
    }
  }

  const date = new Date(submission.createdAt).toLocaleString();

  return (
    <div className="glass-card !p-0 overflow-hidden">
      {/* Row */}
      <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={toggle}>
        <span className={`score-badge border ${scoreBadge(submission.score)} shrink-0`}>
          {submission.score}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{submission.candidateName}</p>
          <p className="text-xs text-slate-400 mt-0.5">{submission.verdict} · {submission.language} · {date}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(submission.id); }}
            className="btn-danger"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-4 space-y-3">
              {loading && <p className="text-xs text-slate-400">Loading details...</p>}
              {detail && (
                <>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-1">AI Feedback</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{detail.feedback}</p>
                  </div>
                  {detail.improvementTips?.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-1">Improvement Tips</p>
                      <ul className="space-y-1">
                        {detail.improvementTips.map((t, i) => (
                          <li key={i} className="text-xs text-slate-400 flex gap-2">
                            <span className="text-violet-400">•</span>{t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {detail.errors?.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-1">Detected Errors</p>
                      <div className="space-y-1">
                        {detail.errors.map((e, i) => (
                          <p key={i} className="text-xs text-red-400 font-mono">
                            {e.line ? `L${e.line}: ` : ''}{e.message}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
