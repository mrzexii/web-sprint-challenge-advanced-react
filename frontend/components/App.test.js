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

test('Button labels are rendered on the screen', () => {
  render(<AppFunctional />);
  expect(screen.getByText('LEFT')).toBeInTheDocument();
  expect(screen.getByText('UP')).toBeInTheDocument();
  expect(screen.getByText('RIGHT')).toBeInTheDocument();
  expect(screen.getByText('DOWN')).toBeInTheDocument();
  expect(screen.getByText('reset')).toBeInTheDocument();
  expect(screen.getByText('Submit Email')).toBeInTheDocument();
});

test('Typing in the email input changes its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'type email' });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput).toHaveValue('test@example.com');
});

test('Input value changes when typing', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'type email' });
  fireEvent.change(emailInput, { target: { value: 'new-email@example.com' } });
  expect(emailInput).toHaveValue('new-email@example.com');
});

test('Displays the error message for no email using a regex matcher', () => {
  render(<AppFunctional />);
  const submitButton = screen.getByRole('button', { name: 'Submit Email' });
  fireEvent.click(submitButton);
  expect(screen.getByText(/Ouch: email is required/)).toBeInTheDocument();
});

test('Displays the error message for a banned email', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'type email' });
  const submitButton = screen.getByRole('button', { name: 'Submit Email' });

  // Enter the banned email 'foo@bar.baz' and trigger form submission
  fireEvent.change(emailInput, { target: { value: 'foo@bar.baz' } });
  fireEvent.click(submitButton);

  // Find the error message by its role and match it with the expected text
  const errorMessage = screen.getByRole('alert', { name: 'Error Message' });

  expect(errorMessage).toHaveTextContent(/foo@bar.baz/i);
});
