import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");
  const {API} = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = query
          ? `${API}/api/events/search?query=${query}`
          : `${API}/api/events`;

        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);


        if (res.ok) {
          setEvents(Array.isArray(data) ? data : []);
        } else {
          setError(data.message || "Failed to load events");
        }
      } catch (err) {
        setError("Network error, please try again");
        console.log(err);
      }
    };

    fetchEvents();
  }, [query]); // 🔑 query add karna zaruri


  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">All Events</h2>

      {events.length === 0 ? (
        <p className="text-center">No events found.</p>
      ) : (
        <div className="d-flex flex-column align-items-center">
          {events.map((event) => (
            <div
              key={event._id}
              className="mb-4"
              style={{ width: "100%", maxWidth: "600px" }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
