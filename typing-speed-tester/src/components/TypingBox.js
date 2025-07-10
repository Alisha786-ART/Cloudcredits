import React, { useEffect, useState, useRef } from 'react';
import './TypingBox.css';

const sampleSentences = [
    "Practice makes perfect",
    "Frontend development is fun",
    "React is powerful and flexible",
    "Build things to learn things",
    "Keep coding and never stop"
];

function TypingBox() {
    const [text, setText] = useState('');
    const [input, setInput] = useState('');
    const [wpm, setWpm] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [errors, setErrors] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
  const random = sampleSentences[Math.floor(Math.random() * sampleSentences.length)];
  setText(random);
}, []);


    const handleChange = (e) => {
        if (!startTime) {
            setStartTime(Date.now()); // Start time on first input
        }

        const value = e.target.value;
        setInput(value);
        calculateErrors(value);

        if (value.length === text.length) {
            setEndTime(Date.now()); // End time when finished
            calculateWPM(value);
        }
    };


    const calculateErrors = (typed) => {
        let count = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] !== text[i]) count++;
        }
        setErrors(count);
    };

    const calculateWPM = (typedText) => {
        const timeInMinutes = (endTime - startTime) / 60000; // milliseconds to minutes
        const wordCount = typedText.trim().split(/\s+/).length;
        const calculated = Math.round(wordCount / timeInMinutes);
        setWpm(calculated);
    };


    const reset = () => {
        setText(sampleSentences[Math.floor(Math.random() * sampleSentences.length)]);
        setInput('');
        setWpm(0);
        setErrors(0);
        setStartTime(null);
        setEndTime(null);
        inputRef.current.focus();
    };


    return (
        <div className="typing-box">
            <p className="sentence">{text || "Loading sentence..."}</p>
            <textarea
                ref={inputRef}
                placeholder="Start typing here..."
                value={input}
                onChange={handleChange}
                disabled={endTime !== null}
            />

            <div className="stats">

                <p>WPM: {wpm}</p>
                <p>Errors: {errors}</p>
            </div>
            {endTime && (
                <button onClick={reset} className="restart-btn">Restart</button>
            )}
        </div>
    );
}

export default TypingBox;
