import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { postApi } from '../api'; 
import PostTable from '../components/PostTable';
import { keycloakService } from '../keycloakService'; 

function SearchResults() {
  const [searchParams] = useSearchParams(); 
  const query = searchParams.get('q'); 
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await postApi.searchPosts(query); 
        setPosts(response.data.data);
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
      <PostTable posts={posts} handlePostClick={handlePostClick} />
    </div>
  );
}

export default SearchResults;
