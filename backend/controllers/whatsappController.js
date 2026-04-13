const { getSubmissionById }   = require('../services/dbService');
const { searchArticles }      = require('../services/serpService');
const { searchVideos }        = require('../services/youtubeService');
const { getCached, setCache } = require('../services/dbService');
const { sendWhatsApp }        = require('../services/twilioService');
const { formatWhatsAppMessage } = require('../utils/messageFormatter');

async function handleSend(req, res, next) {
  try {
    const { phone, submissionId, concept, includeArticles = true, includeVideos = true } = req.body;

    const submission = getSubmissionById(Number(submissionId));
    if (!submission) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    let articles = [];
    let videos   = [];

    if (includeArticles && concept) {
      try {
        const cached = getCached('article_cache', concept);
        articles = cached || await searchArticles(concept);
        if (!cached) setCache('article_cache', concept, articles, 24 * 60 * 60 * 1000);
      } catch { /* non-fatal */ }
    }

    if (includeVideos && concept) {
      try {
        const cached = getCached('video_cache', concept);
        videos = cached || await searchVideos(concept);
        if (!cached) setCache('video_cache', concept, videos, 12 * 60 * 60 * 1000);
      } catch { /* non-fatal */ }
    }

    const messageBody = formatWhatsAppMessage({
      candidateName:   submission.candidateName,
      score:           submission.score,
      verdict:         submission.verdict,
      feedback:        submission.feedback,
      improvementTips: submission.improvementTips,
      concept,
      articles,
      videos,
    });

    const result = await sendWhatsApp(phone, messageBody);

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleSend };
