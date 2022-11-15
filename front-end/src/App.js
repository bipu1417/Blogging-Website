import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';
import AddBlogs from './pages/AddBlogs';
import particles from './particles';
import papp from './papp';

function App() {

  return (
    <BrowserRouter>
    <div className="App container" id='particles-js'>
      <h1>My Awesome Blog</h1>
      <NavBar />
      <div id='page-body'>
        <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/AddBlogs" element={<AddBlogs />} />
        <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <particles />
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;

// const response = await axios.get('http://localhost:8000/api/articles/learn-react');
// const data = response.data;
