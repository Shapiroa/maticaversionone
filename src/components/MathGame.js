import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import CoinStack from './CoinStack';

const MathGame = () => {
  const { grade: initialGrade } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState(parseInt(initialGrade) || 1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showLevelUpPrompt, setShowLevelUpPrompt] = useState(false);

  const generateQuestion = useCallback(() => {
    const isMultiplication = Math.random() > 0.5;
    let num1, num2;

    switch(grade) {
      case 1:
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        break;
      case 2:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        break;
      case 3:
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        break;
      case 4:
        num1 = Math.floor(Math.random() * 15) + 5;
        num2 = Math.floor(Math.random() * 15) + 5;
        break;
      case 5:
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 20) + 10;
        break;
      case 6:
        num1 = Math.floor(Math.random() * 30) + 15;
        num2 = Math.floor(Math.random() * 30) + 15;
        break;
      default: // Grade 7
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
      
      if (newScore % 10 === 0 && grade < 7) {
        setShowLevelUpPrompt(true);
        setIsPaused(true);
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
  }, [answer, correctAnswer, generateQuestion, score, isPaused, grade]);

  const handleLevelUpResponse = (shouldLevelUp) => {
    setShowLevelUpPrompt(false);
    setIsPaused(false);
    
    if (shouldLevelUp) {
      setGrade(prev => Math.min(prev + 1, 7));
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  };

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
    if (!showLevelUpPrompt) {
      setIsPaused(!isPaused);
    }
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
          disabled={showLevelUpPrompt}
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
      </div>

      <div className={`question-container ${isShaking ? 'shake' : ''}`}>
        {showLevelUpPrompt ? (
          <div className="level-up-prompt">
            <h2>Level Up?</h2>
            <p>You've answered 10 questions correctly!</p>
            <div className="level-up-buttons">
              <button className="cta-button" onClick={() => handleLevelUpResponse(true)}>Yes</button>
              <button className="cta-button" onClick={() => handleLevelUpResponse(false)}>No</button>
            </div>
          </div>
        ) : isPaused ? (
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

      <CoinStack score={score} />
    </div>
  );
};

export default MathGame;
