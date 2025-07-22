import React, { useState } from 'react';
import { Send, Star, MessageSquare } from 'lucide-react'; 
import '../styles/feedbackpage.css'; 

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    category: 'Service',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderStars = (currentRating, isClickable = false, onStarClick = () => {}) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={24}
          className={`star-icon ${i <= currentRating ? 'filled' : ''} ${isClickable ? 'clickable' : ''}`}
          onClick={() => isClickable && onStarClick(i)}
          fill={i <= currentRating ? '#ffc107' : 'none'} 
          stroke={i <= currentRating ? '#ffc107' : '#888'} 
        />
      );
    }
    return <div className="stars-container">{stars}</div>;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitStatus(null); 

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        rating: 0,
        category: 'Service',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="feedback-form-container">
      <div className="form-header">
        <MessageSquare className="form-icon" size={48} />
        <h2 className="form-title">Share Your Feedback</h2>
        <p className="form-subtitle">Your opinion matters to us. Help us improve our services.</p>
      </div>

      <div className="form-fields-grid">
        <div className="form-field">
          <label className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">
          Rating *
        </label>
        <div className="rating-input-group">
          {renderStars(formData.rating, true, (rating) => 
            handleInputChange({ target: { name: 'rating', value: rating } })
          )}
          <span className="rating-display">
            {formData.rating}/5
          </span>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">
          Category *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="form-select"
        >
          <option value="Service">Service</option>
          <option value="Product">Product</option>
          <option value="Support">Support</option>
          <option value="Website">Website</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="4"
          className="form-textarea"
          placeholder="Tell us more about your experience..."
        />
      </div>

      {submitStatus === 'success' && (
        <div className="submit-status-success">
          Thank you for your feedback! We appreciate your input.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="submit-status-error">
          There was an error submitting your feedback. Please try again.
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="submit-button"
      >
        <Send size={20} />
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </div>
  );
};

export default FeedbackPage;
