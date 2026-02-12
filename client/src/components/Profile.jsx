import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5650/api/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData(data);
      });
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
      if (!res.ok) throw new Error(data.message);
      setUser(data.updatedUser);
      setEdit(false);
      alert("Profile updated ✅");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Profile</h2>
      {!edit ? (
        <div className="card p-4 shadow">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>PRN:</strong> {user.prn}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button className="btn btn-primary mt-3" onClick={() => setEdit(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="card p-4 shadow" onSubmit={handleUpdate}>
          {["username", "email", "prn", "phone"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                className="form-control"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <button className="btn btn-success me-2" type="submit">Save</button>
          <button className="btn btn-secondary" type="button" onClick={() => setEdit(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
