import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import HomeworkReviewer from './pages/HomeworkReviewer';
import LearningResources from './pages/LearningResources';
import WhatsAppSender from './pages/WhatsAppSender';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(30, 27, 75, 0.95)',
            color: '#e2e8f0',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"          element={<HomeworkReviewer />} />
          <Route path="/resources" element={<LearningResources />} />
          <Route path="/whatsapp"  element={<WhatsAppSender />} />
          <Route path="/history"   element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
