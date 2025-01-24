import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './components/App';
import Home from './pages/Home/Home';
import './index.css'
import PostPage from './pages/PostPage/PostPage';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import UserPage from './pages/UserPage/UserPage';
import CreatePost from './pages/UserPage/CreatePost';
import EditPost from './pages/UserPage/EditPost';

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
        <Route path="/user" element={<UserPage />}>
          <Route path="create" element={<CreatePost />} />
          <Route path="edit" element={<EditPost />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
