import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('Renders AppFunctional component without errors', () => {
  render(<AppFunctional />);
});

test('Renders AppFunctional component with coordinates and step count', () => {
  render(<AppFunctional />);
  expect(screen.getByText('Coordinates (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
});

test('Renders AppFunctional component with message', () => {
  render(<AppFunctional />);
  expect(screen.getByText('An initial message')).toBeInTheDocument();
});

test('Renders AppFunctional component with buttons', () => {
  render(<AppFunctional />);
  expect(screen.getByText('LEFT')).toBeInTheDocument();
  expect(screen.getByText('UP')).toBeInTheDocument();
  expect(screen.getByText('RIGHT')).toBeInTheDocument();
  expect(screen.getByText('DOWN')).toBeInTheDocument();
  expect(screen.getByText('reset')).toBeInTheDocument();
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
expect(screen.getByText(/Ouch: email must be a valid email/i).toBeInTheDocument();
});

test('Submit does not reset coordinates nor steps', () => {
  render(<AppClass />);

  // Perform actions: up, right, type valid email, submit
  const upButton = screen.getByText('UP');
  const rightButton = screen.getByText('RIGHT');
  const emailInput = screen.getByPlaceholderText('Type email');
  const submitButton = screen.getByText('Submit Email');

  fireEvent.click(upButton);
  fireEvent.click(rightButton);
  fireEvent.change(emailInput, { target: { value: 'lady@gaga.com' } });
  fireEvent.click(submitButton);

  // Wait for the success message
  const successMessage = screen.getByText(/lady win #\d+/i);
  expect(successMessage).toBeInTheDocument();

  // Verify that coordinates and steps remain unchanged
  const coordinates = screen.getByText(/Coordinates \(\d, \d\)/i);
  const steps = screen.getByText(/You moved \d+ times/i);

  // You may adjust the expected values as per your component's behavior
  expect(coordinates.textContent).toMatch(/\(3.*1\)$/);
  expect(steps.textContent).toBe('You moved 2 times');
});
