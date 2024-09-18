import axios from 'axios';
import { keycloakService } from './keycloakService';

// API 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API 요청 전에 항상 토큰을 업데이트하고 헤더에 추가하는 함수
const executeRequest = async (requestFunction) => {
  return new Promise((resolve, reject) => {
    keycloakService.updateToken(async () => {
      try {
        const token = keycloakService.getToken();
        if (!token) {
          throw new Error('No token available');
        }

        // API 인스턴스에 Authorization 헤더 추가
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const result = await requestFunction();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Post 관련 API
export const postApi = {
  getPosts: (page, size, sort) => api.get('/api/posts', { params: { page, size, sort } }),
  getPostById: (postId) => executeRequest(() => api.get(`/api/posts/${postId}`)),
  createPost: (data) => executeRequest(() => api.post('/api/posts', data)),
  updatePost: (postId, data) => executeRequest(() => api.put(`/api/posts/${postId}`, data)),
  deletePost: (postId) => executeRequest(() => api.delete(`/api/posts/${postId}`)),
  searchPosts: (query) => api.get(`/api/posts/search`, { params: { q: query } })
};

// Comment 관련 API
export const commentApi = {
  getComments: (postId) => executeRequest(() => api.get(`/api/posts/${postId}/comments`)),
  createComment: (postId, data) => executeRequest(() => api.post(`/api/posts/${postId}/comments`, data)),
  updateComment: (commentId, data) => executeRequest(() => api.put(`/api/comments/${commentId}`, data)),
  deleteComment: (commentId) => executeRequest(() => api.delete(`/api/comments/${commentId}`)),
};

// User 관련 API
export const userApi = {
  getCurrentUser: () => executeRequest(() => api.get('/api/users/me')),
  signUp: (data) => api.post('/api/users/signup', data),
};
