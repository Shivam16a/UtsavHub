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
          <form className="d-flex  mx-auto my-3 my-lg-0 w-100 w-lg-auto justify-content-center">
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
            <div
              className="d-flex align-items-center ms-auto gap-4"
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="fw-semibold text-white fs-5 m-0">
                Hii 👋 {user.username}
              </span>
              <Link
                to="/"
                className="text-white fs-4 nav-icon"
                title="Home"
              >
                <i className="fas fa-home"></i>
              </Link>

              <Link
                to="/create"
                className="text-white fs-4 nav-icon"
                title="Create Event"
              >
                <i className="fa-solid fa-plus"></i>
              </Link>
              <Link
                to="/about"
                className="text-white fs-4 nav-icon"
                title="About Us"
              >
                <i className="fas fa-address-card"></i>
              </Link>

              {user.role === 'admin' ? (
                <Link
                  to="/admin"
                  className="text-white fs-4 nav-icon"
                  title="Admin"
                >
                  <i className="fas fa-user-shield"></i>
                </Link>
              ) : (<></>)}

              <Link
                to="/profile"
                className="text-white fs-4 nav-icon"
                title="Profile"
              >
                <i className="fa-solid fa-user"></i>
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm rounded-pill"
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
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
      <style>
        {`.nav-icon {
  transition: 0.3s ease;
}

.nav-icon:hover {
  color: #ffc107 !important;
  transform: scale(1.2);
}
`}
      </style>
    </nav>
  );
};

export default Navbar;
