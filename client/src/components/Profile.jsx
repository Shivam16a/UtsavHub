import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  //const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5650/api/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData(data);
      });

    /*fetch("http://localhost:5650/api/posts/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data));*/
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5650/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.updatedUser);
      alert("Profile Updated ✅");
    }
  };

  return (
    <div className="container mt-5 vh-100">

      {/* Profile Header */}
      <div className="row align-items-center mb-5">
        
        {/* Profile Image */}
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <img
            src={`http://localhost:5650/uploads/${user.profilepic}`}
            alt="profile"
            className="rounded-circle img-fluid"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>

        {/* Profile Info */}
        <div className="col-12 col-md-8">
          <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
            <h3 className="mb-0 text-light">{user.username}</h3>

            {/* Button trigger modal */}
            <button
              className="btn btn-outline-dark btn-sm btn-light"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="d-flex gap-4 my-3 text-light">
            {/* <span><strong>{posts.length}</strong> posts</span> */}
          </div>

          <p className="mb-1 text-light"><strong>{user.username}</strong></p>
          <p className="text-light ">Bio: <br />{user.description}</p>
        </div>
      </div>

      {/* Posts Grid */}
      {/* <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-4 mb-3">
            <div className="position-relative">
              <img
                src={`http://localhost:5650/uploads/${post.image}`}
                alt="post"
                className="img-fluid"
                style={{ height: "250px", objectFit: "cover", width: "100%" }}
              />
              <div className="position-absolute top-50 start-50 translate-middle text-white fw-bold"
                   style={{ background: "rgba(0,0,0,0.4)", padding: "5px 10px", borderRadius: "5px" }}>
                👁 {post.views}
              </div>
            </div>
          </div>
        ))}
      </div> */}

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
