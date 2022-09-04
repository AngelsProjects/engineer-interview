import { addTask, deleteTask, clearBoard, moveTask } from "./taskSlice";
import { EnumStateId } from "../interfaces/state";
import Task from "../interfaces/task";
import { Direction } from "../types/buttons";
import { setupStore } from "./index";
import { faker } from "@faker-js/faker";

describe("taskSlice reducer", () => {
  it("should handle initial state", () => {
    expect(setupStore().getState().tasks).toEqual({
      [EnumStateId.ToDo]: [],
      [EnumStateId.InProgress]: [],
      [EnumStateId.Done]: [],
    });
  });

  it("should handle addTask", () => {
    const taskName = faker.lorem.sentence(5);
    const store = setupStore();
    store.dispatch(addTask(taskName));
    const taskAdded = store.getState().tasks.taskAdded;
    const expected = {
      tasks: {
        [EnumStateId.ToDo]: [taskAdded],
        [EnumStateId.InProgress]: [],
        [EnumStateId.Done]: [],
        taskAdded,
      },
    };
    expect(store.getState()).toEqual(expected);
  });

  it("should handle moveTask to the right", () => {
    const task: Task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.InProgress,
    };
    const store = setupStore({
      tasks: {
        [EnumStateId.ToDo]: [],
        [EnumStateId.InProgress]: [task],
        [EnumStateId.Done]: [],
      },
    });
    const expected = {
      tasks: {
        [EnumStateId.ToDo]: [],
        [EnumStateId.InProgress]: [],
        [EnumStateId.Done]: [{ ...task, stateId: EnumStateId.Done }],
      },
    };
    store.dispatch(moveTask({ direction: Direction.Right, task }));
    expect(store.getState()).toEqual(expected);
  });

  it("should handle moveTask to the left", () => {
    const task: Task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.InProgress,
    };
    const store = setupStore({
      tasks: {
        [EnumStateId.ToDo]: [],
        [EnumStateId.InProgress]: [task],
        [EnumStateId.Done]: [],
      },
    });
    const expected = {
      tasks: {
        [EnumStateId.ToDo]: [{ ...task, stateId: EnumStateId.ToDo }],
        [EnumStateId.InProgress]: [],
        [EnumStateId.Done]: [],
      },
    };
    store.dispatch(moveTask({ direction: Direction.Left, task }));
    expect(store.getState()).toEqual(expected);
  });

  it("should handle clearBoard", () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.InProgress,
    };
    const store = setupStore({
      tasks: {
        [EnumStateId.ToDo]: [],
        [EnumStateId.InProgress]: [task],
        [EnumStateId.Done]: [],
      },
    });
    const expected = {
      tasks: {
        [EnumStateId.ToDo]: [],
        [EnumStateId.InProgress]: [],
        [EnumStateId.Done]: [],
      },
    };
    store.dispatch(clearBoard());
    expect(store.getState()).toEqual(expected);
  });

  it("should delete a task from the board", () => {
    const task = {
      id: faker.datatype.uuid(),
      taskName: faker.lorem.sentence(5),
      stateId: EnumStateId.InProgress,
    };
    const store = setupStore({
      tasks: {
        [EnumStateId.ToDo]: [],
        [EnumStateId.InProgress]: [task],
        [EnumStateId.Done]: [],
      },
    });
    const expected = {
      tasks: {
        [EnumStateId.ToDo]: [],
        [EnumStateId.InProgress]: [],
        [EnumStateId.Done]: [],
      },
    };
    store.dispatch(deleteTask(task));
    expect(store.getState()).toEqual(expected);
  });
});
