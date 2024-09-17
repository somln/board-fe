import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ comments, user, handleUpdateComment, handleDeleteComment }) {
    return (
        <>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <CommentItem
                        key={comment.commentId}
                        comment={comment}
                        user={user}
                        handleUpdateComment={handleUpdateComment}
                        handleDeleteComment={handleDeleteComment}
                    />
                ))
            ) : (
                <p>댓글이 없습니다.</p>
            )}
        </>
    );
}

export default CommentList;
