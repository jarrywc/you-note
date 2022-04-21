import { render} from '@testing-library/react';
import App from './App';

test("Testing App.js", () => {
  const {getByText} = render(<App />);

  const linkElement = getByText(/Show List/);
  expect(linkElement).toBeInTheDocument();
});
