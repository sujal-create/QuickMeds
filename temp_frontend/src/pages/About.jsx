import "./About.css";
import bannerImage from "../assets/Bannerimg.jpg";
import { FaCalendarCheck, FaNetworkWired } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <div className="about-title-container">
          <h1 className="about-title">ABOUT <span>US</span></h1>
          <div className="about-title-decoration left"></div>
          <div className="about-title-decoration right"></div>
        </div>
      </div>

      <div className="about-banner">
        <img src={bannerImage} alt="Healthcare Professionals" />
        <div className="about-banner-overlay"></div>
      </div>

      <div className="about-main">
        <div className="about-content">
          <p className="about-welcome">
            Welcome To QuickMeds, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently.
            At QuickMeds, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor
            Appointments And Managing Their Health Records.
          </p>
          <p className="about-mission">
            QuickMeds Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our
            Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service.
            Whether You&apos;re Booking Your First Appointment Or Managing Ongoing Care, QuickMeds Is Here To Support You
            Every Step Of The Way.
          </p>
          <h3 className="about-vision-title">Our Vision</h3>
          <p className="about-vision">
            Our Vision At QuickMeds Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The
            Gap Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When
            You Need It.
          </p>
        </div>
      </div>

      <div className="why-choose-section">
        <div className="why-choose-title-container">
          <h2 className="why-choose-title">WHY CHOOSE US</h2>
        </div>
        <div className="benefits-container">
          <div className="benefit-card">
            <div className="benefit-icon">
              <FaCalendarCheck />
            </div>
            <h3 className="benefit-title">EFFICIENCY</h3>
            <p className="benefit-description">
              Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <FaNetworkWired />
            </div>
            <h3 className="benefit-title">CONVENIENCE</h3>
            <p className="benefit-description">
              Access To A Network Of Trusted Healthcare Professionals In Your Area.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <MdHealthAndSafety />
            </div>
            <h3 className="benefit-title">PERSONALIZATION</h3>
            <p className="benefit-description">
              Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
