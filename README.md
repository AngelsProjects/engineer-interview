# To Do app with React and TypeScript

This is a simple TODO app with React and TypeScript. It is based on the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/).

Based on the requirements of the [Every Engineer Interview Repository](https://github.com/every-io/engineer-interview/blob/main/README.md).

## Technical Requirements

- Node.js 14.x or 16.x
- React 18.x
- TypeScript 4.x

## Quick Start

1. `npm install`
2. `npm run start`
3. open your browser to http://localhost:3000

## Features

- Add a new TODO item
- Move TODO items between columns
- Delete TODO items
- Clear all TODO items

## How to use

1. Add a new TODO item by typing in the input field and pressing enter or clicking the "+" button.
2. Move TODO items between columns by clicking the left or right arrow buttons in the task item.
3. Delete TODO items by clicking the "Delete" button (trash can icon).
4. Clear all TODO items by clicking the "Clear Board" button on the bottom right side of the page.
5. The left arrow button is disabled if the TODO item is in the "To Do" column.
6. The right arrow button is disabled if the TODO item is in the "Done" column.

## How to run tests

1. `npm run test`
2. look at the test results in the terminal

   Sample image of test results in the terminal:

   ![Tests results](./images/tests.png?raw=true 'Tests')

## How to build

1. `npm run build`
2. look at the build results in the `build` folder

## How to lint

1. `npm run lint`
2. look at the lint results in the terminal

   Sample image of lint results in the terminal:

   ```
   $ eslint --ext .js,.jsx,.ts,.tsx src/
   ✨  Done in 1.35s.
   ```

## How to format

1. `npm run format`
2. look at the format results in the terminal

   Sample of format results in the terminal:

   ```
   $ prettier --write src/**/*.{ts,tsx,css,scss}
   src/constants/states.ts 180ms
   src/hooks/redux.ts 5ms
   src/interfaces/state.ts 3ms
   src/interfaces/task.ts 3ms
   src/store/index.ts 7ms
   src/store/taskSlice.test.ts 29ms
   src/store/taskSlice.ts 17ms
   src/types/buttons.ts 3ms
   src/types/containers.ts 2ms
   src/types/inputs.ts 2ms
   src/utils/test-utils.tsx 6ms
   src/App.css 18ms
   src/index.css 2ms
   src/styles/variables.scss 2ms
   ✨  Done in 0.63s.
   ```

## How to run code coverage report

1. `npm run coverage`
2. See the `coverage` folder for the report.

   Sample image of code coverage report in terminal:

   ![Code coverage report](./images/coverage.png?raw=true 'Code coverage report')

## Github Actions

This project uses Github Actions to run tests and linting on every push and pull request.
You can see the results in the "Actions" tab.

## Final Product Screenshots

![Evidence 1](./images/evidence1.png?raw=true 'Evidence 1')
![Evidence 2](./images/evidence2.png?raw=true 'Evidence 2')
![Evidence 3](./images/evidence3.png?raw=true 'Evidence 3')
![Evidence 4](./images/evidence4.png?raw=true 'Evidence 4')
![Evidence 5](./images/evidence5.png?raw=true 'Evidence 5')
![Evidence 6](./images/evidence6.png?raw=true 'Evidence 6')
![Evidence 6](./images/evidence7.png?raw=true 'Evidence 7')

## Dependencies

- [@reduxjs/toolkit](https://redux-toolkit.js.org)
- [clsx](https://github.com/lukeed/clsx#readme)
- [React](https://reactjs.org/)
- [React DOM](https://reactjs.org/docs/react-dom.html)
- [React Hook Form](https://react-hook-form.com/)
- [React Redux](https://react-redux.js.org/)
- [uuid](https://github.com/uuidjs/uuid#readme)
- [Web Vitals](https://github.com/GoogleChrome/web-vitals#readme)

## Dev Dependencies

- [@faker-js/faker](https://github.com/faker-js/faker#readme)
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom#readme)
- [@testing-library/react](https://github.com/testing-library/react-testing-library#readme)
- [@testing-library/user-event](https://github.com/testing-library/user-event#readme)
- [@types/jest](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest)
- [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)
- [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)
- [@types/react-dom](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom)
- [@types/react-redux](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-redux)
- [@types/uuid](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/uuid)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [react-scripts](https://github.com/facebook/create-react-app#readme)
- [sass](https://sass-lang.com/)
- [typescript](https://www.typescriptlang.org/)
