import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { keycloakService } from './keycloakService';
import axios from "axios";
import CommentWrapper from './components/CommentWrapper';

function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();

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

                const userResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setUser(userResponse.data.data);

            } catch (error) {
                console.error('Error fetching post or user', error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleDeletePost = async () => { 
        const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
        if (!confirmed) {
            return;
        }

        try {
            const token = keycloakService.getToken();
            if (!token) {
                throw new Error('No token available');
            }

            await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            alert('게시글이 삭제되었습니다.');
            navigate('/');

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="container my-3 border border-secondary">
            <div className="d-flex justify-content-between mt-3 mb-3">
                <h3 className="mb-3">{post.title}</h3>
                {user.userId === post.userId && (
                    <div className="d-flex">
                        <button className="btn btn-secondary me-2">수정</button>
                        <button className="btn btn-dark" onClick={handleDeletePost}>삭제</button>
                    </div>
                )}
            </div>
            <div>
                <div>
                    <div className="text-end">
                        <p>
                            <strong>작성자:</strong> {post.username} | <strong>작성일시:</strong> {new Date(post.createdAt).toLocaleString()}
                            {post.isUpdated && (
                                <span className="badge bg-secondary ms-2">수정됨</span>
                            )}
                        </p>
                    </div>
                    <hr style={{ borderTop: '3px solid #000' }} />
                    <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
                    <hr style={{ borderTop: '3px solid #000' }} />
                    <h5 className="mb-4">댓글</h5>
                    <CommentWrapper postId={postId} user={user} />
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
