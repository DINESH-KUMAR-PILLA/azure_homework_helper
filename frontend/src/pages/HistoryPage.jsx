import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { fetchHistory, deleteSubmission } from '../api/client';
import GlassCard from '../components/ui/GlassCard';
import Spinner from '../components/ui/Spinner';
import HistoryList from '../components/history/HistoryList';

export default function HistoryPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search,  setSearch]          = useState('');
  const [page,    setPage]            = useState(1);
  const [total,   setTotal]           = useState(0);

  const LIMIT = 20;

  const load = useCallback(async (p = 1, q = search) => {
    setLoading(true);
    try {
      const res = await fetchHistory({ page: p, limit: LIMIT, search: q });
      setSubmissions(res.data.submissions);
      setTotal(res.data.total);
      setPage(p);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { load(1, ''); }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => load(1, search), 300);
    return () => clearTimeout(t);
  }, [search]);

  async function handleDelete(id) {
    try {
      await deleteSubmission(id);
      toast.success('Submission deleted');
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setTotal((t) => t - 1);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Submission History</h1>
        <p className="text-slate-400 text-sm mt-1">
          {total} total submission{total !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search */}
      <GlassCard animate={false}>
        <input
          className="glass-input"
          placeholder="Search by candidate name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </GlassCard>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <HistoryList submissions={submissions} onDelete={handleDelete} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            className="btn-secondary"
            onClick={() => load(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
          <button
            className="btn-secondary"
            onClick={() => load(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
