import './ChallengeComponent.scss';
import states from './constants/states';
import FormContainer from './components/containers/FormContainer';
import StateContainer from './components/containers/StateContainer';

/**
 * ChallengeComponent is a component that displays the states and tasks in the
 * application. It also displays a form to add a new task. The component is
 * more a wrapper for the other components.
 *
 * @returns React Component
 */
export function ChallengeComponent() {
  return (
    <>
      <div
        className='Challenge-Spacing Challenge-States'
        data-testid='states-container'
      >
        {states.map((state) => (
          <StateContainer key={state.id} state={state} />
        ))}
      </div>
      <div
        className='Challenge-Spacing Challenge-Form'
        data-testid='form-container'
      >
        <FormContainer />
      </div>
    </>
  );
}
