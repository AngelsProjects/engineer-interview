import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnumStateId } from '../../interfaces/state';
import { renderWithProviders } from '../../utils/test-utils';
import TaskContainer from './TaskContainer';

describe('Task Container Component', () => {
  test('renders TaskContainer component', () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.ToDo,
    };
    renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [task],
          1: [],
          2: [],
        },
      },
    });
    const taskContainerElement = screen.getByTestId('task-container');
    expect(taskContainerElement).toBeInTheDocument();
  });

  test('should render task name', () => {
    const taskName = faker.lorem.sentence(5);
    const task = {
      id: faker.datatype.uuid(),
      taskName,
      stateId: EnumStateId.ToDo,
    };
    renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [task],
          1: [],
          2: [],
        },
      },
    });
    const taskNameElement = screen.getByText(taskName);
    expect(taskNameElement).toBeInTheDocument();
  });

  test('should move task to the next state when clicked the right arrow button', () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.ToDo,
    };

    const { store } = renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [task],
          1: [],
          2: [],
        },
      },
    });
    const rightArrowButtonElement = screen.getByTestId(
      'arrow-move-button-right'
    );
    rightArrowButtonElement.click();
    expect(store.getState()).toEqual({
      tasks: {
        0: [],
        1: [{ ...task, stateId: EnumStateId.InProgress }],
        2: [],
      },
    });
  });

  test('should move task to the previous state when clicked the left arrow button', () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.InProgress,
    };
    const { store } = renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [task],
          2: [],
        },
      },
    });
    const leftArrowButtonElement = screen.getByTestId('arrow-move-button-left');
    leftArrowButtonElement.click();
    expect(store.getState()).toEqual({
      tasks: {
        0: [{ ...task, stateId: EnumStateId.ToDo }],
        1: [],
        2: [],
      },
    });
  });

  test('should be disabled the right arrow button when the task is in the last state', () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.Done,
    };
    renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [task],
        },
      },
    });
    const rightArrowButtonElement = screen.getByTestId(
      'arrow-move-button-right'
    );
    expect(rightArrowButtonElement).toBeDisabled();
  });

  test('should be disabled the left arrow button when the task is in the first state', () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.ToDo,
    };
    renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [task],
          1: [],
          2: [],
        },
      },
    });
    const leftArrowButtonElement = screen.getByTestId('arrow-move-button-left');
    expect(leftArrowButtonElement).toBeDisabled();
  });

  test('should not move task to the next state when clicked the right arrow button and the task is in the last state', () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.Done,
    };
    const { store } = renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: [task],
        },
      },
    });
    const rightArrowButtonElement = screen.getByTestId(
      'arrow-move-button-right'
    );
    rightArrowButtonElement.click();
    expect(store.getState()).toEqual({
      tasks: {
        0: [],
        1: [],
        2: [task],
      },
    });
  });

  test('should not move task to the previous state when clicked the left arrow button and the task is in the first state', () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.ToDo,
    };
    const { store } = renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [task],
          1: [],
          2: [],
        },
      },
    });
    const leftArrowButtonElement = screen.getByTestId('arrow-move-button-left');
    leftArrowButtonElement.click();
    expect(store.getState()).toEqual({
      tasks: {
        0: [task],
        1: [],
        2: [],
      },
    });
  });

  test('should delete task when clicked the delete button', async () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.ToDo,
    };
    const { store } = renderWithProviders(<TaskContainer task={task} />, {
      preloadedState: {
        tasks: {
          0: [task],
          1: [],
          2: [],
        },
      },
    });
    const deleteButtonElement = screen.getByTestId('delete-button');
    const user = userEvent.setup();
    await user.click(deleteButtonElement);
    expect(store.getState()).toEqual({
      tasks: {
        0: [],
        1: [],
        2: [],
      },
    });
  });
});
