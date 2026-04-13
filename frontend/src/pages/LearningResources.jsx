import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchArticles, fetchVideos } from '../api/client';
import GlassCard from '../components/ui/GlassCard';
import Spinner from '../components/ui/Spinner';
import ArticleList from '../components/resources/ArticleList';
import VideoList from '../components/resources/VideoList';

export default function LearningResources() {
  const [concept,  setConcept]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [articles, setArticles] = useState(null);
  const [videos,   setVideos]   = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!concept.trim()) return;
    setLoading(true);
    setArticles(null);
    setVideos(null);
    try {
      const [aRes, vRes] = await Promise.all([
        fetchArticles(concept.trim()),
        fetchVideos(concept.trim()),
      ]);
      setArticles(aRes.data.articles);
      setVideos(vRes.data.videos);
      toast.success(`Found resources for "${concept}"`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Learning Resources</h1>
        <p className="text-slate-400 text-sm mt-1">
          Search for curated articles and videos for any programming concept
        </p>
      </div>

      {/* Search */}
      <GlassCard>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            className="glass-input flex-1"
            placeholder="e.g. Azure Functions, Binary Search, React Hooks..."
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
          <button type="submit" className="btn-primary shrink-0" disabled={loading || !concept.trim()}>
            {loading ? <Spinner size="sm" /> : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            <span className="hidden sm:inline">{loading ? 'Searching...' : 'Search'}</span>
          </button>
        </form>
      </GlassCard>

      <AnimatePresence>
        {(articles || videos) && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Articles */}
            {articles && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-base font-semibold text-white">
                    Articles <span className="text-slate-400 text-sm font-normal">({articles.length})</span>
                  </h2>
                </div>
                {articles.length > 0 ? <ArticleList articles={articles} /> : (
                  <p className="text-sm text-slate-400">No articles found for this concept.</p>
                )}
              </div>
            )}

            {/* Videos */}
            {videos && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <h2 className="text-base font-semibold text-white">
                    Videos <span className="text-slate-400 text-sm font-normal">({videos.length})</span>
                  </h2>
                </div>
                {videos.length > 0 ? <VideoList videos={videos} /> : (
                  <p className="text-sm text-slate-400">No videos found for this concept.</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
