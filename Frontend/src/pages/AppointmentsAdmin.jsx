import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentsAdmin.css";
import {
  FaCalendarCheck,
  FaCalendarTimes,
 
  FaTrash,
  FaSearch,
  FaFilter,
  FaTimesCircle,
} from "react-icons/fa";

const AppointmentsAdmin = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ AUTH CHECK
  useEffect(() => {
    const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");

    if (adminAuth && adminAuth.isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  // ✅ LOAD DATA
  useEffect(() => {
    if (isAuthenticated) {
      const stored = JSON.parse(localStorage.getItem("appointments") || "[]");

      // remove duplicates
      const unique = stored.filter(
        (a, i, self) =>
          i ===
          self.findIndex(
            (x) =>
              x.doctorName === a.doctorName &&
              x.appointmentDate === a.appointmentDate &&
              x.appointmentTime === a.appointmentTime &&
              x.patientEmail === a.patientEmail
          )
      );

      // sort
      unique.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );

      setAppointments(unique);
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ✅ HELPERS
  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const isExpired = (date, time) => {
    const [t, ampm] = time.split(" ");
    let [h, m] = t.split(":").map(Number);

    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    const d = new Date(date);
    d.setHours(h, m);

    return d < new Date();
  };

  const getStatusText = (status, date, time) => {
    if (status === "Visited") return "Visited";
    if (status === "Cancelled") return "Cancelled";
    if (isExpired(date, time)) return "Expired";
    return "Upcoming";
  };

  const getStatusClass = (status, date, time) => {
    const s = getStatusText(status, date, time);
    return `status-${s.toLowerCase()}`;
  };

  // ✅ FILTER
  const filteredAppointments = appointments.filter((app) => {
    const search =
      app.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const computedStatus = getStatusText(
      app.status,
      app.appointmentDate,
      app.appointmentTime
    );

    const statusMatch =
      statusFilter === "All" || computedStatus === statusFilter;

    const dateMatch =
      dateFilter === "All" || app.appointmentDate === dateFilter;

    return search && statusMatch && dateMatch;
  });

  const getUniqueDates = () =>
    [...new Set(appointments.map((a) => a.appointmentDate))];

  // ✅ ACTIONS
  const updateStatus = (id, status) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status } : a
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const deleteOne = (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setSelectedAppointment(null);
  };

  const deleteAll = () => {
    if (!window.confirm("Delete ALL appointments?")) return;

    setAppointments([]);
    localStorage.setItem("appointments", JSON.stringify([]));
    setSelectedAppointment(null);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="appointments-admin-container">
      <div className="admin-header">
        <h1>Appointments Management</h1>
        <button className="delete-all-btn" onClick={deleteAll}>
          Delete All
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="search-filter-container">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <FaFilter />
          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Upcoming</option>
            <option>Visited</option>
            <option>Cancelled</option>
            <option>Expired</option>
          </select>

          <select onChange={(e) => setDateFilter(e.target.value)}>
            <option value="All">All Dates</option>
            {getUniqueDates().map((d) => (
              <option key={d} value={d}>
                {formatDate(d)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="appointments-list">
          {filteredAppointments.map((a) => (
            <div
              key={a.id}
              className="appointment-card"
              onClick={() => setSelectedAppointment(a)}
            >
              <div>
                <h3> {a.doctorName}</h3>
                <p>{a.patientName}</p>
                <p>{formatDate(a.appointmentDate)}</p>

                <span className={`status ${getStatusClass(a.status, a.appointmentDate, a.appointmentTime)}`}>
                  {getStatusText(a.status, a.appointmentDate, a.appointmentTime)}
                </span>
              </div>

              {/* <div className="actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAppointment(a);
                  }}
                >
                  <FaEye />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOne(a.id);
                  }}
                >
                  <FaTrash />
                </button>
              // </div> */}
            </div>
          ))}
        </div>
      )}

      {/* DETAILS */}
      {selectedAppointment && (
        <div className="modal">
          <div className="modal-content">
            <h2>Appointment Details</h2>

            <p><b>Doctor:</b> {selectedAppointment.doctorName}</p>
            <p><b>Patient:</b> {selectedAppointment.patientName}</p>
            <p><b>Date:</b> {formatDate(selectedAppointment.appointmentDate)}</p>
            <p><b>Time:</b> {selectedAppointment.appointmentTime}</p>

            <div className="modal-actions">
              <button onClick={() => updateStatus(selectedAppointment.id, "Visited")}>
                <FaCalendarCheck /> Visited
              </button>

              <button onClick={() => updateStatus(selectedAppointment.id, "Cancelled")}>
                <FaCalendarTimes /> Cancel
              </button>

              <button onClick={() => deleteOne(selectedAppointment.id)}>
                <FaTrash /> Delete
              </button>

              <button onClick={() => setSelectedAppointment(null)}>
                <FaTimesCircle /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsAdmin;