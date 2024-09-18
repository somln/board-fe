import React, { useState } from 'react';
import { userApi } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userApi.signUp(formData); 
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errorMessage) {
        if (error.response.data.errorMessage.includes('username')) {
          alert('이미 존재하는 사용자 이름입니다. 다른 이름을 사용해주세요.');
        } else if (error.response.data.errorMessage.includes('email')) {
          alert('이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.');
        } else {
          alert(error.response.data.errorMessage);
        }
      } else {
        console.error('회원가입 실패:', error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="container mt-5 border" style={{ maxWidth: '600px' }}>
      <div className="row justify-content-center">
        <h2 className="text-center mb-4 mt-4">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">사용자명:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">이메일:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name">이름:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">비밀번호:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-dark">가입하기</button>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
