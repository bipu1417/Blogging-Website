import { useParams, useNavigate } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import axios from 'axios';
import CommentsList from "../component/CommentsList";
import AddComment from "../component/AddComment";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
    const { canUpvote } = articleInfo;
    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadArticleinfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`,{ headers });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if(!isLoading){
            loadArticleinfo();
        }
        
    }, [isLoading, user]);


    // const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if(!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <div className="upvote-section">
            {user
            ? <button onClick={addUpvote}>{ canUpvote ? 'Upvote' : 'Upvoted'}</button>
            : <button onClick={() => {
                navigate('/login');
            }}>Login to upvote</button>}
            <p>This article has {articleInfo.upvotes} Upvote(s).</p>
        </div>
        
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        {user
        ? <AddComment
            articleName={articleId}
            onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
        : <button onClick={() => {
            navigate('/login');
        }}>Login to comment</button>}
        <CommentsList comments={articleInfo.comments} />
        </>
        
    )
}


export default ArticlePage;