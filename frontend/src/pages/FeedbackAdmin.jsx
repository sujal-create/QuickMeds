import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { FaStar, FaTrash, FaUser, FaCalendarAlt, FaComments, FaSearch } from 'react-icons/fa';
import './FeedbackAdmin.css';

const FeedbackAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Function to load feedback data from MongoDB
  const loadFeedbackData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback');
      const data = await response.json();

      if (data.success) {
        setFeedbacks(data.data);
      } else {
        console.error("Error loading feedback:", data.message);
        setFeedbacks([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading feedback:", error);
      setFeedbacks([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check admin authentication
    const checkAdminAuth = () => {
      // Check if this is initial app load - if so, redirect to admin login
      const isInitialLoad = !sessionStorage.getItem('appInitialized');

      if (isInitialLoad) {
        navigate("/admin/login");
        return;
      }

      const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");

      if (!adminAuth || !adminAuth.isAuthenticated) {
        // Redirect to admin login if not authenticated
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);
      loadFeedbackData();
    };

    checkAdminAuth();
  }, [navigate]);

  // Add event listener for storage changes to refresh data when new feedback is added
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userFeedback') {
        console.log('Feedback storage changed, reloading data...');
        loadFeedbackData();
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Also check for updates every 2 seconds (in case storage event doesn't fire)
    const interval = setInterval(() => {
      loadFeedbackData();
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Handle delete single feedback
  const handleDeleteFeedback = async (feedbackId) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/feedback/${feedbackId}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
          // Reload feedback data
          loadFeedbackData();
        } else {
          console.error("Error deleting feedback:", data.message);
        }
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    }
  };

  // Handle delete all feedback
  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete ALL feedback? This action cannot be undone.")) {
      try {
        const response = await fetch('http://localhost:5000/api/feedback', {
          method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
          // Reload feedback data
          loadFeedbackData();
        } else {
          console.error("Error deleting all feedback:", data.message);
        }
      } catch (error) {
        console.error("Error deleting all feedback:", error);
      }
    }
  };

  // Format date for display
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

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    );
  };

  // Don't render anything until we've checked authentication
  if (!isAdmin) {
    return null;
  }

  // Filter feedback based on search term
  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate average rating
  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  return (
    <AdminLayout title="Feedback" subtitle="Manage user feedback and ratings">
      <div className="feedback-admin-content">
        {/* Search and Actions */}
        <div className="admin-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="action-buttons">
            {feedbacks.length > 0 && (
              <button className="delete-all-btn" onClick={handleDeleteAll}>
                <FaTrash /> Delete All ({feedbacks.length})
              </button>
            )}
          </div>
        </div>

        {/* Feedback Stats */}
        <div className="stats-container">
          <div className="stat-card">
            <FaComments className="stat-icon" />
            <div className="stat-info">
              <h3>{feedbacks.length}</h3>
              <p>Total Feedback</p>
            </div>
          </div>
          <div className="stat-card">
            <FaStar className="stat-icon" />
            <div className="stat-info">
              <h3>{averageRating}</h3>
              <p>Average Rating</p>
            </div>
          </div>
          <div className="stat-card">
            <FaSearch className="stat-icon" />
            <div className="stat-info">
              <h3>{filteredFeedbacks.length}</h3>
              <p>Filtered Results</p>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading feedback...</p>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="no-data-container">
            <FaComments className="no-data-icon" />
            <h3>No Feedback Found</h3>
            <p>{feedbacks.length === 0 ? "No feedback has been received yet." : "No feedback matches your search criteria."}</p>
          </div>
        ) : (
          <div className="feedback-grid">
            {filteredFeedbacks.map((feedback) => (
              <div className="feedback-card" key={feedback._id}>
                <div className="feedback-header">
                  <div className="user-info">
                    <FaUser className="user-icon" />
                    <div>
                      <h4>{feedback.userName}</h4>
                    </div>
                  </div>
                  <div className="feedback-meta">
                    <FaCalendarAlt className="date-icon" />
                    <span className="feedback-date">{formatDate(feedback.createdAt)}</span>
                  </div>
                </div>

                <div className="feedback-body">
                  <div className="rating-section">
                    <span className="rating-label">Rating:</span>
                    {renderStars(feedback.rating)}
                    <span className="rating-value">({feedback.rating}/5)</span>
                  </div>

                  <div className="feedback-content">
                    <strong>Feedback:</strong>
                    <p>{feedback.feedback}</p>
                  </div>
                </div>

                <div className="feedback-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFeedback(feedback._id)}
                    title="Delete feedback"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default FeedbackAdmin;
