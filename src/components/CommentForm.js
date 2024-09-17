import React from 'react';

function CommentForm({ newComment, setNewComment, handleCommentSubmit }) {
    return (
        <form onSubmit={handleCommentSubmit} className="d-flex mb-5">
            <input
                type="text"
                className="form-control me-2"
                id="newComment"
                value={newComment}
                placeholder="댓글을 작성하세요."
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="btn btn-dark" style={{ minWidth: '80px' }}>작성</button>
        </form>
    );
}

export default CommentForm;