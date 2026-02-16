import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EventRegister = () => {
  const { id } = useParams(); // eventId from route
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await fetch(
        "http://localhost:5650/api/eventregister/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify({ eventId: id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-4">

              <h3 className="mb-3">Event Registration</h3>

              {message && (
                <div className="alert alert-success">
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <button
                onClick={handleRegister}
                disabled={loading}
                className="btn btn-primary w-100"
              >
                {loading ? "Registering..." : "Register Now"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventRegister;
