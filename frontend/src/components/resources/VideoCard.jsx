import { motion } from 'framer-motion';

export default function VideoCard({ title, channel, thumbnail, url, publishedAt }) {
  const year = publishedAt ? new Date(publishedAt).getFullYear() : null;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="glass-card overflow-hidden block group cursor-pointer hover:border-red-500/30 transition-colors"
    >
      {thumbnail && (
        <div className="relative overflow-hidden h-36 bg-slate-800">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className="p-4">
        <p className="text-sm font-semibold text-white group-hover:text-red-300 transition-colors line-clamp-2 leading-snug">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-slate-400">{channel}</span>
          {year && <><span className="text-slate-600">·</span><span className="text-xs text-slate-500">{year}</span></>}
        </div>
      </div>
    </motion.a>
  );
}
