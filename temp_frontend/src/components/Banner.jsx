import Bannerimg from "../assets/Bannerimg.jpg";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = JSON.parse(localStorage.getItem("userAuth") || "null")?.isAuthenticated;

  return (
    <div className="banner-section">
      <div className="banner-decoration decoration-1"></div>
      <div className="banner-decoration decoration-2"></div>

      <div className="banner-image">
        <img src={Bannerimg} alt="Healthcare professionals" />
      </div>

      <div className="banner-overlay"></div>

      <div className="banner-content">
        <p className="banner-subtitle">Healthcare Made Simple</p>
        <h1 className="banner-title">
          Book Appointments With <span>Trusted Specialists</span>
        </h1>
        <p className="banner-description">
          Connect with top healthcare professionals and schedule appointments with ease.
          Our platform provides access to over 500 specialists across multiple disciplines.
        </p>

        <div className="banner-buttons">
          <button
            className="banner-btn-primary"
            onClick={() => navigate("/signup")}
            disabled={isLoggedIn}
          >
            <span>Create Account</span>
            <span className="icon">→</span>
          </button>

          <button
            className="banner-btn-secondary"
            onClick={() => navigate("/doctors")}
          >
            Find Doctors
          </button>
        </div>

        <div className="banner-stats">
          <div className="banner-stat">
            <p className="banner-stat-value">500+</p>
            <p className="banner-stat-label">Specialists</p>
          </div>
          <div className="banner-stat">
            <p className="banner-stat-value">10k+</p>
            <p className="banner-stat-label">Patients</p>
          </div>
          <div className="banner-stat">
            <p className="banner-stat-value">4.9</p>
            <p className="banner-stat-label">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
