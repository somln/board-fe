import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Routes와 Route를 임포트
import PostList from './PostList';
import NewPost from './NewPost';
import { initializeKeycloak, logout } from './keycloak';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // useEffect(() => {
  //   initializeKeycloak(); 
  // }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/posts" element={<PostList />} />
        </Routes>
        <Routes>
          <Route path="/posts/new" element={<NewPost />} />
        </Routes>
        <button onClick={logout}>Logout</button> 
      </div>
    </Router>
  );
}

export default App;
