import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./Doctor.css";
import "./Appointment.css";
import { AppContext } from "./context/Appcontext";
import { FaCalendarAlt, FaClock, FaArrowLeft } from "react-icons/fa";

import { doctorsData as doctorsDataFromAssetsNew } from "../assets/assetsNew";

const Appointment = () => {
  const { DocId } = useParams();
  
  const docId = DocId;
  const [docInfo, setDocInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { doc_images } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);

    const findDoctor = () => {
      let foundDoctor = null;

      if (docId) {
        foundDoctor = doctorsDataFromAssetsNew.find(doc => String(doc._id) === String(docId));
        if (foundDoctor) return setDocInfo(foundDoctor);
      }

      if (doc_images?.doctorsData) {
        foundDoctor = doc_images.doctorsData.find(doc => String(doc._id) === String(docId));
        if (foundDoctor) return setDocInfo(foundDoctor);
      }

      if (doc_images?.Alldoctors) {
        foundDoctor = doc_images.Alldoctors.find(doc => String(doc._id) === String(docId));
        if (foundDoctor) return setDocInfo(foundDoctor);
      }

      const index = parseInt(docId);
      if (!isNaN(index)) {
        if (index >= 0 && index < doctorsDataFromAssetsNew.length) {
          foundDoctor = doctorsDataFromAssetsNew[index - 1];
          if (foundDoctor) return setDocInfo(foundDoctor);
        }

        if (doc_images?.Alldoctors && index >= 0 && index < doc_images.Alldoctors.length) {
          foundDoctor = doc_images.Alldoctors[index - 1];
          if (foundDoctor) return setDocInfo(foundDoctor);
        }
      }

      if (doc_images?.doctorsData?.length > 0) {
        foundDoctor = doc_images.doctorsData[0];
        if (foundDoctor) return setDocInfo(foundDoctor);
      }

      setDocInfo(null);
    };

    findDoctor();
    setLoading(false);
  }, [DocId, docId, doc_images]);

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth") || "null");
    if (userAuth?.isAuthenticated) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, []);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getAvailableTimeSlots = () => [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      alert("Please login to book an appointment");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your appointment");
      return;
    }

    const userAuth = JSON.parse(localStorage.getItem("userAuth") || "{}");
    const appointmentId = Date.now();

    const appointmentData = {
      id: appointmentId,
      doctorId: docInfo._id,
      doctorName: docInfo.name,
      doctorSpecialty: docInfo.specialty,
      doctorFees: docInfo.fees,
      doctorImage: docInfo.image || "",
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      bookingDate: new Date().toISOString(),
      status: "Upcoming",
      patientEmail: userAuth.email || "",
      patientName: userAuth.firstName && userAuth.lastName
        ? `${userAuth.firstName} ${userAuth.lastName}` : "",
      userId: userAuth.userId || ""
    };

    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    existingAppointments.push(appointmentData);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    setBookedAppointment(appointmentData);
    setShowConfirmation(true);
    setSelectedDate("");
    setSelectedTime("");
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setBookedAppointment(null);
  };

  return (
    <div className="appointment-container">
      {showConfirmation && bookedAppointment ? (
        <div className="appointment-confirmation">
          <h2>Appointment Pending!</h2>
          <p style={{ marginBottom: "20px", color: "red" }}>Note :- <hr />To confirm your appointment, please make the payment.</p>
          <div className="confirmation-details">
            <p><strong>Doctor:</strong> {bookedAppointment.doctorName}</p>
            <p><strong>Date:</strong> {new Date(bookedAppointment.appointmentDate).toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
            })}</p>
            <p><strong>Time:</strong> {bookedAppointment.appointmentTime}</p>
            <p><strong>Fee:</strong> ${bookedAppointment.doctorFees}</p>
            <p><strong>Appointment ID:</strong> #{bookedAppointment.id}</p>
          </div>

          <div className="confirmation-actions">
            <Link to="/my-appointments" className="view-appointments-btn">
              View My Appointments
            </Link>

            <Link
              to="/payment"
              state={{ appointmentData: bookedAppointment }}
              className="pay-now-btn"
              
            >
              Proceed to Payment
            </Link>
          </div>

          <button className="close-confirmation-btn2" onClick={closeConfirmation}>
            ✖ Close
          </button>
        </div>
      ) : (
        <>
          <div className="page-navigation">
            <Link to="/doctors" className="back-to-doctors">
              <FaArrowLeft /> Back to Doctors
            </Link>
          </div>

          {loading ? (
            <div className="loading-container"><p>Loading doctor profile...</p></div>
          ) : docInfo ? (
            <div className="doctor-profile ">
              <div className="doctor-header">
                <div className="doctor-image-container">
                  <img src={docInfo.image} alt={docInfo.name} className="doctor-image" />
                  <div className="doctor-status">
                    <span className={docInfo.available ? "status-available" : "status-unavailable"}>
                      {docInfo.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
                <div className="doctor-info">
                  <h1 className="doctor-name2">{docInfo.name}</h1>
                  <p className="doctor-specialty">{docInfo.specialty}</p>
                  <p className="doctor-degree">{docInfo.degree}</p>
                  <p className="doctor-experience">{docInfo.experience}</p>
                  {docInfo.fees && <p className="doctor-fees">Consultation Fee: ${docInfo.fees}</p>}
                </div>
              </div>

              <div className="doctor-details">
                <div className="about-section">
                  <h3 style={{ color: "#ffff" }}>About Doctor</h3>
                  <p>{docInfo.about}</p>
                </div>

                {docInfo.address && (
                  <div className="address-section">
                    <h3 style={{ color: "#ffff" }}>Address</h3>
                    <p>{docInfo.address.line1}</p>
                    <p>{docInfo.address.line2}</p>
                  </div>
                )}

                <div className="appointment-section">
                  <h3 style={{ color: "#ffff" }} className="appointment-title">Book Appointment</h3>
                  {!isAuthenticated ? (
                    <div className="login-prompt">
                      <p>Please login to book an appointment</p>
                      <Link to="/login" className="login-btns">Login</Link>
                    </div>
                  ) : (
                    <div className="booking-form2">
                      <div className="form-group" >
                        <label htmlFor="appointment-date" >
                          <FaCalendarAlt className="form-icon" /> Select Date:
                        </label>
                        <select
                          id="appointment-date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="select-input"
                        >
                          <option value="">Choose a date</option>
                          {getAvailableDates().map(date => (
                            <option key={date} value={date}>
                              {new Date(date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="appointment-time">
                          <FaClock className="form-icon" /> Select Time:
                        </label>
                        <select
                          id="appointment-time"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="select-input"
                          disabled={!selectedDate}
                        >
                          <option value="">Choose a time</option>
                          {getAvailableTimeSlots().map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        className="book-button"
                        onClick={handleBookAppointment}
                        disabled={!selectedDate || !selectedTime || !docInfo.available}
                      >
                        {docInfo.available ? "Book Appointment" : "Doctor Unavailable"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="loading-container"><p>Doctor not found</p></div>
          )}
        </>
      )}
    </div>
  );
};

export default Appointment;
