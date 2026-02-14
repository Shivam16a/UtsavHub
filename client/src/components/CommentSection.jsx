import React, { useEffect, useState } from "react";

const CommentSection = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, [eventId]); // important change

  const fetchComments = () => {
    fetch(`http://localhost:5650/api/comments/${eventId}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setComments(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    fetch(`http://localhost:5650/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(() => {
        setText("");
        fetchComments();
      });
  };

  return (
    <div className="border-top pt-2">
      <h6>Comments</h6>

      <form className="d-flex mb-2" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary btn-sm" type="submit">
          Post
        </button>
      </form>

      {comments.length === 0 && (
        <p className="text-muted">No comments yet</p>
      )}

      {comments.map(comment => (
        <div key={comment._id} className="mb-1">
          <strong>{comment.user.username}</strong>: {comment.text}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
