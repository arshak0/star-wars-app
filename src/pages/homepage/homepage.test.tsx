import React from 'react';
import { render, screen } from '@testing-library/react';
import Homepage from './homepage';

test('renders learn react link', () => {
  render(<Homepage />);
  const linkElement = screen.getByText(/list of people/i);
  expect(linkElement).toBeInTheDocument();
});
