# ToDo App

## Description

An online to do application built with react

## Features

1. Make a task
2. Add subtasks ot task
3. Share them task with friends using email

## Installation

1. Clone the repository

```sh
$ git clone https://github.com/haikalazhar197/online-to-do-app.git
```

2. Install Dependencies

```sh
$ npm install
```

3. Create fire.js File in src/utils directory

```sh
$ cd /src/utils
$ touch fire.js
```

4. Copy the contents in fire.example.js into fire.js and add in your firebase app credentials

5. Run npm scripts

### Firebase Credentials

Refer to [Firebase Docs](https://firebase.google.com/docs/) from full guide

1. Go to firebase console and create project
2. Under project settings click add app
3. Copy the firebase sdk snippet and use this to initialize your app
4. NOTE -- Requires cloud functions to work see Code at: [Cloud Functions](https://github.com/haikalazhar197/online-to-do-cloud-functions)

## Built With

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Bootstrap React](https://react-bootstrap.github.io/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
