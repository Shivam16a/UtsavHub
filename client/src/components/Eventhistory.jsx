import React, { useEffect, useState } from "react";
import Aw1 from '../assets/aw1.jpeg'
import E1 from '../assets/e1.jpeg'
import E2 from '../assets/e2.jpeg'
import { Link } from "react-router-dom";

const MemoryEvent = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  }, []);

  return (
    <div>

      {/* ================= Banner Carousel ================= */}
      <div
        id="memoryCarousel"
        className="carousel slide m-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src={Aw1}
              className="d-block w-100 carousel-img"
              alt="banner1"
            />
          </div>

          <div className="carousel-item">
            <img
              src={E1}
              className="d-block w-100 carousel-img"
              alt="banner2"
            />
          </div>

          <div className="carousel-item">
            <img
              src={E2}
              className="d-block w-100 carousel-img"
              alt="banner3"
            />
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#memoryCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#memoryCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>


      {/* ================= Cricket Event Section ================= */}
      <div className="container my-5 py-5">
        <div className="row align-items-center">

          <div className={`col-md-6 mb-4 mb-md-0 ${animate ? "animate-left" : "hidden-left"}`}>
            <img
              src={E1}
              alt="Cricket Event"
              className="img-fluid rounded shadow section-img"
            />
          </div>

          <div className={`col-md-6 ${animate ? "animate-right" : "hidden-right"}`}>
            <h2 className="fw-bold mb-3">Cricket Championship 2025</h2>
            <p style={{ textAlign: "justify", lineHeight: "1.8" }}>
              This cricket event was a true celebration of sportsmanship,
              teamwork, and competitive spirit. Players showcased exceptional
              talent, determination, and unity throughout the tournament.
              The championship victory reflected dedication, practice, and
              collective effort, creating unforgettable memories and inspiring
              leadership, confidence, and resilience among students.
            </p>
            <button type="button" class="btn btn-primary"><Link to='/allevent' className="text-white fs-5 text-decoration-none">See All Events....</Link></button>
          </div>

        </div>
      </div>


      {/* ================= Award Event Section ================= */}
      <div className="container my-5">
        <div className="row align-items-center">

          {/* Text Left */}
          <div className={`col-md-6 mb-4 mb-md-0 ${animate ? "animate-left" : "hidden-left"}`}>
            <h2 className="fw-bold mb-3">Award Ceremony 2025</h2>
            <p style={{ textAlign: "justify", lineHeight: "1.8" }}>
              The Award Ceremony celebrated academic excellence and remarkable
              achievements of our students. Certificates were presented to
              recognize dedication, hard work, and outstanding performance.
              The event inspired motivation, pride, and a continued pursuit of
              success across all disciplines.
            </p>
          </div>

          {/* Image Right */}
          <div className={`col-md-6 ${animate ? "animate-right" : "hidden-right"}`}>
            <img
              src={Aw1}
              alt="Award Event"
              className="img-fluid rounded shadow section-img"
            />
          </div>

        </div>
      </div>


      {/* ================= Custom CSS ================= */}
      <style>
        {`
/* ===== Carousel Image Fix ===== */
.carousel-img {
  height: 70vh;
  object-fit: cover;
  border-radius: 15px;
}

@media (max-width: 768px) {
  .carousel-img {
    height: 40vh;
  }
}

/* ===== Section Image ===== */
.section-img {
  transition: transform 0.5s ease;
}

.section-img:hover {
  transform: scale(1.05);
}

/* ===== Animation ===== */
.hidden-left {
  opacity: 0;
  transform: translateX(-100px);
}

.hidden-right {
  opacity: 0;
  transform: translateX(100px);
}

.animate-left,
.animate-right {
  opacity: 1;
  transform: translateX(0);
  transition: all 1s ease-in-out;
}
`}
      </style>

    </div>
  );
};

export default MemoryEvent;