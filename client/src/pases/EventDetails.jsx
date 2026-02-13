import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://localhost:5650/api/events/${id}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setEvent(data);
      } else {
        setError(data.message || "Failed to load event");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!event) return <h2 className="text-center py-5">Loading...</h2>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            {event.bannerImage && (
              <img
                src={`http://localhost:5650/uploads/${event.bannerImage}`}
                className="card-img-top"
                alt={event.title}
              />
            )}
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>
              <p className="card-text">{event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}{" "}
                <strong>Time:</strong> {event.time}
              </p>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
              <p>
                <strong>Organizer:</strong>{" "}
                {event.organizer?.username || "Unknown"}
              </p>
              {/* Comment Section */}
              <CommentSection eventId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
