// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAuthStore } from './Store/useAuthStore';
import NavBar from './components/NavBar'; // Ensure NavBar is imported

// Importing Pages
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfileSettingsPage';
import ProgressTrackingPage from './pages/ProgressTrackingPage';
import WorkoutHistoryPage from './pages/WorkoutHistoryPage';
import WorkoutLogPage from './pages/WorkoutLogPage';
import ExerciseSearchPage from './pages/ExerciseSearchPage';
import ExerciseDetailsPage from './pages/ExerciseDetailsPage';

// Create a wrapper component for conditional rendering of the NavBar
const Layout = ({ children }) => {
  const location = useLocation();

  // Do not show the NavBar on the following paths
  const hideNavBarPaths = ['/', '/signup', '/login'];
  const shouldShowNavBar = !hideNavBarPaths.includes(location.pathname);

  return (
    <div className="flex">
      {/* Conditionally render the NavBar */}
      {shouldShowNavBar && <NavBar />}

      {/* Main Content */}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const { darkMode } = useAuthStore();

  useEffect(() => {
    // Apply the 'dark' class to the body tag based on the darkMode state
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/progress-tracking" element={<ProgressTrackingPage />} />
          <Route path="/workout-history" element={<WorkoutHistoryPage />} />
          <Route path="/workout-log" element={<WorkoutLogPage />} />
          <Route path="/exercise-search" element={<ExerciseSearchPage />} />
          <Route path="/exercise-details/:id" element={<ExerciseDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;