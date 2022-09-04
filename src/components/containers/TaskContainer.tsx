import { memo, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { EnumStateId } from '../../interfaces/state';
import { deleteTask, moveTask } from '../../store/taskSlice';
import { Direction } from '../../types/buttons';
import { TaskContainerProps } from '../../types/containers';
import ArrowMoveButton from '../buttons/ArrowMoveButton';
import './TaskContainer.scss';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import clsx from 'clsx';

/**
 * TaskContainer is a component that displays a task and allows the user to move
 * the task to the left or right depending on the state of the task.
 * @param params TaskContainerProps
 * @returns React Component
 */
function TaskContainer({ task }: TaskContainerProps) {
  const dispatch = useAppDispatch();

  const [showFullTask, setShowFullTask] = useState(false);

  const deleteTaskFn = () => {
    dispatch(deleteTask(task));
  };

  const moveTaskFn = (direction: Direction) => () =>
    dispatch(moveTask({ direction, task }));

  const showFullTaskFn = () => {
    setShowFullTask((previousState) => !previousState);
  };

  return (
    <div className='Task-Container' data-testid='task-container'>
      <button
        className='Task-Delete-Button'
        onClick={deleteTaskFn}
        data-testid='delete-button'
      >
        <TrashIcon className='Task-Trash-Icon' />
      </button>
      <ArrowMoveButton
        direction={Direction.Left}
        onClicked={moveTaskFn(Direction.Left)}
        disabled={task.stateId === EnumStateId.ToDo}
      />
      <h3
        className={clsx({ 'Task-Show-Full-Task': showFullTask })}
        onClick={showFullTaskFn}
      >
        {task.taskName}
      </h3>
      <ArrowMoveButton
        direction={Direction.Right}
        onClicked={moveTaskFn(Direction.Right)}
        disabled={task.stateId === EnumStateId.Done}
      />
    </div>
  );
}

export default memo(TaskContainer);
