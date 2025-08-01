import "./Header.css";
import { FaArrowRight, FaUserMd, FaCalendarCheck, FaHospital } from "react-icons/fa";
import HeaderVideo from "./HeaderVideo";
const Header = () => {
  return (
    <>
    <div className="header-container">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Healthcare <span>Simplified</span></h1>
          <p className="header-subtitle">Book appointments with top medical specialists in just a few clicks</p>

          <div className="header-features">
            <div className="feature-item">
              <div className="feature-icon"><FaUserMd /></div>
              <div className="feature-text">Verified Specialists</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaCalendarCheck /></div>
              <div className="feature-text">Easy Scheduling</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaHospital /></div>
              <div className="feature-text">Quality Care</div>
            </div>
          </div>

          <a href="#speciality" className="booking-btn" onClick={(e) => {
            e.preventDefault();
            document.getElementById('speciality').scrollIntoView({ behavior: 'smooth' });
          }}>
            Book Appointment <FaArrowRight className="arrow-icon" />
          </a>
        </div>

        <div className="header-right">
          <div className="image-container">
            <HeaderVideo />
          </div>
        </div>
      </div>
    </div>


    </>
  );
};

export default Header;
