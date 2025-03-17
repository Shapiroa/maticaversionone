import React, { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';

const MathGame = () => {
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const generateQuestion = useCallback(() => {
    const isMultiplication = Math.random() > 0.5;
    let num1, num2;

    if (grade <= 4) {
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
    } else if (grade <= 6) {
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 20) + 10;
    } else {
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * 50) + 20;
    }

    if (isMultiplication) {
      setQuestion(`${num1} × ${num2} = ?`);
      setCorrectAnswer(num1 * num2);
    } else {
      // Ensure division results in a whole number
      const product = num1 * num2;
      setQuestion(`${product} ÷ ${num1} = ?`);
      setCorrectAnswer(num2);
    }
    
    setTimeLeft(10);
    setAnswer('');
  }, [grade]);

  const handleAnswer = useCallback((isTimeout = false) => {
    if (isPaused) return;
    
    const userAnswer = parseInt(answer);
    if (!isTimeout && userAnswer === correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore % 5 === 0) {
        setGrade(prevGrade => prevGrade + 1);
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
    } else {
      setIsShaking(true);
      setShowTryAgain(true);
      setTimeout(() => {
        setIsShaking(false);
        setShowTryAgain(false);
      }, 500);
    }
    
    generateQuestion();
  }, [answer, correctAnswer, generateQuestion, score, isPaused]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !gameStarted) {
      setGameStarted(true);
      generateQuestion();
    }
  }, [countdown, gameStarted, generateQuestion]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isPaused) {
      handleAnswer(true);
    }
  }, [timeLeft, gameStarted, handleAnswer, isPaused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPaused) {
      handleAnswer();
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  if (countdown > 0) {
    return <div className="countdown">{countdown}</div>;
  }

  return (
    <div className="math-game">
      {showLevelUp && (
        <>
          <Confetti />
          <div className="level-up">Leveling Up!</div>
        </>
      )}
      
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="grade">Grade: {grade}</div>
        <div className="timer">Time: {timeLeft}s</div>
        <button 
          className={`pause-button ${isPaused ? 'paused' : ''}`} 
          onClick={togglePause}
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
      </div>

      <div className={`question-container ${isShaking ? 'shake' : ''}`}>
        {isPaused ? (
          <div className="paused-overlay">
            <h2>Game Paused</h2>
            <p>Click Resume to continue</p>
          </div>
        ) : (
          <>
            <div className="question">{question}</div>
            {showTryAgain && <div className="try-again">Try Again</div>}
            
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                autoFocus
                disabled={isPaused}
              />
              <button type="submit" disabled={isPaused}>Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MathGame;
