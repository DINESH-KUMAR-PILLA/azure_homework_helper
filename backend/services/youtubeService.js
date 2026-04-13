const axios = require('axios');

async function searchVideos(concept) {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part:           'snippet',
      q:              `${concept} tutorial programming`,
      type:           'video',
      maxResults:     5,
      order:          'relevance',
      videoDuration:  'medium',
      videoEmbeddable: true,
      safeSearch:     'strict',
      key:            process.env.YOUTUBE_API_KEY,
    },
    timeout: 10000,
  });

  return (response.data.items || []).map((item) => ({
    videoId:     item.id.videoId,
    title:       item.snippet.title,
    channel:     item.snippet.channelTitle,
    thumbnail:   item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    url:         `https://www.youtube.com/watch?v=${item.id.videoId}`,
    publishedAt: item.snippet.publishedAt,
  }));
}

module.exports = { searchVideos };
