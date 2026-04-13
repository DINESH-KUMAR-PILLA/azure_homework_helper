import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function scoreColor(score) {
  if (score >= 80) return { stroke: '#22c55e', text: 'text-green-400', bg: 'bg-green-400/10' };
  if (score >= 50) return { stroke: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-400/10' };
  return { stroke: '#ef4444', text: 'text-red-400', bg: 'bg-red-400/10' };
}

export default function ScoreGauge({ score, verdict }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  const motionScore = useMotionValue(0);
  const spring = useSpring(motionScore, { stiffness: 60, damping: 18 });
  const displayScore = useTransform(spring, (v) => Math.round(v));
  const strokeDash = useTransform(spring, (v) =>
    `${(v / 100) * circumference} ${circumference}`
  );

  useEffect(() => {
    motionScore.set(score);
  }, [score, motionScore]);

  const { stroke, text, bg } = scoreColor(score);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="128" height="128" viewBox="0 0 128 128">
          {/* Track */}
          <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          {/* Progress */}
          <motion.circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={strokeDash}
            transform="rotate(-90 64 64)"
            style={{ filter: `drop-shadow(0 0 6px ${stroke})` }}
          />
        </svg>
        {/* Center score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className={`text-3xl font-bold ${text}`}>{displayScore}</motion.span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
      </div>
      <span className={`score-badge ${bg} ${text} border border-current/20`}>{verdict}</span>
    </div>
  );
}
