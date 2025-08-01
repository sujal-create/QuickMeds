import "./Footer.css";
import logo from "../assets/quickmeds-logo.svg";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">

        {/* Logo Section */}
        <div className="footer-section about">
          <p className="logo-name">
            <img className="mylogo" src={logo} alt="Logo" />
            <span>QuickMeds</span>
          </p>
          <p style={{ backgroundColor: "rgba(33, 37, 41, 0.7)", color: "#fff", padding: "15px", borderRadius: "8px", lineHeight: "1.6" }}>
            Your trusted healthcare partner, connecting you with top doctors for
            seamless online appointments. We ensure a hassle-free experience in
            finding the right medical expert for your needs.
          </p>
        </div>

        {/* Company Section */}
        <div className="footer-section company">
          <h3 className="footer-title">Company</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>


        <div className="footer-section contact">
          <h3 className="footer-title">Get in Touch</h3>
          <p><FiPhone /> +91 7610-312515</p>
          <p><FiMail /> sujalrai9617@gmail.com</p>
        </div>
      </div>


      <div className="social-icons">
        <a href=""><div className="social-icon"><FaFacebookF /></div></a>
        <a href="https://x.com/SujalRa01188023"><div className="social-icon"><FaTwitter /></div></a>
        <a href="https://www.instagram.com/_rai_shab_sujal/"><div className="social-icon"><FaInstagram /></div></a>
        <a href="https://www.linkedin.com/in/sujal-rai-aa3079296/?original_referer=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2F&originalSubdomain=in"><div className="social-icon"><FaLinkedinIn /></div></a>
      </div>

      <div className="footer-bottom">
        <p>© 2025 QuickMeds – All Rights Reserved. | Designed with ❤️ for better healthcare</p>
      </div>
    </div>
  );
};
export default Footer;
