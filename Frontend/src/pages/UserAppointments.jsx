import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./UserAppointments.css";
import { FaCalendarTimes, FaArrowLeft, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import UserAvatar from "../components/UserAvatar";

const UserAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const userAuth = JSON.parse(localStorage.getItem("userAuth") || "null");
      if (userAuth && userAuth.isAuthenticated) {
        setIsAuthenticated(true);
        setUserInfo(userAuth);
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated && userInfo) {
      setLoading(true);
      const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      const userAppointments = allAppointments.filter(app =>
        app.userId === userInfo.userId || app.patientEmail === userInfo.email
      );
      const sortedAppointments = userAppointments.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
      setAppointments(sortedAppointments);
      setLoading(false);
    }
  }, [isAuthenticated, userInfo]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

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

  const getStatusClass = (status, dateString, timeString) => {
    if (status === "Visited") return "status-visited";
    if (status === "Cancelled") return "status-cancelled";
    if (isAppointmentExpired(dateString, timeString)) return "status-expired";
    return "status-upcoming";
  };

  const getStatusText = (status, dateString, timeString) => {
    if (status === "Visited") return "Visited";
    if (status === "Cancelled") return "Cancelled";
    if (isAppointmentExpired(dateString, timeString)) return "Expired";
    return "Upcoming";
  };

  const handleCancelClick = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setAppointmentToCancel(null);
  };

  const handleCancelAppointment = () => {
    if (!appointmentToCancel) return;
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const updatedAppointments = allAppointments.map(app => app.id === appointmentToCancel.id ? { ...app, status: "Cancelled" } : app);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    const filtered = updatedAppointments.filter(app =>
      app.userId === userInfo.userId || app.patientEmail === userInfo.email
    );
    setAppointments(filtered);
    if (selectedAppointment && selectedAppointment.id === appointmentToCancel.id) {
      setSelectedAppointment({ ...selectedAppointment, status: "Cancelled" });
    }
    handleCloseCancelModal();
  };

  if (!isAuthenticated) return null;

  return (
    <div className="user-appointments-container">
      <div className="page-header">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="appointments-content">
        {loading ? (
          <div className="loading-message">Loading your appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="no-appointments">
            <div className="no-data-message">
              <FaInfoCircle className="info-icon" />
              <h3>No Appointments Found</h3>
              <p>You haven't booked any appointments yet.</p>
              <Link to="/doctor" className="book-now-btn">Book an Appointment Now</Link>
            </div>
          </div>
        ) : selectedAppointment ? (
          <div className="appointment-detail">
            <div className="detail-header">
              <h2>Appointment Details</h2>
              <button className="close-detail-btn" onClick={() => setSelectedAppointment(null)}>X</button>
            </div>

            <div className="detail-content">
              <div className="doctor-profile">
                <UserAvatar name={selectedAppointment.doctorName} size={60} />
                <div className="doctor-info-large">
                  <h3>{selectedAppointment.doctorName}</h3>
                  <p>{selectedAppointment.doctorSpecialty || "Specialist"}</p>
                </div>
              </div>

              <div className="appointment-status">
                <div className="status-label">Status:</div>
                <div className={`status-value ${getStatusClass(selectedAppointment.status, selectedAppointment.appointmentDate, selectedAppointment.appointmentTime)}`}>
                  {getStatusText(selectedAppointment.status, selectedAppointment.appointmentDate, selectedAppointment.appointmentTime)}
                </div>
              </div>

              <div className="detail-section">
                <h4>Appointment Information</h4>
                <div className="detail-grid">
                  <div className="detail-item"><strong>ID:</strong> #{selectedAppointment.id}</div>
                  <div className="detail-item"><strong>Date:</strong> {formatDate(selectedAppointment.appointmentDate)}</div>
                  <div className="detail-item"><strong>Time:</strong> {selectedAppointment.appointmentTime}</div>
                  <div className="detail-item"><strong>Booking Date:</strong> {selectedAppointment.bookingDate ? formatDate(selectedAppointment.bookingDate) : "N/A"}</div>
                  {selectedAppointment.doctorFees && <div className="detail-item"><strong>Consultation Fee:</strong> ${selectedAppointment.doctorFees}</div>}
                </div>
              </div>

              {(selectedAppointment.status === "Upcoming" && !isAppointmentExpired(selectedAppointment.appointmentDate, selectedAppointment.appointmentTime)) ? (
                <div className="detail-actions">
                  <button className="action-btn secondary" onClick={() => handleCancelClick(selectedAppointment)}>
                    <FaCalendarTimes /> Cancel Appointment
                  </button>
                  <Link to="/doctor" className="action-btn primary">Book Another Appointment</Link>
                </div>
              ) : (
                <div className="detail-actions">
                  <Link to="/doctor" className="action-btn primary">Book New Appointment</Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="appointments-list">
            <h2>Your Appointments ({appointments.length})</h2>
            {appointments.map(appointment => (
              <div 
                key={appointment.id}
                className="appointment-card"
                onClick={() => setSelectedAppointment(appointment)}
              >
                <div className="appointment-card-header">
                  <div className="doctor-info">
                    <UserAvatar name={appointment.doctorName} />
                    <div>
                      <h3>{appointment.doctorName}</h3>
                      <p className="doctor-specialty">{appointment.doctorSpecialty || "Specialist"}</p>
                    </div>
                  </div>
                  <div className="appointment-status-badge">
                    <span className={getStatusClass(appointment.status, appointment.appointmentDate, appointment.appointmentTime)}>
                      {getStatusText(appointment.status, appointment.appointmentDate, appointment.appointmentTime)}
                    </span>
                  </div>
                </div>

                <div className="appointment-details">
                  <div className="detail-item"><strong>ID:</strong> #{appointment.id}</div>
                  <div className="detail-item"><strong>Date:</strong> {formatDate(appointment.appointmentDate)}</div>
                  <div className="detail-item"><strong>Time:</strong> {appointment.appointmentTime}</div>
                  {appointment.doctorFees && <div className="detail-item"><strong>Fee:</strong> ${appointment.doctorFees}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCancelModal && appointmentToCancel && (
        <div className="modal-overlay">
          <div className="cancel-modal">
            <div className="cancel-modal-header">
              <FaExclamationTriangle className="warning-icon" />
              <h3>Cancel Appointment</h3>
            </div>
            <div className="cancel-modal-content">
              <p>Are you sure you want to cancel your appointment with Dr. {appointmentToCancel.doctorName} on {formatDate(appointmentToCancel.appointmentDate)} at {appointmentToCancel.appointmentTime}?</p>
              <p className="cancel-warning">This action cannot be undone.</p>
            </div>
            <div className="cancel-modal-actions">
              <button className="cancel-btn confirm" onClick={handleCancelAppointment}>
                Yes, Cancel Appointment
              </button>
              <button className="cancel-btn reject" onClick={handleCloseCancelModal}>
                No, Keep Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
