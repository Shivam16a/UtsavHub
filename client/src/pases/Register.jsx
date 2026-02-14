import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    prn: "",
    phone: "",
    gender: "",
    description: "",
    password: "",
  });

  const [profilePicFile, setProfilePicFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formPayload = new FormData();

      // Form fields append karo FormData me
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      // File append karo agar select kiya ho to
      if (profilePicFile) {
        formPayload.append("profilepic", profilePicFile);
      }

      const res = await fetch("http://localhost:5650/api/users/register", {
        method: "POST",
        body: formPayload, // Content-Type nahi dena, browser set karega multipart/form-data
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 px-3"
    >
      <div className="card p-4 rounded-4 shadow-lg col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h2 className="text-center mb-4 fw-bold text-dark">उत्सवHub Register</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label text-dark">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">PRN</label>
            <input
              type="text"
              name="prn"
              className="form-control"
              autoComplete="off"
              value={formData.prn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              autoComplete="off"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Profile Picture</label>
            <input
              type="file"
              name="profilepic"
              className="form-control"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Tell something about yourself (optional)"
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-dark">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-dark w-100 fw-bold" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3 text-dark">
          Already have an account?{" "}
          <Link to={"/login"} className="text-dark fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
