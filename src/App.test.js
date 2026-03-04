import { render, screen } from '@testing-library/react';
import App from './App';

test('renders primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /test cases/i })).toBeInTheDocument();
});
