import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="card h-100 shadow-sm">
      {event.bannerImage && (
        <img
          src={`http://localhost:5650/uploads/${event.bannerImage}`}
          className="card-img-top"
          alt={event.title}
          style={{ objectFit: "cover", height: "200px" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text flex-grow-1">{event.description}</p>
        <p className="card-text mb-1">
          <strong>Venue:</strong> {event.venue}
        </p>
        <p className="card-text mb-1">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}{" "}
          <strong>Time:</strong> {event.time}
        </p>
        <p className="card-text mb-2">
          <strong>Organizer:</strong> {event.organizer?.username || "Unknown"}
        </p>
        <p className="card-text mb-2">
          <strong>Shares:</strong> {event.shares}
        </p>
        <Link
          to={`/event/${event._id}`}
          className="btn btn-primary mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
