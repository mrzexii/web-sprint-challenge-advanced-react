import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('Renders AppFunctional component without errors', () => {
  render(<AppFunctional />);
});


test('Displays initial coordinates and steps', () => {
  render(<AppFunctional />);
  expect(screen.getByText('Coordinates (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
});

test('Typing in the email input changes its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'type email' });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput).toHaveValue('test@example.com');
});

test('Reset button resets the component', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'type email' });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  const resetButton = screen.getByRole('button', { name: 'reset' });
  fireEvent.click(resetButton);

  expect(emailInput).toHaveValue('');
  expect(screen.getByText('Coordinates (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
});


test('Displays error message on invalid email submission', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'type email' });
  const submitButton = screen.getByRole('button', { name: 'Submit Email' });

  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.click(submitButton);

  expect(screen.getByText('Ouch: email must be a valid email')).toBeInTheDocument();
});
