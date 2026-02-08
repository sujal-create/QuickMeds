import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AppointmentsAdmin.css";
import { FaCalendarCheck, FaCalendarTimes, FaEye, FaTrash, FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

const AppointmentsAdmin = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check admin authentication
  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");
      if (adminAuth && adminAuth.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/admin/login");
      }
    };

    checkAuth();
  }, [navigate]);

  // Load appointments from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const loadAppointments = () => {
        setLoading(true);
        // Get appointments from localStorage
        const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        
        // Sort by date (newest first)
        const sortedAppointments = storedAppointments.sort((a, b) => {
          return new Date(b.appointmentDate) - new Date(a.appointmentDate);
        });
        
        // Filter out expired appointments that are not marked as visited
        const currentDate = new Date();
        const filteredAppointments = sortedAppointments.filter(appointment => {
          const appointmentDate = new Date(appointment.appointmentDate);
          return appointment.status === "Visited" || appointmentDate >= currentDate;
        });
        
        setAppointments(filteredAppointments);
        setLoading(false);
      };
      
      loadAppointments();
    }
  }, [isAuthenticated]);

  // Get unique dates for filter
  const getUniqueDates = () => {
    const dates = [...new Set(appointments.map(app => app.appointmentDate))];
    return dates.sort((a, b) => new Date(a) - new Date(b));
  };

  // Filter appointments based on search term and filters
  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      (app.patientName && app.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.doctorName && app.doctorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.patientEmail && app.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesDate = dateFilter === "All" || app.appointmentDate === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handle appointment status change
  const handleStatusChange = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map(app => {
      if (app.id === appointmentId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    
    setAppointments(updatedAppointments);
    
    // Update localStorage
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    
    // Update selected appointment if it's the one being viewed
    if (selectedAppointment && selectedAppointment.id === appointmentId) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  // Handle appointment deletion
  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
      const updatedAppointments = appointments.filter(app => app.id !== appointmentId);
      
      setAppointments(updatedAppointments);
      
      // Update localStorage
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      
      // Close detail view if the deleted appointment was being viewed
      if (selectedAppointment && selectedAppointment.id === appointmentId) {
        setSelectedAppointment(null);
      }
    }
  };

  // Handle delete all appointments
  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete ALL appointments? This action cannot be undone.")) {
      setAppointments([]);
      localStorage.setItem("appointments", JSON.stringify([]));
      setSelectedAppointment(null);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if appointment is expired
  const isAppointmentExpired = (dateString, timeString) => {
    const [timePart, ampm] = timeString.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    
    let hour = hours;
    if (ampm === 'PM' && hours < 12) hour += 12;
    if (ampm === 'AM' && hours === 12) hour = 0;
    
    const appointmentDate = new Date(dateString);
    appointmentDate.setHours(hour, minutes, 0);
    
    return appointmentDate < new Date();
  };

  // Get status class
  const getStatusClass = (status, dateString, timeString) => {
    if (status === "Visited") return "status-visited";
    if (status === "Cancelled") return "status-cancelled";
    if (isAppointmentExpired(dateString, timeString)) return "status-expired";
    return "status-upcoming";
  };

  // Get status text
  const getStatusText = (status, dateString, timeString) => {
    if (status === "Visited") return "Visited";
    if (status === "Cancelled") return "Cancelled";
    if (isAppointmentExpired(dateString, timeString)) return "Expired";
    return "Upcoming";
  };

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="appointments-admin-container">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Appointments Management</h1>
          <p>View and manage all patient appointments</p>
        </div>
        <div className="admin-actions">
        
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="admin-dashboard">
        <div className="appointments-list-container">
          <div className="list-header">
            <div className="search-filter-container">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-container">
                <div className="filter-group">
                  <FaFilter className="filter-icon" />
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Visited">Visited</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <select 
                    value={dateFilter} 
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="All">All Dates</option>
                    {getUniqueDates().map(date => (
                      <option key={date} value={date}>{formatDate(date)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="list-actions">
              <button 
                className="delete-all-btn" 
                onClick={handleDeleteAll}
                disabled={appointments.length === 0}
              >
                Delete All
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-message">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="no-appointments">
              <p>No appointments have been booked yet.</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>No appointments match your search criteria.</p>
            </div>
          ) : (
            <div className="appointments-list">
              {filteredAppointments.map(appointment => (
                <div 
                  key={appointment.id} 
                  className={`appointment-card ${selectedAppointment && selectedAppointment.id === appointment.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    // On mobile, scroll to top when selecting an appointment
                    if (window.innerWidth <= 1200) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="appointment-card-header">
                    <div className="patient-info">
                      <h3>{appointment.patientName || "Unknown Patient"}</h3>
                      <p className="appointment-doctor">Dr. {appointment.doctorName}</p>
                    </div>
                    <div className="appointment-meta">
                      <span className={`appointment-status ${getStatusClass(appointment.status, appointment.appointmentDate, appointment.appointmentTime)}`}>
                        {getStatusText(appointment.status, appointment.appointmentDate, appointment.appointmentTime)}
                      </span>
                      <span className="appointment-date">{formatDate(appointment.appointmentDate)}</span>
                    </div>
                  </div>
                  
                  <div className="appointment-card-content">
                    <div className="appointment-details">
                      <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                      <p><strong>Email:</strong> {appointment.patientEmail || "Not provided"}</p>
                    </div>
                    
                    <div className="appointment-card-actions">
                      <button 
                        className="view-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAppointment(appointment);
                          // On mobile, scroll to top when selecting an appointment
                          if (window.innerWidth <= 1200) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                      >
                        <FaEye /> View
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAppointment(appointment.id);
                        }}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedAppointment && (
          <div className="appointment-detail">
            <div className="detail-header">
              <h2>Appointment Details</h2>
              <button 
                className="close-detail-btn"
                onClick={() => setSelectedAppointment(null)}
              >
                <FaTimesCircle />
              </button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <h3>Appointment Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Date:</strong> {formatDate(selectedAppointment.appointmentDate)}
                  </div>
                  <div className="detail-item">
                    <strong>Time:</strong> {selectedAppointment.appointmentTime}
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong> 
                    <span className={`appointment-status ${getStatusClass(selectedAppointment.status, selectedAppointment.appointmentDate, selectedAppointment.appointmentTime)}`}>
                      {getStatusText(selectedAppointment.status, selectedAppointment.appointmentDate, selectedAppointment.appointmentTime)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Booking Date:</strong> {selectedAppointment.bookingDate ? formatDate(selectedAppointment.bookingDate) : "Not recorded"}
                  </div>
                </div>
                
                <div className="status-actions">
                  <p><strong>Update Status:</strong></p>
                  <div className="status-buttons">
                    <button 
                      className={`status-btn visited ${selectedAppointment.status === 'Visited' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(selectedAppointment.id, 'Visited')}
                    >
                      <FaCalendarCheck /> Mark as Visited
                    </button>
                    <button 
                      className={`status-btn cancelled ${selectedAppointment.status === 'Cancelled' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(selectedAppointment.id, 'Cancelled')}
                    >
                      <FaCalendarTimes /> Mark as Cancelled
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Patient Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Name:</strong> {selectedAppointment.patientName || "Not provided"}
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> {selectedAppointment.patientEmail || "Not provided"}
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong> {selectedAppointment.patientPhone || "Not provided"}
                  </div>
                  {selectedAppointment.patientNotes && (
                    <div className="detail-item full-width">
                      <strong>Notes:</strong>
                      <p className="multiline-text">{selectedAppointment.patientNotes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Doctor Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Name:</strong> Dr. {selectedAppointment.doctorName}
                  </div>
                  <div className="detail-item">
                    <strong>Specialty:</strong> {selectedAppointment.doctorSpecialty || "Not specified"}
                  </div>
                  {selectedAppointment.doctorFees && (
                    <div className="detail-item">
                      <strong>Consultation Fee:</strong> ${selectedAppointment.doctorFees}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="detail-actions">
                <button 
                  className="delete-appointment-btn"
                  onClick={() => handleDeleteAppointment(selectedAppointment.id)}
                >
                  <FaTrash /> Delete Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsAdmin;
