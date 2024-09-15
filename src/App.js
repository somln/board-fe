import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './PostList';
import NewPost from './NewPost';
import { keycloakService } from './keycloakService'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<NewPost />} />
        </Routes>
        <button onClick={() => keycloakService.logout()}>Logout</button> 
      </div>
    </Router>
  );
}

export default App;
