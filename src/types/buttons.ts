// Direction is a type that represents the direction to move a task.
export enum Direction {
  Left = "left",
  Right = "right",
}

// MoveButtonProps is a type that represents the props of the MoveButton component.
export type MoveButtonProps = {
  direction: Direction;
  onClicked: () => void;
  disabled?: boolean;
};

// SubmitButtonProps is a type that represents the props of the SubmitButton component.
export type SubmitButtonProps = {
  onClicked: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};
