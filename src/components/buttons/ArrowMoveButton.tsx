import clsx from 'clsx';
import { Direction, MoveButtonProps } from '../../types/buttons';
import './ArrowMoveButton.scss';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';

/**
 * ArrowMoveButton is a component that displays an arrow button that can be
 * clicked to move a task to the left or right. The button is disabled if the
 * task is in the first or last state (sent from the parent component).
 *
 * @param params MoveButtonProps
 * @returns React Component
 */
function ArrowMoveButton({ direction, disabled, onClicked }: MoveButtonProps) {
  return (
    <button
      className={clsx('Arrow-Move-Button', {
        'Arrow-Direction-Left': direction === Direction.Left,
        'Arrow-Direction-Right': direction === Direction.Right,
      })}
      onClick={onClicked}
      disabled={disabled}
      style={{
        transform: `rotate(${direction === 'left' ? 0 : 180}deg)`,
      }}
      data-testid={`arrow-move-button-${direction}`}
    >
      <ArrowIcon />
    </button>
  );
}

export default ArrowMoveButton;
