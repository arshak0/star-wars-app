import React from 'react';
import { render, screen } from '@testing-library/react';
import PersonComponent from './PersonComponent';

test('renders learn react link', () => {
    render(<PersonComponent />);
    const linkElement = screen.getByText(/name:/i);
    expect(linkElement).toBeInTheDocument();
});
