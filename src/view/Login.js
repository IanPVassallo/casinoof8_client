// Import necessary dependencies from React and React Router
// useState is a React Hook that lets you add state to functional components
import React, { useState } from 'react';
// Import Router components for handling navigation and routing in the application
import { useNavigate } from 'react-router-dom';

// Assign apiUrl for environment url
const apiUrl = process.env.REACT_APP_API_URL;

// Get environment files url
fetch(`${apiUrl}`)
  .then(response => response.json())
  .then(data => console.log(data));

// Login component for user login to the app
function Login({ onLogin }) {
  // Define navigate for app access routing
  const navigate = useNavigate();
  // Define username using useState Hook
  // setUsername is the function to update it
  // Initial state is set to empty ('')
  const [username, setUsername] = useState('');
  // Define pin using useState Hook
  // setPin is the function to update it
  // Initial state is set to empty ('')
  const [pin, setPin] = useState('');

  // Login form onSubmit event function handleSubmit
  // handleSubmit makes use of async for asynchronous requests
  const handleSubmit = async (event) => {
    // Stop the event's default action
    event.preventDefault();

    // console.log('Username:', username);
    // console.log('PIN:', pin);

    /*
    / Skivori - Full-Stack Javascript Developer Test
    / 2. General Requirements - Validate the request body
    / START
    */

    // Try to execute the main logic
    try {

        // Assign res to post /login request to REST api
        // apiUrl keeps track of the app hosting environment
        // method, body and headers are essential to distinguish request made
        const res = await fetch(`${apiUrl}/login`, {
        //const res = await fetch(`/login`, {
          method: 'POST',
          body: JSON.stringify({ username, pin }),
          headers: {'Content-Type': 'application/json'}
        });
        // Assign data to receive the awaited results
        // await is called which is made possible due to handleSubmit async compatibility
        const data = await res.json();
        // Catch error if data returned with error
        if (data.error) {
          // Log error
          console.log(data.error);
        }
        // Handle data received for player 
        if (data.player) {
          // Log success
          console.log("Access granted!!");

          // Call the onLogin function to trigger authentication state update
          onLogin();

          // Call router on App
          navigate('/dashboard');
        }

    } catch (err) {
      // Handle any errors that occur
      console.log(err.message); // log error
    }

    /*
    / Skivori - Full-Stack Javascript Developer Test
    / 2. General Requirements - Validate the request body
    / END
    */
 };

  // Render the login UI elements
  return (
    // Main login container with background
    <div className="login-background">
      {/* Bootstrap container with top margin */}
      <div className="container mt-5">
        {/* Centered row using Bootstrap grid */}
        <div className="row justify-content-center">
          {/* Column with medium device width of 6 units */}
          <div className="col-md-6">
            {/* Login card component */}
            <div className="card login-card">
              {/* Card header with title */}
              <div className="card-header text-center">
                <h3 className="login-title">Casino-Of-8 Portal</h3>
              </div>
              {/* Card body containing login form */}
              <div className="card-body">
                {/* Login form with submit handler */}
                <form onSubmit={handleSubmit}>
                  {/* Username input group */}
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      autoComplete="on"
                      required
                    />
                  </div>
                  {/* PIN input group */}
                  <div className="form-group">
                    <label htmlFor="pin">PIN</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter your PIN"
                      autoComplete="on"
                      required
                    />
                  </div>
                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-block mt-4">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Login component as the default export
// This allows other files to import and use this component
export default Login;