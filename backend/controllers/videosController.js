const { searchVideos }        = require('../services/youtubeService');
const { getCached, setCache } = require('../services/dbService');

const TTL_12H = 12 * 60 * 60 * 1000;

async function handleVideos(req, res, next) {
  try {
    const concept = req.query.concept.trim();

    const cached = getCached('video_cache', concept);
    if (cached) {
      return res.json({ success: true, data: { concept, videos: cached, cached: true } });
    }

    const videos = await searchVideos(concept);
    setCache('video_cache', concept, videos, TTL_12H);

    res.json({ success: true, data: { concept, videos, cached: false } });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleVideos };
