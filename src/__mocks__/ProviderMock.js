import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../configStore';

const history = createBrowserHistory();
const ProviderMock = (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>{props.children}</Router>
    </PersistGate>
  </Provider>
);

export default ProviderMock;
