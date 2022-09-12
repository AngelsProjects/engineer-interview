import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EnumStateId } from '../interfaces/state';
import Task from '../interfaces/task';

export const githubApi = createApi({
  reducerPath: 'githubIssuesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/repos/every-io/demo-issues/',
  }),
  endpoints: (builder) => ({
    getIssues: builder.query({
      query: () => 'issues?state=all',
      transformResponse: (response: any) => {
        const mappedItems = response.map(({ id, state, title }: any) => {
          const newItem: Task = {
            id: id.toString(),
            taskName: title,
            stateId: EnumStateId.ToDo,
          };

          // We can add more states in case we have more
          switch (state) {
            case 'closed': {
              newItem.stateId = EnumStateId.Done;
              break;
            }
          }
          return newItem;
        });

        const tasksInitialState: any = {
          [EnumStateId.ToDo]: [],
          [EnumStateId.InProgress]: [],
          [EnumStateId.Done]: [],
        };

        mappedItems.forEach((item: any) => {
          tasksInitialState[item.stateId as EnumStateId].push(item as any);
        });
        return tasksInitialState;
      },
    }),
  }),
});

export const { useGetIssuesQuery } = githubApi;
