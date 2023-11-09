import React, { Component } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

class AppClass extends Component {
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
      this.setState({ message: `Ouch: You can't go ${direction}` });
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
      this.setState({ message: 'Ouch: Email is required' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({ message: 'Ouch: Email must be a valid email' });
      return;
    }

    if (email === 'foo@bar.baz') {
      this.setState({ message: `${email} failure #71` });
    } else {
      axios
        .post('http://localhost:9000/api/result', {
          email: email,
          x: this.state.XY.X,
          y: this.state.XY.Y,
          steps: this.state.steps,
        })
        .then((res) => {
          this.setState({ message: `${email} win #24` });
        })
        .catch((error) => {
          this.setState({ message: 'An error occurred while sending the data to the server.' });
        });
    }

    this.setState({ email: '' });
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
