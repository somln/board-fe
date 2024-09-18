import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postApi } from '../api'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from '../components/PostForm';

function EditPost() {
  const { postId } = useParams();
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try { // 수정하기 이전에 저장되어 있던 게시글 내용 조회
        const response = await postApi.getPostById(postId); 
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
      await postApi.updatePost(postId, { title, content });
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
