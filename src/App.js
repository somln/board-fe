import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp';
import EditPost from './pages/EditPost';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/posts/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
        <Route path="/posts/:postId" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
        <Route path="/edit-post/:postId" element={<PrivateRoute><EditPost /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
