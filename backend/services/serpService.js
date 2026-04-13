const axios = require('axios');

async function searchArticles(concept) {
  const query = `${concept} tutorial site:geeksforgeeks.org OR site:docs.microsoft.com OR site:developer.mozilla.org OR site:baeldung.com OR site:medium.com OR site:dev.to`;

  const response = await axios.get('https://serpapi.com/search', {
    params: {
      api_key: process.env.SERP_API_KEY,
      q:       query,
      num:     8,
      hl:      'en',
      gl:      'us',
      safe:    'active',
      engine:  'google',
    },
    timeout: 10000,
  });

  const organic = response.data.organic_results || [];
  return organic.slice(0, 5).map((item) => ({
    title:   item.title,
    url:     item.link,
    snippet: item.snippet || '',
    source:  new URL(item.link).hostname.replace('www.', ''),
  }));
}

module.exports = { searchArticles };
