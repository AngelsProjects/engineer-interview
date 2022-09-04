import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { taskReducer } from "./taskSlice";

// Create the root reducer from all the other reducers
const rootReducer = combineReducers({
  tasks: taskReducer,
});

// Create the store with the root reducer
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV === "development",
  });
}

// Crate the store with the root reducer
export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

// Inferred type is {tasks: TaskState}
export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof setupStore>;
