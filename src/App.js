import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostList from './PostList';
import NewPost from './NewPost';
import Home from './Home';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PrivateRoute><PostList /></PrivateRoute>} />
          <Route path="/posts/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
