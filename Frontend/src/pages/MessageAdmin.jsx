import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Contact.css";

const MessageAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const checkAdminAuth = () => {
      const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");

      if (!adminAuth || !adminAuth.isAuthenticated) {
        // Redirect to admin login if not authenticated
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);

      // Load messages from localStorage
      try {
        const storedMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
        setMessages(storedMessages);
        setLoading(false);
      } catch (error) {
        console.error("Error loading messages:", error);
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, [navigate]);

  const handleDeleteMessage = (id) => {
    try {
      // Filter out the message with the given id
      const updatedMessages = messages.filter((message) => message.id !== id);

      // Update localStorage
      localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));

      // Update state
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all messages?")) {
      try {
        // Clear messages from localStorage
        localStorage.removeItem("contactMessages");

        // Update state
        setMessages([]);
      } catch (error) {
        console.error("Error deleting all messages:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLogout = () => {
    // Remove admin authentication
    localStorage.removeItem("adminAuth");
    // Redirect to admin login
    navigate("/admin/login");
  };

  // Don't render anything until we've checked authentication
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="contact-container">
      <div className="contact-header">
        <div className="contact-title-container">
          <h1 className="contact-title">MESSAGE <span>ADMIN</span></h1>
          <div className="contact-title-decoration left"></div>
          <div className="contact-title-decoration right"></div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-header">
          <h2>Contact Form Messages</h2>
          <div className="admin-actions">
           
            {messages.length > 0 && (
              <button className="delete-all-btn" onClick={handleDeleteAll}>
                Delete All
              </button>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-message">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="no-messages">No messages found.</div>
        ) : (
          <div className="message-list">
            {messages.map((message) => (
              <div className="message-card" key={message.id}>
                <div className="message-header">
                  <div className="message-info">
                    <h3>{message.name}</h3>
                    <p className="message-date">{formatDate(message.timestamp)}</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="message-details">
                  <p><strong>Email:</strong> {message.email}</p>
                  {message.phone && <p><strong>Phone:</strong> {message.phone}</p>}
                  {message.subject && <p><strong>Subject:</strong> {message.subject}</p>}
                  <div className="message-content">
                    <p><strong>Message:</strong></p>
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageAdmin;
