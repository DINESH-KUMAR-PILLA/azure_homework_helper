import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

// Normalize error messages
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error ||
      err.message ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export const submitReview   = (payload)  => api.post('/api/review', payload).then((r) => r.data);
export const fetchArticles  = (concept)  => api.get('/api/articles', { params: { concept } }).then((r) => r.data);
export const fetchVideos    = (concept)  => api.get('/api/videos',   { params: { concept } }).then((r) => r.data);
export const sendWhatsApp   = (payload)  => api.post('/api/whatsapp/send', payload).then((r) => r.data);
export const fetchHistory   = (params)   => api.get('/api/history',  { params }).then((r) => r.data);
export const fetchSubmission = (id)      => api.get(`/api/history/${id}`).then((r) => r.data);
export const deleteSubmission = (id)     => api.delete(`/api/history/${id}`).then((r) => r.data);
