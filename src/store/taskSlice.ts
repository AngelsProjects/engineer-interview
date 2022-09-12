import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import Task from '../interfaces/task';
import { Direction } from '../types/buttons';
import { EnumStateId } from './../interfaces/state';

interface TaskState {
  [EnumStateId.ToDo]: Task[];
  [EnumStateId.InProgress]: Task[];
  [EnumStateId.Done]: Task[];
  taskAdded?: Task;
}

const initialState: TaskState = {
  [EnumStateId.ToDo]: [],
  [EnumStateId.InProgress]: [],
  [EnumStateId.Done]: [],
};

// Task Slice is a Redux slice that manages the state of the tasks.
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // addTask adds a task to the state.
    addTask: (state, action: PayloadAction<string>) => {
      const taskAdded = {
        id: uuidv4(),
        taskName: action.payload,
        stateId: EnumStateId.ToDo,
      };
      state[EnumStateId.ToDo] = [...state[EnumStateId.ToDo], taskAdded];
      state.taskAdded = taskAdded;
    },
    // deleteTask deletes a task from the state.
    deleteTask: (state, action: PayloadAction<Task>) => {
      state[action.payload.stateId] = state[action.payload.stateId].filter(
        (task) => task.id !== action.payload.id
      );
    },
    // moveTask moves a task to the next state.
    moveTask: (
      state,
      action: PayloadAction<{ direction: Direction; task: Task }>
    ) => {
      const { direction, task } = action.payload;
      const { stateId } = task;
      if (direction === 'left' && stateId && stateId > 0) {
        state[(stateId - 1) as EnumStateId].push({
          ...task,
          stateId: (stateId - 1) as EnumStateId,
        });
        state[stateId] = state[stateId].filter((t) => t.id !== task.id);
      } else if (direction === 'right' && stateId < 2) {
        const newStateId = stateId + 1;
        state[newStateId as EnumStateId].push({
          ...task,
          stateId: newStateId as EnumStateId,
        });
        state[stateId] = state[stateId].filter((t) => t.id !== task.id);
      } else {
        return;
      }
    },
    // updateTask updates a task in the state.
    clearBoard: () => initialState,
    // fill Board from API
    fillBoard: (state, action: PayloadAction<TaskState>) =>
      (state = action.payload),
  },
});

// Action creators are generated for each case reducer function
export const { addTask, deleteTask, clearBoard, moveTask, fillBoard } =
  taskSlice.actions;

// taskReducer is the reducer for the task slice.
export const taskReducer = taskSlice.reducer;
