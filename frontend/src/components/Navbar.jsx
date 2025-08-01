import { NavLink, useNavigate, Link } from "react-router-dom";
import logo from "../assets/quickmeds-logo.svg";
import "./Navbar.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { dispatchAuthEvent } from "../utils/authEvents";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);

  // Check authentication status on component mount and when it changes
  useEffect(() => {
    const checkAuth = () => {
      const userAuth = JSON.parse(localStorage.getItem("userAuth") || "null");
      const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");

      if (userAuth && userAuth.isAuthenticated) {
        setIsAuthenticated(true);
        // Use first name and last name if available, otherwise use email
        if (userAuth.firstName && userAuth.lastName) {
          setUserName(`${userAuth.firstName} ${userAuth.lastName}`);
        } else {
          setUserName(userAuth.email || "");
        }
      } else if (adminAuth && adminAuth.isAuthenticated) {
        setIsAuthenticated(true);
        setUserName("Admin");
      } else {
        setIsAuthenticated(false);
        setUserName("");
      }
    };

    // Check auth on mount
    checkAuth();

    // Set up event listeners for auth changes
    window.addEventListener('storage', checkAuth); // For changes in other tabs
    window.addEventListener('authChange', checkAuth); // For changes in current tab

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Remove both user and admin authentication
    localStorage.removeItem("userAuth");
    localStorage.removeItem("adminAuth");

    // Update local state
    setIsAuthenticated(false);
    setUserName("");
    setShowMenu(false);

    // Dispatch auth event to update any other components
    dispatchAuthEvent();

    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div onClick={()=>navigate("/")} className="logo-name">
        <img className="mylogo" src={logo} alt="Logo" />
        <span>QuickMeds</span>
      </div>

      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
        style={{ cursor: 'pointer' }}
      >
        {mobileMenuOpen ?
          <FaTimes size={22} style={{ pointerEvents: 'none' }} /> :
          <FaBars size={22} style={{ pointerEvents: 'none' }} />
        }
      </button>

      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          <li>HOME</li>
          <hr />
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          <li>DOCTORS</li>
          <hr />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          <li>ABOUT</li>
          <hr />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileMenuOpen(false)}
        >
          <li>CONTACT</li>
          <hr />
        </NavLink>
      </ul>


      <div className="dropdown" ref={dropdownRef}>
        {isAuthenticated ? (
          <div className="user-info" onClick={() => setShowMenu(!showMenu)}>
            <UserAvatar name={userName} />
            <span className="user-email">{userName}</span>
            <RiArrowDropDownLine
              className={`dropdown-icon ${showMenu ? 'rotate' : ''}`}
              size={24}
            />
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </div>
        )}


        {showMenu && isAuthenticated && (
          <div className="dropdown-content">
            <Link to="/my-appointments" className="dropdown-item">
              <span>My Appointments</span>
            </Link>
            <Link to="/feedback" className="dropdown-item">
              <span>Feedback</span>
            </Link>
            <div className="dropdown-divider"></div>
            <p onClick={handleLogout} className="dropdown-item">
              <span style={{color:"red"}}>Logout</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
