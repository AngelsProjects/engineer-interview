import App from './App';
import { renderWithProviders } from './utils/test-utils';
import { screen } from '@testing-library/react';

describe('App', () => {
  test('should render App root component', () => {
    renderWithProviders(<App />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [],
        },
      },
    });
    expect(screen.getByTestId('root-app')).toBeInTheDocument();
  });
});
