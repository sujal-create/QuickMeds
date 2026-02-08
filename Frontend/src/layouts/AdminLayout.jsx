import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
    const handleLogout = () => {
  localStorage.removeItem("adminAuth");
  localStorage.removeItem("isAdmin");
  window.location.href = "/admin/login";
};
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><NavLink to="/admin/messages">Messages</NavLink></li>
          <li><NavLink to="/admin/applications">Job Applications</NavLink></li>
          <li><NavLink to="/admin/appointments">Appointments</NavLink></li>
          <li><NavLink to="/admin/add-job">Add Job</NavLink></li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">
  Logout
</button>

      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
