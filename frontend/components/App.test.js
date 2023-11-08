import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('Renders AppFunctional component without errors', () => {
  render(<AppFunctional />);
});

test('Renders AppFunctional component with coordinates and step count', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/Coordinates \(\d, \d\)/i)).toBeInTheDocument();
  expect(screen.getByText(/You moved \d+ times/i)).toBeInTheDocument();
});

test('Renders AppFunctional component with message', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/An initial message/i)).toBeInTheDocument();
});

test('Renders AppFunctional component with buttons', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/LEFT/i)).toBeInTheDocument();
  expect(screen.getByText(/UP/i)).toBeInTheDocument();
  expect(screen.getByText(/RIGHT/i)).toBeInTheDocument();
  expect(screen.getByText(/DOWN/i)).toBeInTheDocument();
  expect(screen.getByText(/reset/i)).toBeInTheDocument();
});

test('Typing on the input changes its value', () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText('Type email');
  fireEvent.change(input, { target: { value: 'example@example.com' } });
  expect(screen.getByDisplayValue(/example@example.com/i)).toBeInTheDocument();
});

test('Renders AppFunctional component with submit button', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/Submit Email/i)).toBeInTheDocument();
});

test('Check for custom error message', () => {
  render(<AppFunctional />);

  // Write a custom matcher function
  const customMatcher = (content, element) => {
    return element.textContent.includes(content);
  };

  // Use the custom matcher to find the error message
  const errorMessage = 'Ouch: email must be a valid email';
  expect(screen.getByText((content, element) => customMatcher(errorMessage, element))).toBeInTheDocument();
});
