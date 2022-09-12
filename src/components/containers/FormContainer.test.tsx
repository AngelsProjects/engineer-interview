import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import FormContainer from './FormContainer';

describe('Form Container Component', () => {
  test('renders FormContainer component', () => {
    renderWithProviders(<FormContainer />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [],
        },
      },
    });
    const formElement = screen.getByRole('form', { name: /Add a new task/i });
    expect(formElement).toBeInTheDocument();
  });

  test('should add task to redux store when form is submitted', async () => {
    renderWithProviders(<FormContainer />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [],
        },
      },
    });
    const inputElement = screen.getByPlaceholderText('Add Task');
    const user = userEvent.setup();
    await user.type(inputElement, 'New Task');
    await user.keyboard('{Enter}');
    expect(inputElement.nodeValue).toBe(null);
  });

  test('should add task to redux store when clicked the submit button', async () => {
    const { store } = renderWithProviders(<FormContainer />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [],
        },
      },
    });
    const inputElement = screen.getByPlaceholderText(
      'Add Task'
    ) as HTMLInputElement;
    const buttonElement = screen.getByRole('button', { name: '+' });
    const taskName = faker.lorem.sentence(5);
    const user = userEvent.setup();
    await user.type(inputElement, taskName);
    await user.click(buttonElement);
    expect(inputElement).toHaveValue('');
    const taskAdded = store.getState().tasks.taskAdded;
    expect(store.getState().tasks).toEqual({
      0: [taskAdded],
      1: [],
      2: [],
      taskAdded,
    });
  });

  test('should clear board when clicked the Clear Button', async () => {
    const { store } = renderWithProviders(<FormContainer />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [],
        },
      },
    });
    // Add a task to the store
    const inputElement = screen.getByPlaceholderText('Add Task');
    const user = userEvent.setup();
    await user.type(inputElement, 'New Task');
    await user.keyboard('{Enter}');
    expect(inputElement.nodeValue).toBe(null);

    // Remove the task from the store
    const button = screen.getByTestId('clear-button');
    await user.click(button);
    expect(store.getState().tasks).toEqual({
      0: [],
      1: [],
      2: [],
    });
  });
});
