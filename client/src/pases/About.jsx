import React from "react";

const About = () => {
  return (
    <div className="container py-5">
      
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">About Event Management System</h1>
        <p className="text-light">
          A complete web-based platform to manage and organize college events efficiently.
        </p>
      </div>

      {/* Overview Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="event"
            className="img-fluid rounded shadow"
            style={{ opacity: "0.9", transition: "0.4s" }}
          />
        </div>

        <div className="col-md-6">
          <h3 className="fw-semibold mb-3">
            <i className="fa-solid fa-circle-info me-2 text-primary"></i>
            Project Overview
          </h3>
          <p className="text-light">
            The Event Management System is a full-stack web application
            designed to simplify event organization and participation
            within educational institutions. It supports Admin, Organizer,
            and Participant roles for seamless coordination.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-5">
        <h3 className="fw-semibold text-center mb-4">
          <i className="fa-solid fa-rocket me-2 text-success"></i>
          Key Features
        </h3>

        <div className="row g-4">
          {[
            { icon: "fa-user-shield", text: "Secure Authentication" },
            { icon: "fa-calendar-plus", text: "Event Creation & Management" },
            { icon: "fa-ticket", text: "Online Registration" },
            { icon: "fa-chart-line", text: "Admin Analytics Dashboard" },
            { icon: "fa-bell", text: "Notifications System" },
            { icon: "fa-credit-card", text: "Payment Integration" },
          ].map((feature, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0 text-center p-4 feature-card"
                style={{
                  transition: "all 0.4s ease",
                  opacity: "0.9",
                }}
              >
                <div className="mb-3">
                  <i className={`fa-solid ${feature.icon} fa-2x text-primary`}></i>
                </div>
                <h6 className="fw-semibold">{feature.text}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center tech-card">
            <i className="fa-brands fab fa-react fa-2x text-info mb-3"></i>
            <h6>Frontend</h6>
            <p className="text-muted">React.js, Bootstrap, JavaScript</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center tech-card">
            <i className="fa-brands fa-node-js fa-2x text-success mb-3"></i>
            <h6>Backend</h6>
            <p className="text-muted">Node.js, Express.js</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center tech-card">
            <i className="fa-solid fa-database fa-2x text-warning mb-3"></i>
            <h6>Database</h6>
            <p className="text-muted">MongoDB</p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="text-center">
        <h3 className="fw-semibold mb-3">
          <i className="fa-solid fa-bullseye me-2 text-danger"></i>
          Our Vision
        </h3>
        <p className="text-light">
          Our goal is to provide a smart, user-friendly, and efficient digital
          platform that enhances event participation and simplifies management.
        </p>
      </div>

    </div>
  );
};

export default About;
