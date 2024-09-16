import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { keycloakService } from './keycloakService';
import axios from "axios";

function PostDetail() {

    const { postId } = useParams();
    const [post, setPost] = useState({});

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
            } catch (error) {
                console.error('Error fetching post', error);
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
                    <div className="d-flex justify-content-between">
                        <p className="card-text mb-0">
                            <strong>작성자:</strong> {post.username}
                        </p>
                        <p className="card-text mb-0">
                            <strong>작성일시:</strong> {new Date(post.createdAt).toLocaleString()}
                            {post.isUpdated && (
                            <span className="badge bg-secondary ms-2">수정됨</span>
                        )}
                        </p>
                    </div>
                    <hr />
                    <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-outline-primary">수정</button>
                    <button className="btn btn-outline-danger ms-2">삭제</button>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
