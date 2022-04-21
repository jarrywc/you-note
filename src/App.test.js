import { render} from '@testing-library/react';
import App from './App';

test("Testing App.js", () => {
  const {getByText} = render(<App />);

  const linkElement = getByText(/Landing Page/);
  expect(linkElement).toBeInTheDocument();
});
