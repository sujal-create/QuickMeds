import { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import GoogleMap from "../components/GoogleMap";
// Not using an image import, will use CSS for contact illustration
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to save messages to localStorage
  const saveMessageToLocalStorage = (messageData) => {
    // Get existing messages or initialize empty array
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

    // Add timestamp to the message
    const messageWithTimestamp = {
      ...messageData,
      id: Date.now(), // Unique ID based on timestamp
      timestamp: new Date().toISOString(),
    };

    // Add new message to array
    existingMessages.push(messageWithTimestamp);

    // Save back to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    return messageWithTimestamp;
  };

  // Function to get all messages from localStorage
  const getMessagesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('contactMessages') || '[]');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    // Simulate form submission and save to localStorage
    setTimeout(() => {
      try {
        // Save message to localStorage
        const savedMessage = saveMessageToLocalStorage(formData);
        console.log('Message saved to localStorage:', savedMessage);
        console.log('All messages:', getMessagesFromLocalStorage());

        setFormStatus({
          submitted: true,
          success: true,
          message: "Your message has been sent successfully! We'll get back to you soon.",
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Reset form status after 5 seconds
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            success: false,
            message: "",
          });
        }, 5000);
      } catch (error) {
        console.error('Error saving message:', error);
        setFormStatus({
          submitted: true,
          success: false,
          message: "There was an error saving your message. Please try again.",
        });
      }
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <div className="contact-title-container">
          <h1 className="contact-title">CONTACT <span>US</span></h1>
          <div className="contact-title-decoration left"></div>
          <div className="contact-title-decoration right"></div>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-illustration">
          <div className="illustration-icon">
            <FaEnvelope />
          </div>
          <div className="illustration-text">
            <h3>Get In Touch</h3>
            <p>We&apos;re here to help! Feel free to reach out with any questions or concerns.</p>
          </div>
        </div>

        <div className="contact-info-form">
          <div className="contact-form-container">
            <div className="contact-info">
            <h3>OUR OFFICE</h3>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-info-text">
                <h4>Address</h4>
                <p>Takshila Parisar HA3, Rajendranagar, Indore</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <FaPhoneAlt />
              </div>
              <div className="contact-info-text">
                <h4>Phone</h4>
                <p>91+ 7610312515</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <FaEnvelope />
              </div>
              <div className="contact-info-text">
                <h4>Email</h4>
                <p>sujalrai9617@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <FaClock />
              </div>
              <div className="contact-info-text">
                <h4>Working Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>SEND US A MESSAGE</h3>

            {formStatus.submitted && (
              <div className={formStatus.success ? "form-success" : "form-error"}>
                {formStatus.success ? <FaCheckCircle /> : <FaExclamationCircle />}
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group2">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control2"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group2">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control2"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group2">
                <label htmlFor="phone">Your Phone</label>
               <input
  type="tel"
  id="phone"
  name="phone"
  className="form-control2"
  value={formData.phone}
  onChange={(e) => {
    const input = e.target.value;
    // Allow only digits and limit to 10 characters
    if (/^\d{0,10}$/.test(input)) {
      setFormData({ ...formData, phone: input });
    }
  }}
  placeholder="+91 XXXXX XXXXX"
/>

              </div>
              <div className="form-group2">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control2"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group2">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>

    <div className="map-section">
  <div className="map-container" style={{ marginTop: "2rem" }}>
    <GoogleMap
      center={{ lat: 22.6689, lng: 75.8298 }}
      markers={[
        {
          position: { lat: 22.6689, lng: 75.8298 },
          title: "Takshila Parisar, Indore",
          infoWindow: "<div>Takshila Parisar, Rajendra Nagar, Indore</div>",
        }
      ]}
    />
  </div>
</div>


      <div className="careers-section">
        <h3>CAREERS AT QUICKMEDS</h3>
        <p>
          Join our team of dedicated healthcare professionals and make a difference in people&apos;s lives.
          Explore opportunities to grow with us and be part of our mission to provide quality healthcare.
        </p>
        <Link to="/careers" className="careers-btn">
          Explore Jobs
        </Link>
      </div>
    </div>
  );
};

export default Contact;