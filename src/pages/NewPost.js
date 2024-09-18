import { useNavigate } from 'react-router-dom';
import { postApi } from '../api'; // api.js에서 가져옴
import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from '../components/PostForm';

function NewPost() {
  const navigate = useNavigate();

  const handleSubmit = async ({ title, content }) => {
    try {
      await postApi.createPost({ title, content }); // postApi 사용

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
