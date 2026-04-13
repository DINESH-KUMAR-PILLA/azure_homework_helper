import ScoreGauge from '../ui/ScoreGauge';

export default function FeedbackCard({ score, verdict, feedback, isCorrect }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <div className="shrink-0 mx-auto sm:mx-0">
        <ScoreGauge score={score} verdict={verdict} />
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="text-sm font-medium text-slate-300">
            {isCorrect ? 'Solution is correct' : 'Solution has issues'}
          </span>
        </div>
        <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
          {feedback}
        </div>
      </div>
    </div>
  );
}
