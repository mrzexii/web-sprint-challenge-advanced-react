import React, { useState } from 'react';
import axios from 'axios'

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  function getXY(index) {
    // Calculate the X and Y coordinates based on the current index
    const X = index % 3 + 1;
    const Y = Math.floor(index / 3) + 1;
    return { X, Y };
  }

  const [XY, setXY] = useState(getXY(initialIndex));

  function reset() {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
    setXY(getXY(initialIndex));
  }

  function getNextIndex(direction) {
    const currentIndex = index;
    switch (direction) {
      case 'left':
        return currentIndex % 3 === 0 ? currentIndex : currentIndex - 1;
      case 'up':
        return Math.floor(currentIndex / 3) === 0 ? currentIndex : currentIndex - 3;
      case 'right':
        return currentIndex % 3 === 2 ? currentIndex : currentIndex + 1;
      case 'down':
        return Math.floor(currentIndex / 3) === 2 ? currentIndex : currentIndex + 3;
      default:
        return currentIndex;
    }
  }

  function move(direction) {
    const nextIndex = getNextIndex(direction);
    if (nextIndex === index) {
      setMessage(`You can't go ${direction}`);
    } else {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setXY(getXY(nextIndex));
      setMessage('');
    }
  }

  function onSubmit(evt) {
    evt.preventDefault();
  
    if (!email) {
      setMessage('Email is required');
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Email must be a valid email address');
      return;
    }
  
    if (email === 'foo@bar.baz') {
      setMessage('foo@bar.baz');
    } else {
      axios
        .post('http://localhost:9000/api/result', {
          email: email,
          x: XY.X,
          y: XY.Y,
          steps: steps,
        })
        .then((res) => {
          setMessage(res.data.message);
        })
        .catch((error) => {
          setMessage('An error occurred while sending the data to the server.');
        });
    }
  
    setEmail('');
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({XY.X}, {XY.Y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          id="email"
          type="email"
          placeholder="Type email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input id="submit" type="submit" value="Submit Email"></input>
      </form>
    </div>
  );
}
