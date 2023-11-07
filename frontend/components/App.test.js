
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

  // Use queryByText to look for the error message
  const errorMessage = screen.queryByText(/Ouch: email is required/);

  // Check if the errorMessage is null (not found) or if it exists
  expect(errorMessage).not.toBeNull();
});
test('Reset button resets the component', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByRole('textbox', { name: 'Type email' });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  const resetButton = screen.getByRole('button', { name: 'reset' });
  fireEvent.click(resetButton);
  expect(emailInput).toHaveValue('');
  expect(screen.getByText('Coordinates (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
});

test(`[F6 ${label}] Actions: down, right, type foo@bar.baz email, submit
  Error message on banned email is correct`, async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText('DOWN')); // Click the DOWN button
  fireEvent.click(screen.getByText('RIGHT')); // Click the RIGHT button

  // Modify the email input
  const emailInput = screen.getByRole('textbox', { name: 'Type email' });
  fireEvent.change(emailInput, { target: { value: 'foo@bar.baz' } });

  const submitButton = screen.getByRole('button', { name: 'Submit Email' });
  fireEvent.click(submitButton);

  // Use waitFor to wait for the expected message
  await waitFor(() => {
    const errorMessage = screen.getByText('foo@bar.baz');
    expect(errorMessage).toBeInTheDocument();
  });
});
