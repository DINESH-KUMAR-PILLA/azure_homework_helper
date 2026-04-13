import { motion } from 'framer-motion';

export default function ArticleCard({ title, url, snippet, source }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="glass-card p-4 block group cursor-pointer hover:border-violet-500/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-2 leading-snug">
            {title}
          </p>
          {snippet && (
            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{snippet}</p>
          )}
          <span className="inline-flex items-center gap-1 mt-2 text-xs text-violet-400 font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {source}
          </span>
        </div>
        <svg className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
}
