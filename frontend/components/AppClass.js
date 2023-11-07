import React from 'react';

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  state = initialState;

  getXY = () => {
    // Calculate X and Y coordinates based on the current index
    const x = this.state.index % 3;
    const y = Math.floor(this.state.index / 3);
    return { x, y };
  }

  getXYMessage = () => {
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  }

  reset = () => {
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // Calculate the next index based on the direction
    let nextIndex = this.state.index;
    switch (direction) {
      case 'left':
        nextIndex = (this.state.index % 3 > 0) ? this.state.index - 1 : this.state.index;
        break;
      case 'up':
        nextIndex = (this.state.index >= 3) ? this.state.index - 3 : this state.index;
        break;
      case 'right':
        nextIndex = (this.state.index % 3 < 2) ? this.state.index + 1 : this.state.index;
        break;
      case 'down':
        nextIndex = (this.state.index < 6) ? this.state.index + 3 : this.state.index;
        break;
      default:
        break;
    }
    return nextIndex;
  }

  move = (evt) => {
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);
    if (nextIndex !== this.state.index) {
      this.setState({
        index: nextIndex,
        steps: this.state.steps + 1,
        message: `Moved ${direction}`,
      });
    } else {
      this.setState({
        message: `Cannot move ${direction}`,
      });
    }
  }

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { email } = this.state;

    // Check if the email is empty or invalid
    if (!email || !isValidEmail(email)) {
      this.setState({ message: 'Please provide a valid email' });
      return;
    }

    // The rest of your code to handle email submission goes here
    this.setState({ message: `Email submitted: ${this.state.email}` });
  }

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {Array.from({ length: 9 }, (_, idx) => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx === this.state.index ? 'B' : null}
            </div>
          )}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Type email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input id="submit" type="submit" value="Submit Email" />
        </form>
      </div>
    );
  }
}

// Function to validate email using a regular expression
function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
}
