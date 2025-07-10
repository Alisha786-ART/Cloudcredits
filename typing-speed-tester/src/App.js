import React, { useState } from 'react';
import './App.css';
import TypingBox from './components/TypingBox';
function App() {
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);

  // ✅ 1. Handle input change and start timer
  const handleInputChange = (e) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setTypedText(e.target.value);
  };

  // ✅ 2. Handle finish and calculate WPM
  const handleFinish = () => {
    const endTime = Date.now();
    const timeTakenInSeconds = (endTime - startTime) / 1000;
    const wordCount = typedText.trim().split(/\s+/).length;

    const calculatedWPM = Math.round((wordCount / timeTakenInSeconds) * 60);
    setWpm(calculatedWPM);
  };

  return (
    <div className="app">
      <h1>Typing Speed Tester</h1>

      {/* Input box */}
      <textarea
        value={typedText}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        rows={10}
        cols={50}
      />

      {/* Button to finish typing */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleFinish}>Finish</button>
      </div>

      {/* Result display */}
      {wpm !== null && <p>Your typing speed is: <strong>{wpm} WPM</strong></p>}
    </div>
  );
}

export default App;
