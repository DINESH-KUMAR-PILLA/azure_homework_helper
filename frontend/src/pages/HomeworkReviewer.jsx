import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { submitReview } from '../api/client';
import GlassCard from '../components/ui/GlassCard';
import ReviewForm from '../components/reviewer/ReviewForm';
import FeedbackCard from '../components/reviewer/FeedbackCard';
import ErrorList from '../components/reviewer/ErrorList';
import ImprovementTips from '../components/reviewer/ImprovementTips';

export default function HomeworkReviewer() {
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);

  async function handleSubmit(formData) {
    setLoading(true);
    setResult(null);
    try {
      const res = await submitReview(formData);
      setResult(res.data);
      toast.success('Review complete!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Homework Reviewer</h1>
        <p className="text-slate-400 text-sm mt-1">
          AI-powered code review with line-level error detection and personalized feedback
        </p>
      </div>

      {/* Form */}
      <GlassCard>
        <ReviewForm onSubmit={handleSubmit} loading={loading} />
      </GlassCard>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Feedback */}
            <GlassCard>
              <h2 className="section-title mb-4">AI Feedback</h2>
              <FeedbackCard
                score={result.score}
                verdict={result.verdict}
                feedback={result.feedback}
                isCorrect={result.isCorrect}
              />
            </GlassCard>

            {/* Errors */}
            {result.errors?.length > 0 && (
              <GlassCard>
                <h2 className="section-title mb-4">
                  Detected Issues
                  <span className="ml-2 text-xs font-normal text-slate-400">({result.errors.length})</span>
                </h2>
                <ErrorList errors={result.errors} />
              </GlassCard>
            )}

            {/* Tips */}
            {result.improvementTips?.length > 0 && (
              <GlassCard>
                <h2 className="section-title mb-4">Improvement Tips</h2>
                <ImprovementTips tips={result.improvementTips} />
              </GlassCard>
            )}

            {/* Submission ID */}
            <p className="text-xs text-slate-500 text-right">
              Submission #{result.submissionId} saved to history
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
