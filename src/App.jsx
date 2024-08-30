import { useEffect, useState } from 'react';
import './App.css';
import Buttons from './components/Buttons/Buttons';
import Clock from './components/Clock';

export default function App() {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [timer, setTimer] = useState(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [ideas, setIdeas] = useState([])
  const [newIdea, setNewIdea] = useState('')

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
  }, [isTimerRunning])

  const handleStartPauseTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false)
      clearInterval(timer)
    } else if (minutes >= 1 && minutes <= 60 && seconds >= 0 && seconds <= 59) {
      setIsTimerRunning(true)
    }
  }

  const handleResetTimer = () => {
    setIsTimerRunning(false)
    setMinutes(1)
    setSeconds(0)
    clearInterval(timer)
  }

  const handleAddIdea = () => {
    if (newIdea.trim() !== '') {
      setIdeas([...ideas, newIdea.trim()])
      setNewIdea('')
    }
  }

  const handleDeleteIdea = (index) => {
    const updatedIdeas = [...ideas]
    updatedIdeas.splice(index, 1)
    setIdeas(updatedIdeas)
  }

  const formatTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  return (
    <div className="app">
      <h3 className='timer-title'>brainstorm timer</h3>
      <div className="timer-container">

        <div className="timer-input">
          <Clock value={formatTime(minutes)} onChange={(e) => setMinutes(parseInt(e.target.value))} min={1} max={60}/>
          <span>:</span>
          <Clock value={formatTime(seconds)} onChange={(e) => setSeconds(parseInt(e.target.value))} min={0} max={59}/>
        </div>

        <div className="timer-buttons">
          <Buttons
            className={`${isTimerRunning ? 'btn-pause' : 'btn-start'}`}
            onClick={handleStartPauseTimer}
            purpose={isTimerRunning ? 'Pause' : 'Start'}/>

          <Buttons
          className="btn-reset"
          onClick={handleResetTimer}
          purpose='Reset' />
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

          <Buttons
          className="btn-add"
          onClick={handleAddIdea}
          purpose='Add'/>

        <ol>
          {ideas.map((idea, index) => (
            <li key={index}>
              {idea}
              <img src="./images/delete.svg" className='icon icon-delete' onClick={() => handleDeleteIdea(index)} alt="delete"/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
