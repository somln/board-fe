import React from 'react';

function PostTable({ posts, handlePostClick }) {
  return (
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
                onClick={() => handlePostClick(post.postId)}  // 게시글 제목 클릭 시 게시글 상세페이지로
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
  );
}

export default PostTable;
