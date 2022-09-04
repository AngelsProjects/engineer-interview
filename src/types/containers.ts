import { State } from "../interfaces/state";
import Task from "../interfaces/task";

// StateContainerProps is an type that represents the props of the StateContainer component.
export type StateContainerProps = {
  state: State;
};

// TaskContainerProps is an type that represents the props of the TaskContainer component.
export type TaskContainerProps = {
  task: Task;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
};
