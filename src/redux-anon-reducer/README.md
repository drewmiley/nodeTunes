# redux-anon-reducer

A simple anonymous function reducer for use with redux

## Installation

`npm install --save-dev redux-anon-reducer`

## Usage

To use `redux-anon-reducer`, your actions must follow the [Flux Standard Action format](https://github.com/redux-utilities/flux-standard-action)

Create an actionMap, with keys of your action types corresponding to the relevant state updater (functions inside what is normally the reducer file)

```
import * as actiontypes from './actiontypes';
import * as stateupdaters from './stateupdaters';

const actionMap = {
    [actiontypes.LOAD_QUIZ]: stateupdaters.loadQuiz,
    [actiontypes.GENERATE_QUIZ]: stateupdaters.generateQuiz,
    [actiontypes.SET_ANSWER]: stateupdaters.setAnswer,
    [actiontypes.SUBMIT_ANSWERS]: stateupdaters.submitAnswers,
    [actiontypes.GET_LEADERBOARDS]: stateupdaters.getLeaderboards,
    [actiontypes.GET_VALIDQUIZCODES]: stateupdaters.getValidQuizCodes,
    [actiontypes.GET_VALIDQUIZOPTIONS]: stateupdaters.getValidQuizOptions
}
```

In your store.js, create the reducer

```
import anonReducer from 'redux-anon-reducer';
import actionmap from './actionmap';

const reducer = anonReducer(actionmap);
```

By default, with an unexpected action type, it will return the state, however you can pass in what you would like it to return as a second parameter.

```
const defaultReturnState = ...
const reducer = anonReducer(actionmap, defaultReturnState);
```
