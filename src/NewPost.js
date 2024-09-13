import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { keycloak } from './keycloak';  


function WriterForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = keycloak .token;
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      alert('제출되었습니다!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title"  // 'bdTitle'을 'title'로 변경
        className="form-control mt-4 mb-2"
        placeholder="제목을 입력해주세요." 
        required
        value={formData.title}
        onChange={handleChange} 
      />
      <div className="form-group">
        <textarea 
          className="form-control" 
          rows="10" 
          name="content"  // 'bdContent'을 'content'로 변경
          placeholder="내용을 입력해주세요" 
          required
          value={formData.content}
          onChange={handleChange} 
        ></textarea>
      </div>
      <button type="submit" className="btn btn-secondary mb-3">제출하기</button>
    </form>
  );
}

export default WriterForm;
