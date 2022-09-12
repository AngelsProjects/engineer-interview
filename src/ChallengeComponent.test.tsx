import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChallengeComponent } from './ChallengeComponent';
import { renderWithProviders } from './utils/test-utils';

describe('ChallengeComponent', () => {
  test('should render', () => {
    renderWithProviders(<ChallengeComponent testMode={true} />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [],
        },
      },
    });
    expect(screen.getByTestId('states-container')).toBeInTheDocument();
    expect(screen.getByTestId('form-container')).toBeInTheDocument();
  });

  test('should add a task', async () => {
    const { store } = renderWithProviders(
      <ChallengeComponent testMode={true} />,
      {
        preloadedState: {
          tasks: {
            0: [],
            1: [],
            2: [],
          },
        },
      }
    );
    const input = screen.getByPlaceholderText('Add Task') as HTMLInputElement;
    const button = screen.getByText('+');
    const taskName = faker.lorem.sentence(5);
    const user = userEvent.setup();
    await user.type(input, taskName);
    await user.click(button);
    expect(input).toHaveValue('');
    expect(screen.getByText(taskName)).toBeInTheDocument();
    const tasks = store.getState().tasks;
    expect(tasks[0].length).toBe(1);
  });

  test('should move a task to the next state', async () => {
    const { store } = renderWithProviders(
      <ChallengeComponent testMode={true} />,
      {
        preloadedState: {
          tasks: {
            0: [],
            1: [],
            2: [],
          },
        },
      }
    );
    const input = screen.getByPlaceholderText('Add Task') as HTMLInputElement;
    const button = screen.getByText('+');
    const taskName = faker.lorem.sentence(5);
    const user = userEvent.setup();
    await user.type(input, taskName);
    await user.click(button);
    const nextButton = screen.getByTestId('arrow-move-button-right');
    await user.click(nextButton);
    expect(screen.getByText(taskName)).toBeInTheDocument();
    const tasks = store.getState().tasks;
    expect(tasks[0].length).toBe(0);
    expect(tasks[1].length).toBe(1);
  });

  test('should move a task to the previous state', async () => {
    const { store } = renderWithProviders(
      <ChallengeComponent testMode={true} />,
      {
        preloadedState: {
          tasks: {
            0: [],
            1: [],
            2: [],
          },
        },
      }
    );
    const input = screen.getByPlaceholderText('Add Task') as HTMLInputElement;
    const button = screen.getByText('+');
    const taskName = faker.lorem.sentence(5);
    const user = userEvent.setup();
    await user.type(input, taskName);
    await user.click(button);
    const nextButton = screen.getByTestId('arrow-move-button-right');
    await user.click(nextButton);
    const previousButton = screen.getByTestId('arrow-move-button-left');
    await user.click(previousButton);
    expect(screen.getByText(taskName)).toBeInTheDocument();
    const tasks = store.getState().tasks;
    expect(tasks[0].length).toBe(1);
    expect(tasks[1].length).toBe(0);
  });

  test('should not move a task to the previous state when it is in the first state', async () => {
    const { store } = renderWithProviders(
      <ChallengeComponent testMode={true} />,
      {
        preloadedState: {
          tasks: {
            0: [],
            1: [],
            2: [],
          },
        },
      }
    );
    const input = screen.getByPlaceholderText('Add Task') as HTMLInputElement;
    const button = screen.getByText('+');
    const taskName = faker.lorem.sentence(5);
    const user = userEvent.setup();
    await user.type(input, taskName);
    await user.click(button);
    const previousButton = screen.getByTestId('arrow-move-button-left');
    await user.click(previousButton);
    expect(screen.getByText(taskName)).toBeInTheDocument();
    const tasks = store.getState().tasks;
    expect(tasks[0].length).toBe(1);
    expect(tasks[1].length).toBe(0);
  });

  test('should not move a task to the next state when it is in the last state', async () => {
    const { store } = renderWithProviders(
      <ChallengeComponent testMode={true} />,
      {
        preloadedState: {
          tasks: {
            0: [],
            1: [],
            2: [],
          },
        },
      }
    );
    const input = screen.getByPlaceholderText('Add Task') as HTMLInputElement;
    const button = screen.getByText('+');
    const taskName = faker.lorem.sentence(5);
    const user = userEvent.setup();
    await user.type(input, taskName);
    await user.click(button);
    const nextButton = screen.getByTestId('arrow-move-button-right');
    await user.click(nextButton);
    await user.click(nextButton);
    expect(screen.getByText(taskName)).toBeInTheDocument();
    const tasks = store.getState().tasks;
    expect(tasks[0].length).toBe(0);
    expect(tasks[1].length).toBe(1);
  });
});
