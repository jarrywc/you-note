import { render, screen} from '@testing-library/react';
import App from './App';

test("Testing App.js", () => {
  render(<App />);

  const linkElement = screen.getByText(/Hide List/);
  expect(linkElement).toBeInTheDocument();
});
