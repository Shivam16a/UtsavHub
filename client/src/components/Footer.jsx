import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Project Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold fs-3 text-warning">
              {/* <i className="fa-solid fa-calendar-check me-2 text-primary"></i> */}
              उत्सवHub
            </h5>
            <p className="text-main small">
              A smart web-based platform to manage and organize college events 
              efficiently with secure authentication and real-time tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/" className="text-decoration-none text-main">Home</a></li>
              <li><a href="/about" className="text-decoration-none text-main">About</a></li>
              <li><a href="/create" className="text-decoration-none text-main">Create Events</a></li>
              <li><a href="/contact" className="text-decoration-none text-main">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <p className="small mb-1">
              <i className="fa-solid fa-envelope me-2 text-main"></i>
              support@ems.com
            </p>
            <p className="small mb-3">
              <i className="fa-solid fa-phone me-2 text-main"></i>
              +91 98765 43210
            </p>

            <div className="social-icons">
              <a href="#" className="me-3 text-light">
                <i className="fa-brands fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="me-3 text-light">
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="me-3 text-light">
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fa-brands fa-github fa-lg"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <hr className="border-secondary" />

        <div className="text-center small text-main">
          © {new Date().getFullYear()} Event Management System | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
