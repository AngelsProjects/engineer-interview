import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { Inputs } from '../../types/inputs';
import { addTask, clearBoard } from '../../store/taskSlice';
import './FormContainer.scss';

/**
 * FormContainer is a component that allows the user to add a new task to the
 * "To Do" state by entering a task name. The task name is then added to the
 * redux store and the input is cleared. The user can also press the enter key
 * to submit the form.
 *
 * @returns React Component
 */
function FormContainer() {
  const dispatch = useAppDispatch();
  const { handleSubmit, register, reset } = useForm<Inputs>();

  // SubmitHandler is a type from react-hook-form that handles the form submission
  // and returns the form data.
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(addTask(data.taskName));
    reset();
  };

  const clearBoardFn = () => dispatch(clearBoard());

  return (
    <form
      aria-label='Add a new task'
      onSubmit={handleSubmit(onSubmit)}
      className='Form-Container'
    >
      <input
        {...register('taskName', { required: true })}
        placeholder='Add Task'
      />
      <button type='submit' className='Task-Submit-Button'>
        +
      </button>
      <span></span>
      <button
        className='Task-Clear-Button'
        onClick={clearBoardFn}
        data-testid='clear-button'
      >
        Clear Board
      </button>
    </form>
  );
}

export default FormContainer;
