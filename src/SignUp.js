import React, { useState } from 'react';
import axios from 'axios';
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
      await axios.post('http://localhost:8080/api/users/signup', formData);
      alert('회원가입이 완료되었습니다.');
      navigate('/'); 
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <div className="container mt-5">  {/* 중앙 정렬 및 상단 여백 */}
      <div className="row justify-content-center">  {/* 수평 중앙 정렬 */}
        <div className="col-md-6">  {/* 화면의 50% 차지 */}
          <div className="card">  {/* 카드 스타일 */}
            <div className="card-body">  {/* 카드 본문 */}
              <h2 className="card-title text-center mb-4">회원가입</h2>  {/* 중앙 정렬 및 하단 여백 */}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">  {/* 입력 그룹 및 하단 여백 */}
                  <label htmlFor="username">사용자명:</label>
                  <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required /> 
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">이메일:</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name">이름:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">비밀번호:</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                </div>
                <div className="d-grid gap-2">  
                  <button type="submit" className="btn btn-primary">가입하기</button>  
                  <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">취소</button>  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
