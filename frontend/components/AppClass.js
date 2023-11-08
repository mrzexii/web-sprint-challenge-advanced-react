import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

class AppClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      XY: { X: 2, Y: 2 },
      index: initialIndex,
      steps: initialSteps,
      message: initialMessage,
      email: initialEmail,
    };
  }

  getXY(index) {
    // Calculate the X and Y coordinates based on the current index
    const X = index % 3 + 1;
    const Y = Math.floor(index / 3) + 1;
    return { X, Y };
  }

  reset() {
    this.setState({
      XY: { X: 2, Y: 2 },
      index: initialIndex,
      steps: initialSteps,
      message: initialMessage,
      email: initialEmail,
    });
  }

  getNextIndex(direction) {
    const currentIndex = this.state.index;
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

  move(direction) {
    const nextIndex = this.getNextIndex(direction);
    if (nextIndex === this.state.index) {
      this.setState({ message: `You can't go ${direction}` });
    } else {
      this.setState((prevState) => ({
        index: nextIndex,
        steps: prevState.steps + 1,
        XY: this.getXY(nextIndex),
        message: '',
      }));
    }
  }

  onSubmit(evt) {
    evt.preventDefault();

    const { email } = this.state;

    if (!email) {
      this.setState({ message: 'Email is required' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({ message: 'Ouch: email must be a valid email' });
      return;
    }

    if (email === 'foo@bar.baz') {
      this.setState({ message: 'foo@bar.baz' });
    } else {
      // Make a POST request to the server
      fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send email in JSON format
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // You can parse the response if it's in JSON format
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => {
          // Handle a successful response
          this.setState({ message: 'Data sent successfully', email: '' });
        })
        .catch((error) => {
          // Handle errors
          this.setState({ message: `Error: ${error.message}` });
        });
    }
  }

  render() {
    const { XY, index, steps, message, email } = this.state;

    return (
      <div id="wrapper" className={this.props.className}>
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
          <button id="left" onClick={() => this.move('left')}>LEFT</button>
          <button id="up" onClick={() => this.move('up')}>UP</button>
          <button id="right" onClick={() => this.move('right')}>RIGHT</button>
          <button id="down" onClick={() => this.move('down')}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            id="email"
            type="email"
            placeholder="Type email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          ></input>
          <input id="submit" type="submit" value="Submit Email"></input>
        </form>
      </div>
    );
  }
}

export default AppClass;
