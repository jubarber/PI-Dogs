import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home link', () => {
  render(<App />);
  const linkElement = screen.getByText(/HOME/i);
  expect(linkElement).toBeInTheDocument();
});
