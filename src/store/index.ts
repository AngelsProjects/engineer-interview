import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { githubApi } from '../services/githubApi';
import { taskReducer } from './taskSlice';

// Create the root reducer from all the other reducers
const rootReducer = combineReducers({
  [githubApi.reducerPath]: githubApi.reducer,
  tasks: taskReducer,
});

// Create the store with the root reducer
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV === 'development',
  });
}

// Crate the store with the root reducer
export const store = setupStore();

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

// Inferred type is {tasks: TaskState}
export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof setupStore>;
