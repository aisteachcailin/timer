import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [valueMin, setValueMin] = useState(5)
  const [valueSec, setValueSec] = useState(0)
  const [timer, setTimer] = useState(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setValueSec((prevSec) => {
          if (prevSec === 0) {
            setValueMin((prevMin) => prevMin - 1)
            return 59
          } else {
            return prevSec - 1
          }
        })
      }, 1000)
      setTimer(interval)
      return () => clearInterval(interval)
    }
  }, [isTimerRunning])

  const handleStartTimer = () => {
    if (valueMin >= 5 && valueMin <= 60) {
      setIsTimerRunning(true)
    }
  }

  const handleResetTimer = () => {
    setIsTimerRunning(false)
    setValueMin(5)
    setValueSec(0)
    clearInterval(timer)
  }

  return (
    <>
      <h3>Таймер для мозгового штурма</h3>
      <input
        type="number"
        placeholder="05"
        value={valueMin}
        onChange={(e) => setValueMin(e.target.value)}
        min={5}
        max={60}
      />
      <span>:</span>
      <input
        type="number"
        placeholder="00"
        value={valueSec}
        onChange={(e) => setValueSec(e.target.value)}
        min={0}
        max={59}
      />

      <button onClick={handleStartTimer}>старт</button>
      <button onClick={handleResetTimer}>сброс</button>

      <input type="text" placeholder="Здесь Вы можете написать Ваши мысли и идеи!" />
      <button>+</button>
      <ol>
        <li>
          Идея
          <button>редактировать</button>
          <button>удалить</button>
        </li>
      </ol>
    </>
  )
}