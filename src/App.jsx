import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState('');

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 0) {
            setMinutes((prevMin) => {
              if (prevMin === 0) {
                setIsTimerRunning(false);
                setSeconds(0);
                return 0;
              } else {
                return prevMin - 1;
              }
            });
            return 59;
          } else {
            return prevSec - 1;
          }
        });
      }, 1000);
      setTimer(interval);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  const handleStartTimer = () => {
    if (minutes >= 1 && minutes <= 60 && seconds >= 0 && seconds <= 59) {
      setIsTimerRunning(true);
    }
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
    clearInterval(timer);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setMinutes(1);
    setSeconds(0);
    clearInterval(timer);
  };

  const handleAddIdea = () => {
    if (newIdea.trim() !== '') {
      setIdeas([...ideas, newIdea.trim()]);
      setNewIdea('');
    }
  };

  const handleDeleteIdea = (index) => {
    const updatedIdeas = [...ideas];
    updatedIdeas.splice(index, 1);
    setIdeas(updatedIdeas);
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="app">
      <h3 className='timer-title'>brainstorm timer</h3>
      <div className="timer-container">
        <div className="timer-input">
          <input
            type="number"
            placeholder="00"
            value={formatTime(minutes)}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            min={1}
            max={60}
            maxLength={2}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="00"
            value={formatTime(seconds)}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
            min={0}
            max={59}
            maxLength={2}
          />
        </div>
        <div className="timer-buttons">
          <button className="btn btn-pause" onClick={handlePauseTimer}>
            pause
          </button>
          <button className="btn btn-start" onClick={handleStartTimer}>
            start
          </button>
          <button className="btn btn-reset" onClick={handleResetTimer}>
            reset
          </button>
        </div>
      </div>
      <div className="ideas-container">
        <input
          type="text"
          placeholder="Nice idea!"
          value={newIdea}
          className='ideas-input'
          onChange={(e) => setNewIdea(e.target.value)}
        />
        <button className="btn btn-add" onClick={handleAddIdea}>
          add
        </button>
        <ol>
          {ideas.map((idea, index) => (
            <li key={index}>
              {idea}
              <img src="./images/delete.svg" className='icon' onClick={() => handleDeleteIdea(index)} alt="delete"/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}