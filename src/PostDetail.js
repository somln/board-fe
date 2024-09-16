import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { keycloakService } from './keycloakService';
import axios from "axios";

function PostDetail() {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = keycloakService.getToken();
                if (!token) {
                    throw new Error('No token available');
                }

                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setPost(response.data.data);

                const commentResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setComments(commentResponse.data.data);

            } catch (error) {
                console.error('Error fetching post or comments', error);
            }
        };

        fetchPost();
    }, [postId]);

    return (
        <div className="container my-4">
            <div className="card shadow-lg">
                <div className="card-header border border-dark">
                    <h3 className="card-title mb-0">{post.title}</h3>
                </div>
                <div className="card-body">
                    <div className="text-end">
                        <p className="card-text mb-0">
                            <strong>작성자:</strong> {post.username} | <strong>작성일시:</strong> {new Date(post.createdAt).toLocaleString()}
                            {post.isUpdated && (
                                <span className="badge bg-secondary ms-2">수정됨</span>
                            )}
                        </p>
                    </div>
                    <hr />
                    <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
                    <hr />
                    <h5 className="mb-4">댓글</h5>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.commentId}>
                                <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{comment.content}</p>
                                <div className="text-end text-muted small">
                                    작성자: {comment.username} | 작성일시: {new Date(comment.createdAt).toLocaleString()}
                                    {comment.isUpdated && (
                                        <span className="badge bg-secondary ms-2">수정됨</span>
                                    )}
                                </div>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
    
}
export default PostDetail;
