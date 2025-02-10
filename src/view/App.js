// Import necessary dependencies from React and React Router
// useState is a React Hook that lets you add state to functional components
import React, { useState } from 'react';
// Import Router components for handling navigation and routing in the application
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Import component pages that will be rendered based on routes
import Login from './Login';
import Dashboard from './Dashboard';
import FruitParty from './FruitParty';
import ErrorPage from './ErrorPage';

// Main App component that serves as the root of the application
function App() {
  // Define isAuthenticated state using useState Hook
  // setIsAuthenticated is the function to update it
  // Initial state is set to false (user starts as not authenticated)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user login
  // This function will be passed to the Login component as a prop
  const handleLogin = () => {
    // Set authentication state to true when user logs in
    setIsAuthenticated(true);
  };

  // Render the application's routing structure
  return (
    // Router component wraps the entire app to enable routing functionality
    <Router>
      {/* Routes component groups all route definitions */}
      <Routes>
        {/* Route for the login page (root path) */}
        {/* Passes handleLogin function to Login component */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Protected route for dashboard */}
        {/* Uses conditional rendering based on authentication state */}
        {/* If authenticated, shows Dashboard; if not, redirects to login */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" />
          }
        />

        {/* Route for FruitParty game */}
        {/* This route is not protected and can be accessed without authentication */}
        <Route
          path="/FruitParty"
          element={
            <FruitParty />
          }
        />

        {/* Protected route for error page */}
        {/* Similar to dashboard, requires authentication to access */}
        <Route
          path="/ErrorPage"
          element={
            isAuthenticated ? <ErrorPage /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

// Export the App component as the default export
// This allows other files to import and use this component
export default App;