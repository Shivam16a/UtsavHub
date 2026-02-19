import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import {useAuth} from "../context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const {API} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user
        const resUser = await fetch(
          `${API}/api/users/me`,
          { credentials: "include" }
        );
        const userData = await resUser.json();
        setUser(userData);
        setFormData(userData);

        // Fetch events
        const resEvents = await fetch(
          `${API}/api/events/my`,
          { credentials: "include" }
        );
        const eventData = await resEvents.json();
        setEvents(eventData);

        // Fetch registrations
        if (eventData && eventData.length > 0) {
          for (const event of eventData) {
            const resReg = await fetch(
              `${API}/api/eventregister/event/${event._id}`,
              { credentials: "include" }
            );
            const regs = await resReg.json();
            setRegistrations(prev => ({
              ...prev,
              [event._id]: regs
            }));
          }
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ================= HANDLE UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API}/api/users/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUser(data.updatedUser);
        setEditMode(false);
        alert("Profile Updated Successfully ");
      } else {
        alert(data.message || "Update failed");
      }

    } catch (err) {
      console.log(err);
      alert("Network error ");
    }
  };

  // ================= DELETE EVENT =================
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(
        `${API}/api/events/delete/${eventId}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      if (res.ok) {
        setEvents(prev => prev.filter(e => e._id !== eventId));
        alert("Event deleted successfully");
      }

    } catch (err) {
      console.log(err);
      alert("Network error");
    }
  };

  if (loading) {
    return <p className="text-light mt-5 text-center">Loading...</p>;
  }

  return (
    <div className="container mt-5">

      {/* ================= PROFILE HEADER ================= */}
      <div className="row align-items-center mb-4">
        <div className="col-md-4 text-center">
          <img
            src={
              user.profilepic
                ? `${API}/uploads/${user.profilepic}`
                : "/images/default-profile.png"
            }
            alt="profile"
            className="rounded-circle img-fluid"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
        </div>

        <div className="col-md-8">

          <div className="d-flex align-items-center gap-3">
            <h3 className="text-light mb-0">{user.username}</h3>

            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Update Profile"}
            </button>
          </div>

          <p className="text-light mt-2">
            Bio: {user.description || "No bio yet"}
          </p>

          <p className="text-light">
            <strong>{events.length}</strong> events
          </p>
        </div>
      </div>

      {/* ================= UPDATE FORM ================= */}
      {editMode && (
        <div className="card p-3 mb-4">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Bio</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* ================= USER EVENTS ================= */}
      <h4 className="text-light mb-3">My Events</h4>

      {events.length === 0 ? (
        <p className="text-light">
          You haven't posted any events yet.
        </p>
      ) : (
        <div className="row g-3">
          {events.map(event => (
            <div key={event._id} className="col-md-4">
              <div className="position-relative">
                <EventCard event={event} />

                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                >
                  Delete
                </button>

                {(user.role === "admin" ||
                  event.organizer === user._id) && (
                  <div className="mt-2 p-2 border rounded bg-light text-dark">
                    <strong>Registrations:</strong>

                    {registrations[event._id]?.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {registrations[event._id].map(reg => (
                          <li key={reg._id} className="list-group-item">
                            <strong>{reg.user.username} :</strong> ({reg.user.prn}) <br />
                            <strong>Phone : </strong> {reg.user.phone}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No registrations yet</p>
                    )}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Profile;
