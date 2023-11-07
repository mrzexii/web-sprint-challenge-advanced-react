import React, { useState } from 'react';
import axios from 'axios';


export default function AppFunctional(props) {
  const [XY, setXY] = useState({ X: 2, Y: 2 });
  const [index, setIndex] = useState(4);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  function getXY(value) {
    // Calculate the X and Y coordinates based on the current index
    const x = value % 3 + 1;
    const y = Math.floor(value / 3) + 1;
    setXY({ X: x, Y: y });
  }
  

  function reset() {
    setXY({ X: 2, Y: 2 });
    setIndex(4);
    setSteps(0);
    setMessage('');
    setEmail('');
  }

  function getNextIndex(direction) {
    switch (direction) {
      case 'left':
        if (index % 3 === 0) return index;
        else {
          const nextIndex = index - 1;
          setIndex(nextIndex);
          return nextIndex;
        }
        break;
      case 'right':
        if (index % 3 === 2) return index;
        else {
          const nextIndex = index + 1;
          setIndex(nextIndex);
          return nextIndex;
        }
        break;
      case 'up':
        if (parseInt(index / 3) === 0) return index;
        else {
          const nextIndex = index - 3;
          setIndex(nextIndex);
          return nextIndex;
        }
        break;
      case 'down':
        if (parseInt(index / 3) === 2) return index;
        else {
          const nextIndex = index + 3;
          setIndex(nextIndex);
          return nextIndex;
        }
        break;
      default:
        break;
    }
  }

  function move(evt) {
    setMessage('');
    let nextValue;
    switch (evt) {
      case 'left':
        nextValue = getNextIndex('left');
        if (index === nextValue) setMessage("You can't go left");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;
      case 'right':
        nextValue = getNextIndex('right');
        if (index === nextValue) setMessage("You can't go right");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;
      case 'up':
        nextValue = getNextIndex('up');
        if (index === nextValue) setMessage("You can't go up");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;
      case 'down':
        nextValue = getNextIndex('down');
        if (index === nextValue) setMessage("You can't go down");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;
      default:
        break;
    }
  }

  function onSubmit(evt) {
    evt.preventDefault();
  
    if (!email) {
      setMessage('Ouch: email is required'); // Set the error message for missing email.
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Invalid email address');
      return;
    }
  
    if (email === 'foo@bar.baz') {
      setMessage('foo@bar.baz failure #71');
    } else {
      // Simulate the actual HTTP request behavior here
      axios.post('http://localhost:9000/api/result', {
        email,
        x: XY.X,
        y: XY.Y,
        steps,
      }).then((res) => {
        setMessage(res.data.message);
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
        <input id="email" type="email" placeholder="Type email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input id="submit" type="submit" value="Submit Email" />
      </form>
    </div>
  );
}
