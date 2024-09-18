import { useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { keycloakService } from './keycloakService';

function SearchResults() {
  const [searchParams] = useSearchParams(); 
  const query = searchParams.get('q'); 
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const token = keycloakService.getToken();
        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/search?q=${encodeURIComponent(query)}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        setPosts(response.data.data.posts);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handlePostClick = (postId) => {
    if (!keycloakService.isLoggedIn()) {
      alert("로그인이 필요합니다.");
    } else {
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <div className="container my-3 mt-4">
      <h2>검색 결과: "{query}"</h2>
      <table className="table mt-4">
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
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}>
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

export default SearchResults;
