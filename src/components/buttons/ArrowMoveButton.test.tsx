import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Direction } from '../../types/buttons';
import ArrowMoveButton from './ArrowMoveButton';

describe('Arrow Move Button Component', () => {
  test('renders ArrowMoveButton component', () => {
    render(
      <ArrowMoveButton
        direction={Direction.Left}
        onClicked={() => {}}
        disabled={false}
      />
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('should log Arrow left clicked when clicked', async () => {
    const onClicked = jest.fn();
    render(
      <ArrowMoveButton
        direction={Direction.Left}
        onClicked={onClicked}
        disabled={false}
      />
    );
    const user = userEvent.setup();
    const buttonElement = screen.getByRole('button');
    await user.click(buttonElement);
    expect(onClicked).toHaveBeenCalled();
  });

  test('should not log Arrow left clicked when clicked and disabled', async () => {
    const onClicked = jest.fn();
    render(
      <ArrowMoveButton
        direction={Direction.Left}
        onClicked={onClicked}
        disabled={true}
      />
    );
    const user = userEvent.setup();
    const buttonElement = screen.getByRole('button');
    await user.click(buttonElement);
    expect(onClicked).not.toHaveBeenCalled();
  });
});
