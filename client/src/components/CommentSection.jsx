import React, { useEffect, useState } from "react";

const CommentSection = ({ eventId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        fetch(`http://localhost:5650/api/comments/${eventId}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => setComments(data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
        <div>
            <h3>Comments</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>

            {comments.map(comment => (
                <div key={comment._id}>
                    <p>
                        <strong>{comment.user.username}</strong>: {comment.text}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default CommentSection;
