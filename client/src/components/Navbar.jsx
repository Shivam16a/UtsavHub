import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearchType, setLastSearchType] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
  
    if (user?.role === "admin") {
      const searchType = query.startsWith("@") ? "users" : "events";
      setLastSearchType(searchType);
  
      if (!query) {
        if (lastSearchType === "users") navigate("/admin/users");
        else navigate("/"); 
        return;
      }
  
      if (searchType === "users") navigate(`/admin/users?search=${query.slice(1)}`);
      else navigate(`/allevent/?search=${query}`);
    } else {
      setLastSearchType("events");
      if (!query) {
        navigate("/");
        return;
      }
      navigate(`/?search=${query}`);
    }
  
    setSearchQuery("");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: "linear-gradient(90deg, #134e5e 0%, #71b280 100%)" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-warning fs-2" to="/">EventSphere</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Form */}
          <form 
            onSubmit={handleSearch} 
            className="d-flex align-items-center mx-auto my-2 my-lg-0"
            style={{ gap: "0.5rem", flexWrap: "nowrap", minWidth: "0", width: "100%", maxWidth: "400px" }}
          >
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder={user?.role === "admin" ? "Search users/events..." : "Search events..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flexGrow: 1, minWidth: "0" }}
            />
            <button
              className="btn btn-warning text-dark fw-semibold rounded-pill flex-shrink-0"
              type="submit"
            >
              {searchQuery.trim() ? "Search" : "Show All"}
            </button>
          </form>

          {/* User Info & Icons */}
          {!loading && user ? (
            <div className="d-flex flex-column align-items-center ms-auto mt-2 mt-lg-0">
              {/* User Name */}
              <span className="text-white fw-semibold fs-4 mb-1">Hii 👋 {user.username}</span>

              {/* Icons in single line */}
              <ul className="d-flex gap-3 list-unstyled mb-0 flex-nowrap">
                <li><Link to="/" className="text-white fs-5 nav-icon" title="Home"><i className="fas fa-home"></i></Link></li>
                <li><Link to="/allevent" className="text-white fs-5 nav-icon" title="All Event"><i className="fas fa-calendar-check"></i></Link></li>
                <li><Link to="/create" className="text-white fs-5 nav-icon" title="Create Event"><i className="fa-solid fa-plus"></i></Link></li>
                <li><Link to="/about" className="text-white fs-5 nav-icon" title="About Us"><i className="fas fa-address-card"></i></Link></li>
                {user.role === "admin" && <li><Link to="/admin" className="text-white fs-5 nav-icon" title="Admin"><i className="fas fa-user-shield"></i></Link></li>}
                <li><Link to="/profile" className="text-white fs-5 nav-icon" title="Profile"><i className="fa-solid fa-user"></i></Link></li>
                <li>
                  <button onClick={handleLogout} className="btn btn-outline-light btn-sm rounded-pill" title="Logout">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            !loading && (
              <div className="d-flex justify-content-center justify-content-lg-end mt-2 mt-lg-0">
                <Link className="btn btn-warning text-dark me-2 rounded-pill fw-semibold" to="/login">Login</Link>
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        .nav-icon { transition: 0.3s ease; }
        .nav-icon:hover { color: #ffc107 !important; transform: scale(1.2); }
        ul { padding-left: 0; }
        @media (max-width: 576px) {
          .navbar-brand { font-size: 1.5rem; }
          .fs-5 { font-size: 1rem !important; }
          form input { min-width: 0; }
          form { flex-wrap: nowrap; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;