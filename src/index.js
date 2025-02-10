// Import React core library
import React from 'react';

// Import ReactDOM for rendering to the DOM
// Using createRoot API for React 18's concurrent features
import ReactDOM from 'react-dom/client';

// Import Bootstrap CSS framework
import 'bootstrap/dist/css/bootstrap.css';

// Import custom CSS styles for different components
import './css/Login.css';        // Styles for login page
import './css/Dashboard.css';    // Styles for dashboard
import './css/FruitParty.css';   // Styles for FruitParty game

// Import main App component
import App from './view/App';

// Import performance measurement utility
import reportWebVitals from './reportWebVitals';

// Create root element for React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside StrictMode
// StrictMode enables additional development checks and warnings
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
