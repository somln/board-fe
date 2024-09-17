import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { keycloakService } from '../keycloakService';
import axios from "axios";

function Comment({ postId, user }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = keycloakService.getToken();
                if (!token) {
                    throw new Error('No token available');
                }

                const commentResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setComments(commentResponse.data.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = keycloakService.getToken();
            if (!token) {
                throw new Error('No token available');
            }

            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`,
                { content: newComment },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            alert('댓글이 성공적으로 작성되었습니다.');
            setNewComment('');

            const commentResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            setComments(commentResponse.data.data);

        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
        if (!confirmed) {
            return;
        }

        try {
            const token = keycloakService.getToken();
            if (!token) {
                throw new Error('No token available');
            }

            await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/${commentId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            alert('댓글이 삭제되었습니다.');
            setComments(comments.filter(comment => comment.commentId !== commentId));

        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleUpdateComment = async (commentId) => {
        try {
            const token = keycloakService.getToken();
            if (!token) {
                throw new Error('No token available');
            }

            await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/${commentId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            alert('댓글이 수정되었습니다.');
            const commentResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            setComments(commentResponse.data.data);

        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div>
            <CommentForm
                newComment={newComment}
                setNewComment={setNewComment}
                handleCommentSubmit={handleCommentSubmit}
            />
            <CommentList
                comments={comments}
                user={user}
                handleUpdateComment={handleUpdateComment}
                handleDeleteComment={handleDeleteComment}
            />
        </div>
    );
}

export default Comment;
