const { searchArticles }      = require('../services/serpService');
const { getCached, setCache } = require('../services/dbService');

const TTL_24H = 24 * 60 * 60 * 1000;

async function handleArticles(req, res, next) {
  try {
    const concept = req.query.concept.trim();

    const cached = getCached('article_cache', concept);
    if (cached) {
      return res.json({ success: true, data: { concept, articles: cached, cached: true } });
    }

    const articles = await searchArticles(concept);
    setCache('article_cache', concept, articles, TTL_24H);

    res.json({ success: true, data: { concept, articles, cached: false } });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleArticles };
