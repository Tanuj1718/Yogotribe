import React, { useState } from 'react';
import './App.css';

function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      setFact('Sorry, something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Random Cat Fact</h1>
      <button onClick={fetchFact} disabled={loading}>
        {loading ? 'Loading...' : 'Get Random Fact'}
      </button>
      {fact && <p>{fact}</p>}
    </div>
  );
}

export default App;
