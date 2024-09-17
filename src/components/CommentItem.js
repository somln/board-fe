import React from 'react';

function CommentItem({ comment, user, handleUpdateComment, handleDeleteComment }) {
    return (
        <div key={comment.commentId}>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <p style={{ whiteSpace: 'pre-line' }}>{comment.content}</p>
                {user.userId === comment.userId && (
                    <div>
                        <button className="btn btn-secondary btn-sm me-2" onClick={() => handleUpdateComment(comment.commentId)}>수정</button>
                        <button className="btn btn-dark btn-sm" onClick={() => handleDeleteComment(comment.commentId)}>삭제</button>
                    </div>
                )}
            </div>
            <div className="text-end text-muted small">
                작성자: {comment.username} | 작성일시: {new Date(comment.createdAt).toLocaleString()}
                {comment.isUpdated && (
                    <span className="badge bg-secondary ms-2">수정됨</span>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
