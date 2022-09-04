// EnumStateId is an enum that represents the state of a task.
export enum EnumStateId {
  ToDo = 0,
  InProgress = 1,
  Done = 2,
}

// State is an interface that represents the state of a task.
export interface State {
  id: EnumStateId;
  title: string;
}
