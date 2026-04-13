export default function PreviewPane({ candidateName, score, verdict, feedback, improvementTips, concept, articles, videos }) {
  return (
    <div className="rounded-xl p-4 text-xs font-mono leading-relaxed text-slate-300 space-y-2 border border-green-500/20"
      style={{ background: 'rgba(34,197,94,0.04)' }}>
      <p className="font-bold text-white">*Candidate Support System* — Feedback Report</p>
      <p className="text-slate-500">——————————————————————</p>
      <p><span className="text-white font-semibold">*Candidate:*</span> {candidateName}</p>
      <p><span className="text-white font-semibold">*Score:*</span> {score}/100 — {verdict}</p>
      <p className="text-slate-500 mt-1">*AI Feedback:*</p>
      <p className="text-slate-300 whitespace-pre-wrap">{feedback}</p>
      {improvementTips?.length > 0 && (
        <>
          <p className="text-white font-semibold">*Areas to Improve:*</p>
          {improvementTips.map((t, i) => <p key={i}>• {t}</p>)}
        </>
      )}
      {(articles?.length > 0 || videos?.length > 0) && (
        <>
          <p className="text-slate-500">——————————————————————</p>
          <p className="text-white font-semibold">*Learning Resources — {concept || 'General'}*</p>
          {articles?.length > 0 && (
            <>
              <p className="text-white">*Articles:*</p>
              {articles.map((a, i) => <p key={i}>{i + 1}. {a.title}</p>)}
            </>
          )}
          {videos?.length > 0 && (
            <>
              <p className="text-white mt-1">*Videos:*</p>
              {videos.map((v, i) => <p key={i}>{i + 1}. {v.title}</p>)}
            </>
          )}
        </>
      )}
      <p className="text-slate-500">——————————————————————</p>
      <p className="italic text-slate-500">_Sent via Candidate Support System_</p>
    </div>
  );
}
