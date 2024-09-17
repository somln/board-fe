import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { keycloakService } from './keycloakService';
import { useNavigate } from 'react-router-dom';

function PostList() {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts?sort=desc`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setPosts(response.data.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const handleCreatePost = () => {
    navigate('/posts/new');
  };

  const handleLogout = () => {
    keycloakService.logout();
  };

  const handleLogin = () => {
    keycloakService.login();
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handlePostClick = (postId) => {
    if (!keycloakService.isLoggedIn()) {
      alert("로그인이 필요합니다.");
    } else {
      navigate(`/posts/detail/${postId}`);
    }
  };

  const isAuthenticated = !!keycloakService.isLoggedIn();

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-end mb-3">
        {isAuthenticated ? (
          <>
            <button className="btn btn-secondary me-2" onClick={handleCreatePost}>
              글 작성
            </button>
            <button className="btn btn-dark" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary me-2" onClick={handleLogin}>
              로그인
            </button>
            <button className="btn btn-dark" onClick={handleRegister}>
              회원가입
            </button>
          </>
        )}
      </div>
      
      <table className="table">
        <thead className="table-dark">
          <tr><th>번호</th><th>제목</th><th>작성자</th><th>작성일시</th></tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.postId}>
              <td>{posts.length - index}</td>
              <td>
                <span 
                  onClick={() => handlePostClick(post.postId)} 
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                  {post.title}
                </span>
              </td>
              <td>{post.username}</td> 
              <td>{new Date(post.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
