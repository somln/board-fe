import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keycloakService } from './keycloakService';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = keycloakService.getToken();
      if (!token) {
        throw new Error('No token available');
      }

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/posts`, 
        { title, content }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert('글이 성공적으로 작성되었습니다.');
      navigate('/');

    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('취소하시겠습니까?');
    if (confirmCancel) {
      navigate(-1);
    }
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
        <button type="submit" className="btn btn-primary me-2">완료</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>취소</button>
      </form>
    </div>
  );
}

export default NewPost;
