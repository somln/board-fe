import React, { useState } from 'react';
import axios from 'axios';

function SignUp({ onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/signup', formData);
      alert('회원가입이 완료되었습니다.');
      onCancel(); // 회원가입 완료 후 홈 화면으로 돌아갑니다.
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>사용자명:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>이메일:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>이름:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">가입하기</button>
        <button type="button" onClick={onCancel}>취소</button>
      </form>
    </div>
  );
}

export default SignUp;