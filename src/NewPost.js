import { useNavigate } from 'react-router-dom';
import { keycloakService } from './keycloakService';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from './components/PostForm';

function NewPost() {
  const navigate = useNavigate();

  const handleSubmit = async ({ title, content }) => {
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
    <PostForm 
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default NewPost;
