import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const Profile = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile
    fetch("http://localhost:5650/api/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData(data);
      })
      .catch((err) => console.log(err));

    // Fetch user's events
    fetch("http://localhost:5650/api/events/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5650/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.updatedUser);
        alert("Profile Updated ");
      } else {
        alert(data.message || "Update failed ");
      }
    } catch (err) {
      console.log(err);
      alert("Network error ");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5650/api/events/delete/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        // UI se turant remove karega
        setEvents(events.filter((event) => event._id !== eventId));
        alert("Event deleted successfully");
      } else {
        alert(data.message || "Delete failed");
      }
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
            src={
              user.profilepic
                ? `http://localhost:5650/uploads/${user.profilepic}`
                : ""
            }
            alt="profile"
            className="rounded-circle img-fluid"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-md-8">
          <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
            <h3 className="mb-0 text-light">{user.username}</h3>
            <button
              className="btn btn-outline-light btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Edit Profile
            </button>
          </div>
          <div className="d-flex gap-4 my-3 text-light flex-wrap">
            <span>
              <strong>{events.length}</strong> events
            </span>
          </div>
          <p className="mb-1 text-light"><strong>{user.username}</strong></p>
          <p className="text-light">
            Bio: <br />{user.description || "No bio yet"}
          </p>
        </div>
      </div>

      {/* User's Events Grid */}
      <h4 className="text-light mb-3">My Events</h4>
      {loading ? (
        <p className="text-light">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-light">You haven't posted any events yet.</p>
      ) : (
        <div className="row g-3">
          {events.map((event) => (
            <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="position-relative">
                <EventCard event={event} />

                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* Bootstrap Modal */}
      <div className="modal fade" id="editProfileModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
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
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
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
