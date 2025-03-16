import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    // Generate floating math problems
    const generateNumber = () => {
      const operators = ['+', '-', '×', '÷'];
      const operator = operators[Math.floor(Math.random() * operators.length)];
      const num1 = Math.floor(Math.random() * 12) + 1;
      const num2 = Math.floor(Math.random() * 12) + 1;
      const problem = `${num1}${operator}${num2}`;
      
      const newNumber = {
        value: problem,
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 4
      };
      setNumbers(prev => [...prev, newNumber]);
      
      setTimeout(() => {
        setNumbers(prev => prev.filter(n => n !== newNumber));
      }, newNumber.animationDuration * 1000);
    };

    const interval = setInterval(generateNumber, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="background">
        {numbers.map((number, index) => (
          <div
            key={index}
            className="floating-number"
            style={{
              left: `${number.left}%`,
              animationDuration: `${number.animationDuration}s`
            }}
          >
            {number.value}
          </div>
        ))}
      </div>
      
      <main className="hero">
        <div className="content">
          <h1>MathVerse</h1>
          <p className="tagline">Take your math to the next level</p>
          <div className="features">
            <div className="feature">
              <span className="emoji">🎮</span>
              <span>Cyber Learning</span>
            </div>
            <div className="feature">
              <span className="emoji">⚡</span>
              <span>Power Skills</span>
            </div>
            <div className="feature">
              <span className="emoji">🚀</span>
              <span>Future Ready</span>
            </div>
          </div>
          <button className="cta-button">Enter the MathVerse</button>
        </div>
        
        <div className="character-container">
          <div className="character"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
