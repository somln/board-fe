import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { keycloakService } from './keycloakService';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from './components/PostForm';

function EditPost() {
  const { postId } = useParams();
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = keycloakService.getToken();
        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setInitialTitle(response.data.data.title);
        setInitialContent(response.data.data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async ({ title, content }) => {
    try {
      const token = keycloakService.getToken();
      if (!token) {
        throw new Error('No token available');
      }

      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, 
        { title, content }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert('글이 성공적으로 수정되었습니다.');
      navigate(`/posts/${postId}`);

    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('취소하시겠습니까?');
    if (confirmCancel) {
      navigate(-1);
    }
  };

  return (
    <PostForm 
      initialTitle={initialTitle}
      initialContent={initialContent}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default EditPost;
