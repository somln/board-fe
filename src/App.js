import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostList from './PostList';
import NewPost from './NewPost';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ authenticated }) {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={authenticated ? <Navigate to="/posts" /> : <Home />} />
          <Route path="/posts" element={authenticated ? <PostList /> : <Navigate to="/" />} />
          <Route path="/posts/new" element={authenticated ? <NewPost /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
