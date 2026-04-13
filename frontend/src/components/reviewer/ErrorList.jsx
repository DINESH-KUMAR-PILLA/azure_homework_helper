import ErrorLine from '../ui/ErrorLine';

export default function ErrorList({ errors }) {
  if (!errors || errors.length === 0) {
    return (
      <div className="flex items-center gap-2 text-green-400 text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        No errors detected
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {errors.map((err, i) => (
        <ErrorLine key={i} line={err.line} message={err.message} severity={err.severity} />
      ))}
    </div>
  );
}
