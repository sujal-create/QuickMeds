import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import "./AdminLayout.css";

const AdminLayout = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-layout">

      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <h2 style={{ color: "#38bdf8", fontSize: "22px", fontWeight: "600", border: "none", padding: "0", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center"
        }}>Admin Panel</h2>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>

        <h2>Admin Panel</h2>

        <ul>
          <li>
            <NavLink to="/admin/messages" onClick={() => setMenuOpen(false)}>
              Messages
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/applications" onClick={() => setMenuOpen(false)}>
              Job Applications
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/appointments" onClick={() => setMenuOpen(false)}>
              Appointments
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/add-job" onClick={() => setMenuOpen(false)}>
              Add Job
            </NavLink>
          </li>
        </ul>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>

      </aside>

      {/* Content */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;