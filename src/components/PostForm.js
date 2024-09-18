import { useState, useEffect } from 'react';

function PostForm({ initialTitle = '', initialContent = '', onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);  //게시글을 수정할 경우 initial 값이 필요

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            placeholder="내용을 입력하세요."
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary me-2">완료</button>
        <button type="button" className="btn btn-dark" onClick={onCancel}>취소</button>
      </form>
    </div>
  );
}

export default PostForm;
