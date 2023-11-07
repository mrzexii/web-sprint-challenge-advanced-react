import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    // Calculate X and Y coordinates based on the current index
    const X = index % 3 + 1;
    const Y = Math.floor(index / 3) + 1;
    return { X, Y };
  }

  function getXYMessage() {
    const { X, Y } = getXY();
    return `Coordinates (${X}, ${Y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // Calculate the next index based on the given direction
    let nextIndex = index;

    switch (direction) {
      case 'left':
        nextIndex = index % 3 === 0 ? index : index - 1;
        break;
      case 'right':
        nextIndex = index % 3 === 2 ? index : index + 1;
        break;
      case 'up':
        nextIndex = Math.floor(index / 3) === 0 ? index : index - 3;
        break;
      case 'down':
        nextIndex = Math.floor(index / 3) === 2 ? index : index + 3;
        break;
      default:
        break;
    }

    return nextIndex;
  }

  function move(evt) {
    const nextIndex = getNextIndex(evt);
    if (nextIndex === index) {
      setMessage(`You can't go ${evt}`);
    } else {
      setMessage('');
      setIndex(nextIndex);
      setSteps(steps + 1);
    }
  }

  function onChange(evt) {
    // Update the email input value
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    axios
      .post('http://localhost:9000/api/result', {
        email,
        x: getXY().X,
        y: getXY().Y,
        steps,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => {
        setMessage('An error occurred while sending the data to the server.');
      });
    setEmail('');
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
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
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={(e) => onChange(e)} />
        <input id="submit" type="submit" value="Submit Email" />
      </form>
    </div>
  );
}
