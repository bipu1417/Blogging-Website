import {name, useState} from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

const AddComment = ({ articleName, onArticleUpdated }) => {

    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addCommentfun = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        }, {
            headers,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a comment</h3>
            {user && <p>You are posting as {user.email}</p>}
            <label>
                <textarea 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                rows="4" cols="50" required />
            </label>
            <button onClick={addCommentfun}>Add Comment</button>
        </div>
    )
}

export default AddComment;