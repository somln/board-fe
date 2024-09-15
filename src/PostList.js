import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { keycloakAdapter } from './keycloak';

function PostList() {  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = keycloakAdapter.getToken();
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

  return (
    <div className="container my-3">
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th> {/* 작성자 추가 */}
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.postId}>
              <td>{index + 1}</td>
              <td>
                <a href={`/post/detail/${post.postId}`}>{post.title}</a>
              </td>
              <td>{post.username}</td> {/* 작성자 추가 */}
              <td>{new Date(post.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
