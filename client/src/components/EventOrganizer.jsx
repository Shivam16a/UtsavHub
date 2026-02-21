import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const EventOrganizer = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {API} = useAuth();

  useEffect(() => {
    fetch(`${API}/api/events`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((events) => {
        // Group events by organizer
        const organizerMap = {};
        events.forEach((event) => {
          const org = event.organizer;
          if (!org) return; // skip if no organizer
          if (!organizerMap[org._id]) {
            organizerMap[org._id] = {
              name: org.username,
              email: org.email,
              events: [],
            };
          }
          organizerMap[org._id].events.push(event.title);
        });

        // Convert to array for rendering
        setOrganizers(Object.values(organizerMap));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading organizers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h3 className="text-dark">All Event Organizers</h3>
      {organizers.length === 0 ? (
        <p>No organizers found.</p>
      ) : (
        <div className="list-group">
          {organizers.map((org, idx) => (
            <div
              key={idx}
              className="list-group-item list-group-item-action mb-2 shadow-sm"
            >
              <h5>{org.name}</h5>
              <p><strong>Email:</strong> {org.email}</p>
              <p>
                <strong>Events:</strong>{" "}
                {org.events.length > 0 ? org.events.join(", ") : "No events yet"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventOrganizer;
