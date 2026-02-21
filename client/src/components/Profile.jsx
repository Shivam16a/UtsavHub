import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import {useAuth} from '../context/AuthContext'

const Profile = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const {API} = useAuth();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/users/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.updatedUser);
        alert("Profile Updated!");
        // Close modal programmatically
        const modalEl = document.getElementById("editProfileModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      } else alert(data.message || "Update failed");
    } catch (err) {
      console.log(err);
      alert("Network error");
    }
  };

  const handleDeleteEvent = async eventId => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/api/events/delete/${eventId}`, {
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

  useEffect(() => {
    // Fetch user profile
    fetch(`${API}/api/users/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData(data);
      })
      .catch(err => console.log(err));

    // Fetch user's events
    fetch(`${API}/api/events/my`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        // Organizer: fetch registrations for each event
        if (data && data.length > 0) {
          data.forEach(async event => {
            const resReg = await fetch(
              `${API}/api/eventregister/event/${event._id}`,
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

  return (
    <div className="container mt-5">

      {/* ================= PROFILE HEADER ================= */}
      <div className="row align-items-center mb-5">
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <img
            src={user.profilepic ? `${API}/uploads/${user.profilepic}` : "/images/default-profile.png"}
            alt="profile"
            className="rounded-circle img-fluid"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
        </div>

        <div className="col-12 col-md-8">
          <div className="d-flex align-items-center mb-2">
            <h3 className="text-light mb-0 me-2">{user.username}</h3>
            <button
              className="btn btn-outline-light btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
          <p className="text-light">Bio: {user.description || "No bio yet"}</p>
          <p className="text-light"><strong>{events.length}</strong> events</p>
        </div>
      </div>

      {/* ================= USER EVENTS ================= */}
      <h4 className="text-light mb-3">My Events</h4>
      {loading ? (
        <p className="text-light">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-light">You haven't posted any events yet.</p>
      ) : (
        <div className="row g-3">
          {Array.isArray(events) && events.map(event => (
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
                {(user.role === "admin" || event.organizer === user._id) && (
                  <div className="mt-2 p-2 border rounded bg-light text-dark">
                    <strong>Registrations:</strong>
                    {registrations[event._id] && registrations[event._id].length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {registrations[event._id].map(reg => (
                          <li key={reg._id} className="list-group-item py-1">
                            <p>
                              <strong>{reg.user.username}</strong> ({reg.user.prn})
                              <br /><strong>Phone:</strong> {reg.user.phone}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-0">No registrations yet</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= EDIT PROFILE MODAL ================= */}
      <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title" id="editProfileModalLabel">
                  <i className="fa-solid fa-user-pen me-2"></i>
                  Edit Profile
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    rows={3}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-floppy-disk me-2"></i> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;