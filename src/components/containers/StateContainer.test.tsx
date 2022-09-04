import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import StateContainer from './StateContainer';

const WrappedState0Container = () => {
  return <StateContainer state={{ id: 0, title: 'To Do' }} />;
};

const WrappedState1Container = () => {
  return <StateContainer state={{ id: 1, title: 'In Progress' }} />;
};

const WrappedState2Container = () => {
  return <StateContainer state={{ id: 2, title: 'Done' }} />;
};

describe('State Container Component', () => {
  test('renders StateContainer component', () => {
    renderWithProviders(<WrappedState0Container />);
    const stateContainerElement = screen.getByTestId('state-title');
    expect(stateContainerElement).toBeInTheDocument();
  });

  test('should render the correct state title (To Do)', () => {
    renderWithProviders(<WrappedState0Container />);
    const stateContainerElement = screen.getByTestId('state-title');
    expect(stateContainerElement.textContent).toBe('To Do');
  });

  test('should render the correct state title (In Progress)', () => {
    renderWithProviders(<WrappedState1Container />);
    const stateContainerElement = screen.getByTestId('state-title');
    expect(stateContainerElement.textContent).toBe('In Progress');
  });

  test('should render the correct state title (Done)', () => {
    renderWithProviders(<WrappedState2Container />);
    const stateContainerElement = screen.getByTestId('state-title');
    expect(stateContainerElement.textContent).toBe('Done');
  });

  test('should render the correct number of tasks (To Do)', () => {
    const totalTasks = faker.datatype.number({ min: 1, max: 10 });
    const tasks = Array.from({ length: totalTasks }, () => ({
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: 0,
    }));

    renderWithProviders(<WrappedState0Container />, {
      preloadedState: {
        tasks: {
          0: tasks,
          1: [],
          2: [],
        },
      },
    });
    const taskContainerElements = screen.getAllByTestId('task-container');
    expect(taskContainerElements).toHaveLength(totalTasks);
  });

  test('should render the correct number of tasks (In Progress)', () => {
    const totalTasks = faker.datatype.number({ min: 1, max: 10 });
    const tasks = Array.from({ length: totalTasks }, () => ({
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: 1,
    }));

    renderWithProviders(<WrappedState1Container />, {
      preloadedState: {
        tasks: {
          0: [],
          1: tasks,
          2: [],
        },
      },
    });
    const taskContainerElements = screen.getAllByTestId('task-container');
    expect(taskContainerElements).toHaveLength(totalTasks);
  });

  test('should render the correct number of tasks (Done)', () => {
    const totalTasks = faker.datatype.number({ min: 1, max: 10 });
    const tasks = Array.from({ length: totalTasks }, () => ({
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: 2,
    }));

    renderWithProviders(<WrappedState2Container />, {
      preloadedState: {
        tasks: {
          0: [],
          1: [],
          2: tasks,
        },
      },
    });
    const taskContainerElements = screen.getAllByTestId('task-container');
    expect(taskContainerElements).toHaveLength(totalTasks);
  });
});
