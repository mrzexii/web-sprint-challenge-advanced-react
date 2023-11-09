
import React from 'react';
import { render, screen, fireEvent , waitFor} from '@testing-library/react';
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
  const emailInput = screen.getByRole('textbox', { name: 'Type email' });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput).toHaveValue('test@example.com');
});
test('Displays error message on missing email', async () => {
  render(<AppFunctional />);
  const submitButton = screen.getByRole('button', { name: 'Submit Email' });
  fireEvent.click(submitButton);
  // Use queryByText with a regular expression
  const errorMessage = screen.queryByText(/Ouch: email is required/i);
  // Check if the errorMessage is null (not found) or if it exists
  expect(errorMessage).not.toBeNull();
});
test('Displays error message on invalid email format', async () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'Type email' });
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  const submitButton = screen.getByRole('button', { name: 'Submit Email' });
  fireEvent.click(submitButton);
  // Use queryByText with a regular expression
  const errorMessage = screen.queryByText(/Ouch: email must be a valid email/i);
  // Check if the errorMessage is null (not found) or if it exists
  expect(errorMessage).not.toBeNull();
});
test('Displays error message "foo@bar.baz failure #71" for specific email', async () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'Type email' });
  fireEvent.change(emailInput, { target: { value: 'foo@bar.baz' } });
  const submitButton = screen.getByRole('button', { name: 'Submit Email' });
  fireEvent.click(submitButton);
  // Use queryByText with a regular expression
  const errorMessage = screen.queryByText(/foo@bar\.baz/i);
  // Check if the errorMessage is null (not found) or if it exists
  const renderedComponent = screen.container;
  console.log(renderedComponent.innerHTML);
  
test('Reset button resets the component', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'Type email' });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  const resetButton = screen.getByRole('button', { name: 'reset' });
  fireEvent.click(resetButton);
  expect(emailInput).toHaveValue('');
  expect(screen.getByText('Coordinates (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
})
