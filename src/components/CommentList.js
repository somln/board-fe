import React, { useState } from 'react';

function CommentList({ comments, user, handleUpdateComment, handleDeleteComment }) {
    
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    //댓글 수정 버튼 클릭 시 해당 댓글 아이디, 내용 저장
    const handleEditClick = (comment) => {
        setEditingCommentId(comment.commentId);
        setEditContent(comment.content);
    };

    //수정 후 저장 버튼 클릭 시 수정 api 호출 후, 수정 댓글 아이디 null값으로
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
                            {editingCommentId === comment.commentId ? (  //수정할 댓글일 경우 form으로
                                <textarea
                                    className="form-control me-2"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                            ) : ( //그렇지 않으면 댓글 내용 출력
                                <p style={{ whiteSpace: 'pre-line' }}>{comment.content}</p>
                            )}
                            {user.userId === comment.userId && (
                                <div>
                                    {editingCommentId === comment.commentId ? (
                                        <button  //댓글 수정 모드일 경우 저장 버튼
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
            ) : (  //comments가 null값일 경우
                <p>댓글이 없습니다.</p>
            )}
        </>
    );
}

export default CommentList;
