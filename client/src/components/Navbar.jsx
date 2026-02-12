import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch current user session
  useEffect(() => {
    fetch("http://localhost:5650/api/users/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5650/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #134e5e 0%, #71b280 100%)",
      }}
    >
      <div className="container-fluid">

        {/* Brand */}
        <Link className="navbar-brand fw-bold text-warning fs-2" to="/">
          उत्सवHub
        </Link>

        {/* Toggle Button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Center Search */}
          <form className="d-flex mx-auto my-3 my-lg-0 w-100 w-lg-auto justify-content-center">
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Search events..."
              style={{ maxWidth: "350px" }}
            />
            <button
              className="btn btn-warning text-dark fw-semibold rounded-pill"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Right Side: User logged in */}
          {user ? (
            <div className="d-flex flex-column flex-lg-row align-items-center ms-lg-auto text-center text-lg-start">
              <span className="me-lg-3 fw-semibold text-white fs-4" style={{ whiteSpace: "nowrap" }}>Hii 👋🏿 {user.username}</span>
              <button
                className="btn btn-outline-light btn-sm rounded-pill fw-semibold mt-2 mt-lg-0"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

          ) : (
            // Right Side: Not logged in
            <div className="ms-lg-auto mt-3 mt-lg-0">
              <Link
                className="btn btn-warning text-dark me-2 rounded-pill fw-semibold"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
