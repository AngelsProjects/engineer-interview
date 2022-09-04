import { memo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Task from '../../interfaces/task';
import { RootState } from '../../store';
import { StateContainerProps } from '../../types/containers';
import './StateContainer.scss';
import TaskContainer from './TaskContainer';

/**
 * StateContainer is a component that displays a state and all the tasks that
 * belong to that state with a scrollable container.
 *
 * @param props StateContainerProps
 * @returns React Component
 */
function StateContainer({ state }: StateContainerProps) {
  const tasks = useAppSelector((rootState: RootState) => {
    return rootState.tasks[state.id];
  });

  return (
    <div className='State-Container'>
      <div className='State-Container-Header'>
        <h1 data-testid='state-title'>{state.title}</h1>
      </div>
      <div className='State-Container-Body'>
        {tasks.map((task: Task) => (
          <TaskContainer key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default memo(StateContainer);
