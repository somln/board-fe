import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './PostList';
import NewPost from './NewPost';
import { keycloakAdapter } from './keycloak'; // 수정된 import
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    keycloakAdapter.initialize(); // 수정된 호출
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<NewPost />} />
        </Routes>
        <button onClick={() => keycloakAdapter.logout()}>Logout</button> {/* 수정된 호출 */}
      </div>
    </Router>
  );
}

export default App;
