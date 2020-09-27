import React, { useState, useEffect } from 'react';

import { API } from 'aws-amplify';

import './App.css';

function App() {
  const [coins, updateCoins] = useState([]);
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  async function fetchCoins() {
    const { limit, start } = input;
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    updateCoins(data.coins);
  };

  useEffect(() => {
    fetchCoins();
  }, []);


  return (
    <div className="App">
      
      <input
        onChange={e => updateInputValues('start', e.target.value)}
        value={input.start}
        placeholder="start"
      />
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        value={input.limit}
        placeholder="limit"
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;