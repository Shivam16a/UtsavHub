import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container-fluid vh-100 bg-dark text-white d-flex justify-content-center align-items-center">
      <div className="text-center">

        <h1 className="display-1 fw-bold text-danger">404</h1>

        <h3 className="mb-3">Oops! Page Not Found</h3>

        <p className="text-secondary mb-4 col-md-8 mx-auto">
          The page you are looking for might have been removed, renamed,
          or is temporarily unavailable.
        </p>

        <Link to="/" className="btn btn-primary btn-lg px-4">
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default ErrorPage;
