import articles from './article-content';
import ArticleList from '../component/ArticleList';
import { Link } from 'react-router-dom';

const ArticleListPage = () => {
    return (
        <>
        <h1>Articles</h1>
        <ArticleList articles={articles} />
        <Link to="/AddBlogs">Want to Add your Blog? Click here.</Link>
        </>
        
    )
}


export default ArticleListPage;