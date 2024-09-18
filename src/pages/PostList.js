import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { postApi } from '../api';
import { keycloakService } from '../keycloakService';
import PostTable from '../components/PostTable';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);  // 페이지 초기값 0부터 시작
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
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);  //검색 키워드를 파라미터로 전달
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, sortOrder);
  }, [currentPage, sortOrder]);  //페이지와 정렬 조건이 변경될 때마다 실행


  //게시글 상세 페이지는 로그인한 사용자가 볼 수 있음
  const handlePostClick = (postId) => {
    if (!keycloakService.isLoggedIn()) {
      alert("로그인이 필요합니다.");
    } else {
      navigate(`/posts/${postId}`);
    }
  };

  const isAuthenticated = keycloakService.isLoggedIn();

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          {/* 정렬 순서를 선택, 변경될 때 sortOrder 상태 업데이트 */}
          <select className="form-select w-auto mt-3 me-4" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="desc">최신순</option>
            <option value="asc">오래된 순</option>
          </select>

          {/* 검색 폼, 검색어를 입력하고 제출하면 검색어를 파라미터로 검색 페이지로 전달*/}
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
          {/* 사용자가 로그인되어 있으면 글 작성, 로그아웃 버튼 표시 */}
          {isAuthenticated ? (
            <>
              <button className="btn btn-secondary me-2 mt-3" onClick={() => navigate('/posts/new')}>
                글 작성
              </button>
              <button className="btn btn-dark mt-3" onClick={() => keycloakService.logout()}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary me-2 mt-3" onClick={() => keycloakService.login()}>
                로그인
              </button>
              <button className="btn btn-dark mt-3" onClick={() => navigate('/signup')}>
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      <PostTable posts={posts} handlePostClick={handlePostClick} />

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/*총 페이지 수를 바탕으로 페이지 번호 버튼 생성 */}
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page} className="page-item">
              {/* 페이지 번호 클릭 시 currentPage 상태 업데이트 */}
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
                style={{ color: 'black' }}>
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
