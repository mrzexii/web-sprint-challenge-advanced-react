import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppClass from './AppClass'; // You can import the component you want to test here

test('renders headings, buttons, and links', () => {
  const { getByText, getByTestId } = render(<AppClass />);
  
  // Test that the headings, buttons, and links are visible on the screen
  expect(getByText('Coordinates (2, 2)')).toBeInTheDocument();
  expect(getByText('You moved 0 times')).toBeInTheDocument();
  expect(getByTestId('left')).toBeInTheDocument();
  expect(getByTestId('up')).toBeInTheDocument();
  expect(getByTestId('right')).toBeInTheDocument();
  expect(getByTestId('down')).toBeInTheDocument();
  expect(getByTestId('reset')).toBeInTheDocument();
});

test('changes input value when typing', () => {
  const { getByTestId } = render(<AppClass />);
  const emailInput = getByTestId('email');
  
  // Test that typing in the email input changes its value
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput.value).toBe('test@example.com');
});

// You can add more tests here
