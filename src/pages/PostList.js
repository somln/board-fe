import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { postApi } from '../api'; 
import { keycloakService } from '../keycloakService';
import PostTable from '../components/PostTable'; 

function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc'); 
  const navigate = useNavigate();
  const pageSize = 10;

  const fetchPosts = async (page, sortOrder) => {
    try {
      const response = await postApi.getPosts(page, pageSize, sortOrder); 
      setPosts(response.data.data.posts);
      setTotalPages(response.data.data.totalPageNumber);
      setCurrentPage(response.data.data.nowPageNumber);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handlePageChange = (page) => {
    fetchPosts(page, sortOrder);  
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); 
    fetchPosts(currentPage, event.target.value); 
  };

  useEffect(() => {
    fetchPosts(currentPage, sortOrder);
  }, [currentPage, sortOrder]);

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
      navigate(`/posts/${postId}`);
    }
  };

  const isAuthenticated = !!keycloakService.isLoggedIn();
  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <select className="form-select w-auto mt-3 me-4" value={sortOrder} onChange={handleSortChange}>
            <option value="desc">최신순</option>
            <option value="asc">오래된 순</option>
          </select>
  
          <form className="d-flex mt-3" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-secondary ms-2" type="submit">검색</button>
          </form>
        </div>
 
        <div className="d-flex justify-content-end">
          {isAuthenticated ? (
            <>
              <button className="btn btn-secondary me-2 mt-3" onClick={handleCreatePost}>
                글 작성
              </button>
              <button className="btn btn-dark mt-3" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary me-2 mt-3" onClick={handleLogin}>
                로그인
              </button>
              <button className="btn btn-dark mt-3" onClick={handleRegister}>
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
  
      <PostTable posts={posts} handlePostClick={handlePostClick} />
  
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default PostList;
