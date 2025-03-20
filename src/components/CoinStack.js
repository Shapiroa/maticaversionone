import React, { useEffect, useState } from 'react';

const CoinStack = ({ score }) => {
  const [coins, setCoins] = useState([]);
  const [lastScore, setLastScore] = useState(score);

  useEffect(() => {
    if (score > lastScore) {
      // Add a new coin with a random horizontal offset
      const newCoin = {
        id: Date.now(),
        offset: Math.random() * 10 - 5, // Random offset between -5px and 5px
      };
      setCoins(prevCoins => [...prevCoins, newCoin]);
      setLastScore(score);
    }
  }, [score, lastScore]);

  return (
    <div className="coin-stack-container">
      <div className="coin-stack">
        {coins.map((coin, index) => (
          <div
            key={coin.id}
            className="coin"
            style={{
              bottom: `${index * 4}px`,
              transform: `translateX(${coin.offset}px)`,
              zIndex: index
            }}
          >
            <div className="coin-face">
              <span className="coin-text">$</span>
            </div>
          </div>
        ))}
      </div>
      <div className="coin-count">{score}</div>
    </div>
  );
};

export default CoinStack;
