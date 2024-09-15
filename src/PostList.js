import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { keycloakService } from './keycloakService';
import { useNavigate } from 'react-router-dom';

function PostList() {  
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = keycloakService.getToken();
        if (!token) {
          throw new Error('No token available');
        }

        const response = await fetch('http://localhost:8080/api/posts?sort=desc', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const result = await response.json();
        setPosts(result.data.posts);  
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    navigate('/posts/new');
  };

  const handleLogout = () => {
    keycloakService.logout();
  };

  return (
    <div className="container my-3">
      {keycloakService.getToken() && (
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary me-2" onClick={handleCreatePost}>
            글 작성
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            로그 아웃
          </button>
        </div>
      )}
      <table className="table">
        <thead className="table-dark">
          <tr><th>번호</th><th>제목</th><th>작성자</th><th>작성일시</th></tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.postId}>
              <td>{index + 1}</td>
              <td>
                <a href={`/post/detail/${post.postId}`}>{post.title}</a>
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
