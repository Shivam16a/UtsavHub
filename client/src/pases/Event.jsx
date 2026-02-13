import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5650/api/events", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setEvents(Array.isArray(data) ? data : []);
        } else {
          setError(data.message || "Failed to load events");
        }
      } catch (err) {
        setError("Network error, please try again");
      }
    };

    fetchEvents();
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">All Events</h2>
      <div className="row">
        {events.length === 0 ? (
          <p className="text-center">No events found.</p>
        ) : (
          events.map((event) => (
            <div className="col-md-6 col-lg-4 mb-4" key={event._id}>
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
