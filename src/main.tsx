import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './components/App';
import Home from './pages/Home/Home';
import './index.css'
import PostPage from './pages/PostPage/PostPage';
import SignupPage from './pages/UserPage/SignupPage';
import LoginPage from './pages/UserPage/LoginPage';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="post">
          <Route path=":id" element={<PostPage />} />
        </Route>
        <Route path="register" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
