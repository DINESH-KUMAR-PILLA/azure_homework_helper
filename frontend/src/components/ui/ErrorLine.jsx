const severityStyles = {
  error:   { bg: 'bg-red-500/10',    border: 'border-red-500/30',   text: 'text-red-400',   badge: 'bg-red-500/20 text-red-300' },
  warning: { bg: 'bg-amber-500/10',  border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' },
  info:    { bg: 'bg-blue-500/10',   border: 'border-blue-500/30',  text: 'text-blue-400',  badge: 'bg-blue-500/20 text-blue-300' },
};

export default function ErrorLine({ line, message, severity = 'error' }) {
  const s = severityStyles[severity] || severityStyles.error;
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${s.bg} ${s.border}`}>
      {line != null && (
        <span className={`shrink-0 text-xs font-mono px-2 py-0.5 rounded ${s.badge}`}>
          L{line}
        </span>
      )}
      <span className={`text-sm ${s.text} leading-relaxed`}>{message}</span>
      <span className={`ml-auto shrink-0 text-xs capitalize px-2 py-0.5 rounded ${s.badge}`}>
        {severity}
      </span>
    </div>
  );
}
