// Import necessary dependencies from React and React Router
// Import React and necessary hooks from React library
// useState: For managing component state
// useEffect: For handling side effects
// useCallback: For memoizing functions
import React, { useState, useEffect, useCallback } from 'react';
// Import Bootstrap components for UI elements
import { 
  Button,     // Button component
  Form,       // Form elements
  InputGroup, // Input grouping container
  Spinner,    // Loading spinner
  Badge,      // Badge/label component
  Alert       // Alert/notification component
} from 'react-bootstrap';
// Import Font Awesome icons from react-icons library
import { 
  FaSearch,     // Search icon
  FaGamepad,    // Gamepad icon
  FaInfoCircle  // Information Circle icon
} from 'react-icons/fa';
// Import debounce function from lodash library
// Used to limit the rate at which a function can fire
import debounce from 'lodash/debounce';
// Import default thumbnail image
import default_thumb from '../media/8293566.png';
// Import Link component from react-router-dom
// Used for navigation between routes
import { Link } from 'react-router-dom';

// Assign apiUrl for environment url
const apiUrl = process.env.REACT_APP_API_URL;

// Dashboard component for game library list
function Dashboard() {
  // Define games using useState Hook
  // setGames is the function to update it
  // Initial state is set to empty ([])
  const [games, setGames] = useState([]);
  // Define searchTerm using useState Hook
  // setSearchTerm is the function to update it
  // Initial state is set to empty ('')
  const [searchTerm, setSearchTerm] = useState('');
  // Define loading using useState Hook
  // setLoading is the function to update it
  // Initial state is set to false
  const [loading, setLoading] = useState(false);
  // Define error using useState Hook
  // setError is the function to update it
  // Initial state is set to null
  const [error, setError] = useState(null);

  // Assign fetchGames to get game list from API
  const fetchGames = async (search) => {
    // Try to execute the main logic
    try {

      setLoading(true); // update loading to true
      setError(null); // update error to null
      // Assign response to get /games request to REST api
      // apiUrl keeps track of the app hosting environment
      // Parameter search is assigned in the request query
      const response = await fetch(
        `${apiUrl}/games${search ? `?search=${search}` : ''}`
      );
      // If response is not ok then
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      // Assign data with response json object
      const data = await response.json();
      setGames(data); // update games with data

    } catch (err) {
      // Handle any errors that occur
      setError(err.message); // update error
    } finally {
      // After executing main logic
      setLoading(false); // update loading to false
    }
  };

  /*
  / Skivori - Full-Stack Javascript Developer Test
  / 2.1.5. Question 5 - Optimise the search endpoint
  / START
  */

  // Assign debouncedSearch
  // Create a memoized debounced search function using useCallback
  // This prevents unnecessary re-creation of the function on each render
  const debouncedSearch = useCallback(
    // Debounce the search function to limit API calls
    // Will only execute after 500ms of no new input
    debounce((searchValue) => {
      fetchGames(searchValue);    // call API to fetch games matching search value
    }, 500),                      // wait 500ms before executing search
    []                            // empty dependency array
  );

  // Assign handleSearchChange to handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value; // assign value on event
    setSearchTerm(value); // update searchTerm
    debouncedSearch(value); // call debouncedSearch with value
  };

  // Initial fetch
  useEffect(() => {
    // Load all games on component mount by passing empty search string
    fetchGames('');
    
    // Cleanup
    return () => {
      // Cancel any pending debounced searches to prevent memory leaks
      debouncedSearch.cancel();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  /*
  / Skivori - Full-Stack Javascript Developer Test
  / 2.1.5. Question 5 - Optimise the search endpoint
  / END
  */

  // Assign getThumbnailUrl to process and return valid thumbnail URL
  // If no URL provided, returns default thumbnail
  // If URL starts with '//', adds 'https:' prefix
  const getThumbnailUrl = (url) => {
    if (!url) return default_thumb;    // return default image if URL is empty/null
    return url.startsWith('//') ? `https:${url}` : url;    // add https if needed
  };

  // Render the dashboard UI elements with list of games
  return (
    // Main container for the game library
    <div className="game-container"> 
      {/* Page title */}
      <h1 className="game-header">Casino-Of-8 Library</h1>

      {/* Search Bar Section */}
      <div className="search-container mb-4">
        <InputGroup className="custom-search">
          {/* Search icon */}
          <InputGroup.Text className="search-icon">
            <FaSearch />
          </InputGroup.Text>
          {/* Search input field */}
          <Form.Control
            type="text"
            placeholder="Search your favorite games..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            disabled={loading && !games.length}
          />
        </InputGroup>
        
        {/* Loading indicator for search */}
        {loading && searchTerm && (
          <div className="search-status">
            <Spinner animation="border" size="sm" className="me-2" />
            Searching...
          </div>
        )}
      </div>

      {/* Error message display */}
      {error && (
        <Alert variant="danger" className="custom-alert">
          <Alert.Heading>
            <FaInfoCircle className="me-2" />
            Oops! Something went wrong
          </Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => fetchGames(searchTerm)}>
            Try Again
          </Button>
        </Alert>
      )}

      {/* Grid display of game cards */}
      <div className="game-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            {/* Game thumbnail */}
            <div className="game-image-container">
              <img
                className="game-image"
                src={getThumbnailUrl(game.thumb?.url)}
                alt={game.title}
              />
            </div>
            {/* Game details */}
            <div className="game-content">
              <h3 className="game-title">{game.title}</h3>
              <p className="game-provider">{game.providerName}</p>
              {/* Play button with link */}
              <Link to={game.startUrl} target="_blank">
                <button
                  className="game-button"
                  disabled={!game.startUrl}
                  onClick={() => window.open(game.startUrl, '_blank')}
                >
                  {game.startUrl ? 'Play Now' : 'Coming Soon'}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Loading state display */}
      {loading && !games.length && (
        <div className="loading-container">
          <Spinner animation="border" variant="primary" />
          <p>Loading amazing games...</p>
        </div>
      )}

      {/* No results message */}
      {!loading && !error && games.length === 0 && (
        <div className="no-results">
          <FaGamepad className="no-results-icon" />
          <h3>No games found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      )}

      {/* Results count display */}
      {!loading && games.length > 0 && (
        <div className="results-summary">
          <Badge bg="info" className="results-badge">
            {games.length} {games.length === 1 ? 'game' : 'games'} found
            {searchTerm && ` matching "${searchTerm}"`}
          </Badge>
        </div>
      )}

    </div>
  );
}

// Export the Dashboard component as the default export
// This allows other files to import and use this component
export default Dashboard;