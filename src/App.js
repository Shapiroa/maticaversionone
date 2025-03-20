import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MathGame from './components/MathGame';

function Home() {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
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
          <button className="cta-button" onClick={() => navigate('/grade-select')}>Enter the MathVerse</button>
        </div>
      </main>
    </div>
  );
}

function GradeSelection() {
  const navigate = useNavigate();
  const grades = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="App">
      <div className="grade-selection">
        <h1>Select Your Grade</h1>
        <div className="grade-buttons">
          {grades.map(grade => (
            <button
              key={grade}
              className="cta-button"
              onClick={() => navigate(`/game/${grade}`)}
            >
              Grade {grade}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grade-select" element={<GradeSelection />} />
        <Route path="/game/:grade" element={<MathGame />} />
      </Routes>
    </Router>
  );
}

export default App;
