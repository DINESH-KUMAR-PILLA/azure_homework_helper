export default function ImprovementTips({ tips }) {
  if (!tips || tips.length === 0) return null;
  return (
    <ol className="space-y-2">
      {tips.map((tip, i) => (
        <li key={i} className="flex gap-3 items-start text-sm text-slate-300">
          <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-violet-300"
            style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' }}>
            {i + 1}
          </span>
          <span className="leading-relaxed pt-0.5">{tip}</span>
        </li>
      ))}
    </ol>
  );
}
