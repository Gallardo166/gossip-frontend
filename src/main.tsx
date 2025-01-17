import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './components/App';
import Home from './pages/Home/Home';
import './index.css'
import PostPage from './pages/PostPage/PostPage';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="post">
          <Route path=":id" element={<PostPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
