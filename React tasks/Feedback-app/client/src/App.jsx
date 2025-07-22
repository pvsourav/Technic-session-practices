import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './styles/App.css'; // Global styles for the main layout and navbar
import FeedbackPage from './pages/FeedbackPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        <nav className="navbar">
          <div className="navbar-content">
            <div className="navbar-brand">
              Feedback System
            </div>
            <div className="navbar-links">
              <NavLink
                to="/feedback-form"
                className={({ isActive }) => 
                  isActive ? "nav-button active" : "nav-button"
                }
              >
                Submit Feedback
              </NavLink>
              <NavLink
                to="/analytics"
                className={({ isActive }) => 
                  isActive ? "nav-button active" : "nav-button"
                }
              >
                View Analytics
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="main-content-area">
          <Routes>
            <Route path="/feedback-form" element={<FeedbackPage/>} />
            <Route path="/analytics" element={<AnalyticsPage/>} />
            <Route path="/" element={<FeedbackPage />} />
          </Routes>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;