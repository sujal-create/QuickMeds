import React, { useState, useEffect } from 'react';
import './Feedback.css';
import { FaArrowLeft, FaStar, FaRegStar, FaPaperPlane } from 'react-icons/fa';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setUserName(parsed.name || parsed.email || 'Guest');
    } else {
      setUserName('Guest');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const feedbackData = {
      id: Date.now(),
      userName,
      rating,
      feedback,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    existing.push(feedbackData);
    localStorage.setItem('userFeedback', JSON.stringify(existing));

    setIsSubmitted(true);
    setTimeout(() => {
      setRating(0);
      setFeedback('');
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="feedback-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <FaArrowLeft /> Back
      </button>

      <div className="feedback-content">
        <h1>Your Feedback Matters</h1>
        <p className="feedback-subtitle">
          Help us improve our services by sharing your experience
        </p>

        {isSubmitted ? (
          <div className="feedback-success">
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="rating-container">
              <h3>How would you rate your experience?</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="star"
                  >
                    {star <= (hoverRating || rating) ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
            </div>

            <div className="feedback-input">
              <h3>Tell us more about your experience</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or concerns..."
                rows={5}
              />
            </div>

            <button type="submit" className="submit-button">
              <FaPaperPlane /> Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
