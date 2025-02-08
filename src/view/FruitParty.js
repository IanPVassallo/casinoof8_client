// Import necessary dependencies from React and React Router
// Import React and necessary hooks from React library
// useState: For managing component state
// useEffect: For handling side effects
import React, { useState, useEffect } from 'react';

// Import fruit images
import cherryImg from '../media/cherry.png';
import lemonImg from '../media/lemon.png';
import appleImg from '../media/apple.png';
import bananaImg from '../media/banana.png';
const fruitImages = {
  cherry: cherryImg,
  lemon: lemonImg,
  apple: appleImg,
  banana: bananaImg
};

// Assign apiUrl for environment url
const apiUrl = process.env.REACT_APP_API_URL;

// FruitParty component for FruitParty game
function FruitParty() {
  // Define balance using useState Hook
  // setBalance is the function to update it
  // Initial state is set to 20
  const [balance, setBalance] = useState(20);
  // Define spinning using useState Hook
  // setSpinning is the function to update it
  // Initial state is set to false
  const [spinning, setSpinning] = useState(false);
  // Define result using useState Hook
  // setResult is the function to update it
  // Initial state is set to ['lemon', 'lemon', 'lemon']
  const [result, setResult] = useState(['lemon', 'lemon', 'lemon']);
  // Define winAmount using useState Hook
  // setWinAmount is the function to update it
  // Initial state is set to 0
  const [winAmount, setWinAmount] = useState(0);
  // Define selectedCurrency using useState Hook
  // setSelectedCurrency is the function to update it
  // Initial state is set to EUR
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  // Define convertedBalance using useState Hook
  // setConvertedBalance is the function to update it
  // Initial state is set to null
  const [convertedBalance, setConvertedBalance] = useState(null);
  // Define exchangeRates using useState Hook
  // setExchangeRates is the function to update it
  // Initial state is set to null
  const [exchangeRates, setExchangeRates] = useState(null);
  // Define loading using useState Hook
  // setLoading is the function to update it
  // Initial state is set to false
  const [loading, setLoading] = useState(false);
  
  // Assign winnings with default 0
  let winnings = 0;

  // Assign the 3 reels with their fruits and patterns
  const reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
  const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
  const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];

  // Assign fetchWinnings to get winnings from API
  const fetchWinnings = async (symbol1, symbol2, symbol3) => {
    // Try to execute the main logic
    try {

      // Assign response to get /winnings request to REST api
      // apiUrl keeps track of the app hosting environment
      // Parameters symbols are assigned in the request query
      const response = await fetch(
        `${apiUrl}/winnings?symbol1=${symbol1}&symbol2=${symbol2}&symbol3=${symbol3}`
      );
      // If response is not ok then
      if (!response.ok) {
        throw new Error('Failed to fetch winnings');
      }
      // Assign data with response json object
      const data = await response.json();
      // log data received
      console.log("data: ", data);
      // assign the winnings
      winnings = data;

      return data;      
    } catch (err) {
      // Handle any errors that occur
      console.log(err); // log error
    }
  };

  // Assign spin for the reels spinning effect
  const spin = () => {
    // Check balance
    if (balance < 1) {
      alert('Not enough coins!');
      return;
    }

    setSpinning(true); // update spinning to true
    setWinAmount(0); // update winAmount to 0

    // Assign spinningInterval to simulate spinning animation
    const spinningInterval = setInterval(() => {
      // Assign randomSymbols to random generate math
      const randomSymbols = [
        reel1[Math.floor(Math.random() * reel1.length)],
        reel2[Math.floor(Math.random() * reel2.length)],
        reel3[Math.floor(Math.random() * reel3.length)]
      ];
      setResult(randomSymbols); // update result with randomSymbols
    }, 100); // interval delay for 100 milliseconds

    // Stop spinning after 2 seconds
    setTimeout(async () => {
      clearInterval(spinningInterval); // stop the spinning animation
      setSpinning(false); // update spinning to false

      // Assign finalSymbols with final result
      const finalSymbols = [
        reel1[Math.floor(Math.random() * reel1.length)],
        reel2[Math.floor(Math.random() * reel2.length)],
        reel3[Math.floor(Math.random() * reel3.length)]
      ];
      setResult(finalSymbols); // update result with finalSymbols

      // Call and wait for fetchWinnings response
      await fetchWinnings(finalSymbols[0], finalSymbols[1], finalSymbols[2]);

      setWinAmount(winnings); // update winAmount with winnings
      setBalance(prev => prev - 1 + winnings); // subtract spin cost and add winnings
    }, 2000); // spin for 2000 milliseconds (2 seconds)
  };

  /*
  * Converter START
  */

  // Assign currencies with list of common currencies
  const currencies = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' },
    { code: 'AUD', symbol: 'A$' },
    { code: 'CAD', symbol: 'C$' },
  ];

  // Fetch exchange rates
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  // Assign fetchExchangeRates to call api and setExchangeRates
  const fetchExchangeRates = async () => {
    try {
      // Assign response to get currency conversion from exchangerate-api
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
      // Assign data with response json object
      const data = await response.json();
      setExchangeRates(data.rates); // update exchangeRates with response rates
    } catch (error) {
      // Handle any errors that occur      
      console.error('Error fetching exchange rates:', error); // diplay console error
    }
  };

  // This effect will automatically update the converted amount whenever the balance changes
  useEffect(() => {
    // Check if we have exchange rates and a selected currency
    if (exchangeRates && selectedCurrency) {
      const rate = exchangeRates[selectedCurrency];   // get conversion rate
      const converted = (balance * rate).toFixed(2);  // calculate new amount
      setConvertedBalance(converted);                 // update convertedBalance to converted rate
    }
  }, [balance, exchangeRates, selectedCurrency]); // run effect when these values change

  // Assign convertBalance for button onclick event
  const convertBalance = () => {
    // Check for change in exchangeRates
    if (!exchangeRates) return;
    
    setLoading(true);                               // update loading to true
    const rate = exchangeRates[selectedCurrency];   // get conversion rate
    const converted = (balance * rate).toFixed(2);  // calculate new amount
    setConvertedBalance(converted);                 // update convertedBalance to converted rate
    setLoading(false);                              // update loading to false
  };

  /*
  * Converter END
  */

  // Render the UI elements for the FruitParty game
  return (
    // Main container for the slot machine game
    <div className="slot-machine-container">
      <div className="game-wrapper">
        {/* Game logo section */}
        <div className="game-logo">
          <img 
            src="https://images.ctfassets.net/5acrbcz937qe/2h9gVTvv1Mzse6hfdHXAaM/af4b49b748b0e33cf0ee315196cda58e/FruitParty_280x280.jpg"
            alt="Fruit Party"
            className="logo-image"
          />
        </div>

        {/* Main slot machine interface */}
        <div className="slot-machine">
          {/* Top section - Displays winning amount */}
          <div className="machine-top">
            <div className="win-display">
              {winAmount > 0 && <div className="win-amount">WIN {winAmount} COINS!</div>}
            </div>
          </div>
          
          {/* Reels section - Shows spinning symbols */}
          <div className="reels-container">
            <div className="reels-window">
              <div className="reels-wrapper">
                {/* Map through symbols to display reels */}
                {result.map((symbol, index) => (
                  <div 
                    key={index} 
                    className={`reel ${spinning ? 'spinning' : ''}`}
                  >
                    <div className="symbol">
                      <img 
                        src={fruitImages[symbol]} 
                        alt={symbol} 
                        className="fruit-symbol"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section - Balance and currency converter */}
          <div className="machine-bottom">
            {/* Balance display */}
            <div className="balance-display">
              <div className="balance-text">BALANCE</div>
              <div className="balance-amount">&#8364;{balance}.00</div>
            </div>

            {/* Currency converter section */}
            <div className="currency-converter">
                {/* Currency selection dropdown */}
                <select 
                  className="currency-select"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
                
                {/* Convert button */}
                <button 
                  className="convert-button"
                  onClick={convertBalance}
                  disabled={loading || !exchangeRates}
                >
                  {loading ? 'Converting...' : 'Convert'}
                </button>
                
                {/* Display converted amount */}
                {convertedBalance && (
                  <div className="converted-amount">
                    {currencies.find(c => c.code === selectedCurrency)?.symbol}
                    {convertedBalance}
                  </div>
                )}
              </div>
          </div>

          {/* Spin button section */}
          <div className="machine-bottom">
            <div className="balance-section">
              <button 
                className={`spin-button ${spinning ? 'spinning' : ''}`}
                onClick={spin}
                disabled={spinning || balance < 1}
              >
                {spinning ? 'SPINNING...' : 'SPIN'}
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer text */}
        <div className="disclaimer">
          <span className="disclaimer-text">1 EUR coin for each spin</span>
        </div>
      </div>
    </div>
  );
}

// Export the FruitParty component as the default export
// This allows other files to import and use this component
export default FruitParty;