import { motion } from 'framer-motion';
import HistoryItem from './HistoryItem';

export default function HistoryList({ submissions, onDelete }) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-sm">No submissions yet. Review a homework to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <HistoryItem submission={s} onDelete={onDelete} />
        </motion.div>
      ))}
    </div>
  );
}
