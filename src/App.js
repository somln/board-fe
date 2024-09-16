import React from 'react';
import {Route, Routes} from 'react-router-dom';
import PostList from './PostList';
import NewPost from './NewPost';
import PostDetail from './PostDetail';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
          <Route path="/posts/detail/:postId" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
        </Routes>
      </div>
  );
}

export default App;
