import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchHistory, fetchSubmission, sendWhatsApp } from '../api/client';
import GlassCard from '../components/ui/GlassCard';
import WhatsAppForm from '../components/whatsapp/WhatsAppForm';
import PreviewPane from '../components/whatsapp/PreviewPane';

export default function WhatsAppSender() {
  const [submissions, setSubmissions] = useState([]);
  const [preview,     setPreview]     = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [sent,        setSent]        = useState(false);

  useEffect(() => {
    fetchHistory({ limit: 100 })
      .then((r) => setSubmissions(r.data.submissions))
      .catch(() => {});
  }, []);

  async function handleSubmit(form) {
    setLoading(true);
    setSent(false);
    try {
      // Fetch submission detail for preview
      const subRes = await fetchSubmission(form.submissionId);
      const sub    = subRes.data;

      setPreview({
        candidateName:   sub.candidateName,
        score:           sub.score,
        verdict:         sub.verdict,
        feedback:        sub.feedback,
        improvementTips: sub.improvementTips,
        concept:         form.concept,
      });

      await sendWhatsApp({
        phone:          form.phone,
        submissionId:   form.submissionId,
        concept:        form.concept,
        includeArticles: form.includeArticles,
        includeVideos:   form.includeVideos,
      });

      setSent(true);
      toast.success('WhatsApp message sent successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">WhatsApp Sender</h1>
        <p className="text-slate-400 text-sm mt-1">
          Send AI feedback and learning resources directly to a candidate's WhatsApp
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <GlassCard>
          <h2 className="section-title mb-4">Send Message</h2>
          <WhatsAppForm onSubmit={handleSubmit} loading={loading} submissions={submissions} />
        </GlassCard>

        {/* Preview */}
        <div className="space-y-4">
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.3)' }}
              >
                <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-green-300 font-medium">Message sent successfully via WhatsApp!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {preview ? (
            <GlassCard>
              <h2 className="section-title mb-4">Message Preview</h2>
              <PreviewPane {...preview} />
            </GlassCard>
          ) : (
            <GlassCard animate={false}>
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm text-slate-500">Message preview will appear after sending</p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
