import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  BarChart3, MessageSquare, TrendingUp, Users, Star
} from 'lucide-react';
import '../styles/analyticspage.css';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics');
        setAnalytics(res.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    const fetchFeedback = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/feedback');
        setFeedback(res.data);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      }
    };

    Promise.all([fetchAnalytics(), fetchFeedback()]).finally(() => {
      setLoading(false);
    });
  }, []);


  const normalizedDistribution = ['0','1', '2', '3', '4', '5'].map(star => {
    const found = analytics.ratingDistribution?.find(item => Number(item.rating) === Number(star));
    return {
      rating: `${star} Star`,
      count: found ? found.count : 0
    };
  });

  const renderStars = (currentRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          className={`star-icon ${i <= currentRating ? 'filled' : ''}`}
          fill={i <= currentRating ? '#fbbf24' : 'none'}
          stroke={i <= currentRating ? '#fbbf24' : '#d1d5db'}
        />
      );
    }
    return <div className="stars-container">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div className="header-content">
          <BarChart3 className="header-icon" size={32} />
          <div>
            <h1 className="page-title">Feedback Analytics</h1>
            <p className="page-subtitle">Real-time insights and trends</p>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <Users className="card-icon blue" size={24} />
          <div className="card-content">
            <div className="card-value">{analytics.totalFeedback?.[0]?.total || '0'}</div>
            <div className="card-label">Total Feedback</div>
          </div>
        </div>

        <div className="summary-card">
          <Star className="card-icon yellow" size={24} />
          <div className="card-content">
            <div className="card-value">
              {Number(analytics.averageRating?.[0]?.average || 0).toFixed(1)}
            </div>
            <div className="card-label">Average Rating</div>
          </div>
        </div>

        <div className="summary-card">
          <TrendingUp className="card-icon green" size={24} />
          <div className="card-content">
            <div className="card-value">{analytics.categoryBreakdown?.length || '0'}</div>
            <div className="card-label">Categories</div>
          </div>
        </div>

        <div className="summary-card">
          <MessageSquare className="card-icon purple" size={24} />
          <div className="card-content">
            <div className="card-value">{analytics.ratingTrends?.length || '0'}</div>
            <div className="card-label">Days Active</div>
          </div>
        </div>
      </div>

      <div className="main-section">
        <div className="chart-section">
          <h3 className="section-title">Rating Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={normalizedDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="rating" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="feedback-section">
          <h3 className="section-title">Recent Feedback</h3>
          <div className="feedback-list">
            {feedback.slice(0, 4).map((item) => (
              <div key={item.id} className="feedback-item">
                <div className="feedback-header">
                  <div className="feedback-info">
                    <span className="feedback-name">{item.name}</span>
                    <span className="feedback-category">({item.category})</span>
                  </div>
                  <div className="feedback-meta">
                    {renderStars(item.rating)}
                    <span className="feedback-date">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <p className="feedback-message">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
