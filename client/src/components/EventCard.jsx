import React, { useState } from "react";
import CommentSection from "./CommentSection";
import {useAuth} from "../context/AuthContext";

const EventCard = ({ event }) => {
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {API} = useAuth();


  const truncateLength = 25;
  const displayedDescription =
    event.description.length > truncateLength && !showFullDesc
      ? event.description.substring(0, truncateLength) + "..."
      : event.description;

  const handleRegister = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      const res = await fetch(`${API}/api/eventregister/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventId: event._id }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eventcard" style={{boxShadow:"0px 0px 20px #D1D5D8,0px 0px 30px #D1D5D8,0px 0px 40px red"}}>
      <div className="card h-100 shadow-sm mb-4">
        {event.bannerImage && (
          <img
            src={`${API}/uploads/${event.bannerImage}`}
            className="card-img-top"
            alt={event.title}
            style={{ objectFit: "cover", height: "300px" }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text flex-grow-1">
            {displayedDescription}{" "}
            {event.description.length > truncateLength && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                style={{
                  border: "none",
                  background: "none",
                  color: "blue",
                  cursor: "pointer",
                  padding: 0,
                  fontWeight: "bold"
                }}
              >
                {showFullDesc ? "less" : "more"}
              </button>
            )}
          </p>
          <p className="mb-1"><strong>Venue:</strong> {event.venue}</p>
          <p className="mb-1">
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()} | {event.time}
          </p>
          <p className="mb-2"><strong>Organizer:</strong> {event.organizer?.username || "You"}</p>

          <div className="d-flex justify-content-between align-items-center mb-2">
            {/* Comment Icon Toggle */}
            <button
              className="btn btn-sm btn-outline-primary mb-2"
              onClick={() => setShowComments(!showComments)}
              style={{ width: "40px", height: "40px" }}
            >
              <i className={`fa ${showComments ? "fa-chevron-up" : "fa-comment"}`}></i>
            </button>


            <button
              className="btn btn-success"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
          </div>

          {message && <div className="alert alert-success py-1 my-1">{message}</div>}
          {error && <div className="alert alert-danger py-1 my-1">{error}</div>}

          {showComments && <CommentSection eventId={event._id} />}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
