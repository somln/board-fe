import React, { useState } from 'react';

function CommentList({ comments, user, handleUpdateComment, handleDeleteComment }) {
    
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.commentId);
        setEditContent(comment.content);
    };

    const handleSaveClick = (commentId) => {
        handleUpdateComment(commentId, editContent);
        setEditingCommentId(null);
    };

    return (
        <>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.commentId}>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            {editingCommentId === comment.commentId ? (
                                <textarea
                                    className="form-control me-2"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                            ) : (
                                <p style={{ whiteSpace: 'pre-line' }}>{comment.content}</p>
                            )}
                            {user.userId === comment.userId && (
                                <div>
                                    {editingCommentId === comment.commentId ? (
                                        <button
                                            className="btn btn-secondary btn-sm me-2"
                                            onClick={() => handleSaveClick(comment.commentId)} style={{ minWidth: '60px' }}> 저장 </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-secondary btn-sm me-2"
                                                onClick={() => handleEditClick(comment)}> 수정 </button>
                                            <button
                                                className="btn btn-dark btn-sm"
                                                onClick={() => handleDeleteComment(comment.commentId)}>삭제</button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        {editingCommentId !== comment.commentId && (
                            <div className="text-end text-muted small">
                                작성자: {comment.username} | 작성일시: {new Date(comment.createdAt).toLocaleString()}
                                {comment.isUpdated && (
                                    <span className="badge bg-secondary ms-2">수정됨</span>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>댓글이 없습니다.</p>
            )}
        </>
    );
}

export default CommentList;
