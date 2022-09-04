import { EnumStateId } from "./state";

// Task is an interface that represents a task. It has an id, a title, and a stateId.
export default interface Task {
  id: string;
  taskName: string;
  stateId: EnumStateId;
}
