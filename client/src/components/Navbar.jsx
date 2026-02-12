import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #134e5e 0%, #71b280 100%)"
      }}
    >
      <div className="container-fluid">

        {/* Brand */}
        <Link className="navbar-brand fw-bold text-warning fs-2" to="/">
          उत्सवHub
        </Link>

        {/* Toggle */}
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
          <form className="d-flex mx-auto my-3 my-lg-0 w-100 w-lg-50 justify-content-center">
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Search events..."
              style={{ maxWidth: "350px" }}
            />
            <button className="btn btn-warning text-dark fw-semibold rounded-pill" type="submit">
              Search
            </button>
          </form>

          {/* Right Side */}
          <div className="d-flex align-items-center ms-lg-auto mt-3 mt-lg-0 text-white">
            <span className="me-3 fw-semibold">Username</span>
            <button className="btn btn-outline-light btn-sm rounded-pill fw-semibold">
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
