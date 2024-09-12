import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpVHY4Z3dsUGFPclJ0OFRvVkdpQVU2YnBHdmVyX0hoMDdfU3RzdmptbTVZIn0.eyJleHAiOjE3MjYxMzE4MTEsImlhdCI6MTcyNjEzMTUxMSwianRpIjoiOTlhN2VmMGUtMGIwYS00ZmEyLWIxMjQtYTRmMTg4OTA1ZjBhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL3JlYWxtcy9ib2FyZCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiZjUyNmNlOC0xNDhiLTRiM2QtOGFkNS0yMmUzYjEwMDMzN2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtYWluX2NsaWVudCIsInNlc3Npb25fc3RhdGUiOiI5ZGUwODhjNy05ODdiLTQ4YmYtOTU3Ni0xNDE3ZmI5NzQ5ODAiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtdGVzdCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJtYWluX2NsaWVudCI6eyJyb2xlcyI6WyJVU0VSIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI5ZGUwODhjNy05ODdiLTQ4YmYtOTU3Ni0xNDE3ZmI5NzQ5ODAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Im5hbWUyIiwiZW1haWwiOiJlbWFpbDJAZXhhbXBsZS5jb20ifQ.fElEIBG2_zy-u2cDuz4T9nrZD7g3HY6g2tlsiZaV2scCVndwliD0mbQee14iO87y792ykGnBRzzgW97QtRk422enLNMaWk2F9OFtanRxBvZ5OiytAojORlaJ74APmY6yCwZf6mSpFMtgRqBP_wMNK8otxnYksos2PbAw4hTkQwlun2VprfJWpLjwTnZM066DvKfaF9UEoPjYjMG1OsslnnoeHBaQbhYum_QSwcthC2z7wydDkVCMR1Hi_OD0hFAiLwte0kDmzTKHYaTUi_Fcp1H6EFXejrNB2YsiMzfrZKh0GsF-R-bafGcCrafTYTwQ1rYtqNuDn_MXQEx8s0SLnQ";

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
