import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { commentApi } from '../api'; 

function CommentWrapper({ postId, user }) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // 댓글 조회
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentResponse = await commentApi.getComments(postId);
                setComments(commentResponse.data.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    // 댓글 작성
    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        try {
            await commentApi.createComment(postId, { content: newComment });
            alert('댓글이 성공적으로 작성되었습니다.');
            setNewComment('');

            const commentResponse = await commentApi.getComments(postId);
            setComments(commentResponse.data.data);

        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        const confirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
        if (!confirmed) {
            return;
        }

        try {
            await commentApi.deleteComment(commentId);
            alert('댓글이 삭제되었습니다.');
            setComments(comments.filter(comment => comment.commentId !== commentId));

        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // 댓글 수정
    const handleUpdateComment = async (commentId, newContent) => {
        try {
            await commentApi.updateComment(commentId, { content: newContent });
            alert('댓글이 수정되었습니다.');

            const commentResponse = await commentApi.getComments(postId);
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

export default CommentWrapper;
