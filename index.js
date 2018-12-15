import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './src/AppContainer';
import store from './src/ducks/store';

ReactDOM.render(
  <Provider store={store()}>
      <AppContainer />
  </Provider>,
  document.getElementById('root')
);
