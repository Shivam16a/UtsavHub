import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ AuthContext se

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // global login function

  const [formData, setFormData] = useState({
    prn: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5650/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // ✅ Update global auth state & localStorage
      login(data.user);

      // ✅ Navigate immediately
      navigate("/");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-5 rounded-4 col-11 col-md-6 col-lg-4">
        <h2 className="text-center mb-4 fw-bold text-dark">उत्सवHub Login</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit} className="text-light">
          <div className="form-floating mb-3">
            <input
              type="text"
              name="prn"
              className="form-control bg-light text-dark border-0"
              id="prn"
              placeholder="PRN"
              autoComplete="off"
              value={formData.prn}
              onChange={handleChange}
              required
            />
            <label htmlFor="prn">PRN</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              name="password"
              className="form-control bg-light text-dark border-0"
              id="password"
              placeholder="Password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-warning text-dark w-100 fw-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-dark">
          Don't have an account?{" "}
          <Link to="/register" className="text-warning text-decoration-none">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
