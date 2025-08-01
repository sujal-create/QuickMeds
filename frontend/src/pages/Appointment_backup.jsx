import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "./context/Appcontext";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
 
  FaAward,

  FaHeart,
  
  FaUserMd,
  FaStar,
  
} from "react-icons/fa";
import { doctorsData as doctorsDataFromAssetsNew } from "../assets/assetsNew";
import "./Appointment.css";

const Appointment = () => {
  const { DocId } = useParams();
  const docId = DocId;
  const [docInfo, setDocInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { doc_images } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    const findAndLogDoctor = () => {
      let foundDoctor = null;
      if (docId) {
        foundDoctor = doctorsDataFromAssetsNew.find(doc => String(doc._id) === String(docId))
          || doc_images?.Alldoctors?.find(doc => String(doc._id) === String(docId))
          || doc_images?.doctorsData?.find(doc => String(doc._id) === String(docId));
        if (!foundDoctor) {
          const index = parseInt(docId);
          if (!isNaN(index)) {
            foundDoctor = doctorsDataFromAssetsNew[index]
              || doc_images?.Alldoctors?.[index];
          }
        }
      }
      setDocInfo(foundDoctor);
      setLoading(false);
    };
    findAndLogDoctor();
  }, [DocId, docId, doc_images]);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const getAvailableTimeSlots = () => [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your appointment");
      return;
    }
    alert(`Appointment booked with ${docInfo.name} on ${selectedDate} at ${selectedTime}`);
  };

  return (
    <div className="appointment-container">
      <div className="page-navigation">
        <Link to="/doctors" className="back-to-doctors">
          <FaArrowLeft /> Back to Doctors
        </Link>
      </div>

      {loading ? (
        <div className="loading-container">
          <p>Loading doctor profile...</p>
        </div>
      ) : docInfo ? (
        <div className="doctor-profile">
          <div className="appointment-layout">
            {/* Left Sidebar */}
            <div className="left-sidebar">
              <div className="doctor-card">
                <div className="doctor-image-container">
                  <img src={docInfo.image} alt={docInfo.name} className="doctor-image" />
                  <div className={`doctor-status ${docInfo.available ? 'status-available' : 'status-unavailable'}`}>
                    {docInfo.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
                <div className="doctor-basic-info">
                  <h1 className="doctor2-name">{docInfo.name}</h1>
                  <p className="doctor-specialty">{docInfo.specialty}</p>
                  <p className="doctor-degree">{docInfo.degree}</p>
                  <p className="doctor-experience">{docInfo.experience}</p>
                  {docInfo.fees && <p className="doctor-fees">Consultation Fee: ${docInfo.fees}</p>}
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="quick-contact-card">
                <h3><FaPhone className="form-icon" />Quick Contact</h3>
                <div className="quick-contact-item">
                  <FaPhone className="contact-icon" />
                  <span>+91 610312515</span>
                </div>
                <div className="quick-contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>sujalrai9617@gmail.com</span>
                </div>
                <div className="quick-contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Takshila parisar Ha3 rajendranagar indore</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats-card">
                <h3><FaAward className="form-icon" />Quick Stats</h3>
                <div className="stat-item">
                  <FaUserMd className="stat-icon" />
                  <div>
                    <span className="stat-number">{docInfo.experience}</span>
                    <span className="stat-label">Experience</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FaStar className="stat-icon" />
                  <div>
                    <span className="stat-number">4.8</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FaHeart className="stat-icon" />
                  <div>
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Patients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="right-content">
              <div className="content-sections">
                <div className="about-section">
                  <h2>About Doctor</h2>
                  <p>{docInfo.about}</p>
                </div>

                {docInfo.address && (
                  <div className="address-section">
                    <h2>Address</h2>
                    <p>{docInfo.address.line1}</p>
                    <p>{docInfo.address.line2}</p>
                  </div>
                )}

                <div className="appointment-section">
                  <h2 className="appointment-title2">Book <span>Appointment</span></h2>
                  <div className="booking-form">
                    <div className="form-group">
                      <label htmlFor="appointment-date">
                        <FaCalendarAlt className="form-icon" />Select Date:
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
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "long", month: "short", day: "numeric"
                            })}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="appointment-time">
                        <FaClock className="form-icon" />Select Time:
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
                  </div>
                  <button
                    className="book-button"
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || !docInfo.available}
                  >
                    {docInfo.available ? "Book Appointment" : "Doctor Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="not-found-container">
          <p>Doctor not found.</p>
        </div>
      )}
    </div>
  );
};

export default Appointment;
