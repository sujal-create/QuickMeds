import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AdminLayout.css';
import { FaSignOutAlt, FaEnvelope, FaBriefcase, FaCalendarCheck, FaComments } from 'react-icons/fa';

const AdminLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem("adminAuth");
      navigate("/admin/login");
    }
  };

  const navItems = [
    {
      path: '/admin/messages',
      icon: <FaEnvelope />,
      label: 'Messages',
      description: 'Contact form messages'
    },
    {
      path: '/admin/appointments',
      icon: <FaCalendarCheck />,
      label: 'Appointments',
      description: 'Patient appointments'
    },
    {
      path: '/admin/applications',
      icon: <FaBriefcase />,
      label: 'Applications',
      description: 'Job applications'
    },
    {
      path: '/admin/feedback',
      icon: <FaComments />,
      label: 'Feedback',
      description: 'User feedback'
    }
  ];

  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title-section">
            <h1 className="admin-main-title">QuickMeds Admin Panel</h1>
            <div className="admin-breadcrumb">
              <span className="breadcrumb-home">Admin</span>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">{title}</span>
            </div>
          </div>
          
          <div className="admin-header-actions">
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="admin-nav">
        <div className="admin-nav-content">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <div className="nav-item-icon">{item.icon}</div>
              <div className="nav-item-content">
                <span className="nav-item-label">{item.label}</span>
                <span className="nav-item-description">{item.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main className="admin-main">
        <div className="admin-content">
          <div className="page-header">
            <h2 className="page-title">{title}</h2>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          
          <div className="page-content">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
