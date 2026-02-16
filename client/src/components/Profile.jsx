import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const Profile = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile
    fetch("http://localhost:5650/api/users/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData(data);
      })
      .catch(err => console.log(err));

    // Fetch user's events
    fetch("http://localhost:5650/api/events/my", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setEvents(data);

        // Organizer: fetch registrations for each event
        if (data && data.length > 0) {
          data.forEach(async event => {
            const resReg = await fetch(
              `http://localhost:5650/api/eventregister/event/${event._id}`,
              { credentials: "include" }
            );
            const regs = await resReg.json();
            setRegistrations(prev => ({ ...prev, [event._id]: regs }));
          });
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5650/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.updatedUser);
        alert("Profile Updated ");
      } else alert(data.message || "Update failed");
    } catch (err) {
      console.log(err);
      alert("Network error ");
    }
  };

  const handleDeleteEvent = async eventId => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5650/api/events/delete/${eventId}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setEvents(events.filter(e => e._id !== eventId));
        alert("Event deleted successfully");
      } else alert(data.message || "Delete failed");
    } catch (err) {
      console.log(err);
      alert("Network error");
    }
  };

  return (
    <div className="container mt-5">
      {/* Profile Header */}
      <div className="row align-items-center mb-5">
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <img
            src={user.profilepic ? `http://localhost:5650/uploads/${user.profilepic}` : "/images/default-profile.png"}
            alt="profile"
            className="rounded-circle img-fluid"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-md-8">
          <h3 className="text-light">{user.username}</h3>
          <p className="text-light">Bio: {user.description || "No bio yet"}</p>
          <p className="text-light"><strong>{events.length}</strong> events</p>
        </div>
      </div>

      {/* User's Events */}
      <h4 className="text-light mb-3">My Events</h4>
      {loading ? (
        <p className="text-light">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-light">You haven't posted any events yet.</p>
      ) : (
        <div className="row g-3">
          {events.map(event => (
            <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="position-relative">
                <EventCard event={event} />

                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                >
                  Delete
                </button>

                {/* Organizer view: show registrations */}
                {user.role === "admin" || event.organizer === user._id ? (
                  <div className="mt-2 p-2 border rounded bg-light text-dark">
                    <strong>Registrations:</strong>
                    {registrations[event._id] && registrations[event._id].length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {registrations[event._id].map(reg => (
                          <li key={reg._id} className="list-group-item py-1">
                            <p><strong>{reg.user.username}</strong>({reg.user.prn})
                            <br /><strong>Phone:</strong>{reg.user.phone}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-0">No registrations yet</p>
                    )}
                  </div>
                ) : null}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
