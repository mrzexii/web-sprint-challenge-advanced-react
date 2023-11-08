import React from 'react';
import { render, screen, fireEvent , waitFor} from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('Renders AppFunctional component without errors', () => {
  render(<AppFunctional />);
});

test('Renders AppFunctional component with coordinates and step count', () => {
  render(<AppFunctional />);
  expect(screen.getByText('Coordinates')).toBeInTheDocument();
  expect(screen.getByText('You moved')).toBeInTheDocument();
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
  expect(screen.getByDisplayValue('example@example.com')).toBeInTheDocument();
});

test('Renders AppFunctional component with submit button', () => {
  render(<AppFunctional />);
  expect(screen.getByText('Submit Email')).toBeInTheDocument();
});
