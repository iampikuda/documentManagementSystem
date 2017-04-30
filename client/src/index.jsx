import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import iziToast from 'iziToast';
import ReduxToastr from 'react-redux-toastr'
import App from './components/app.component';
import combineReducers from './reducers/index.js';
import setAuthorizationToken from './utils/setAuth';

import 'react-redux-toastr/src/styles/index.scss';
require('./scss/main.scss');

const token = window.localStorage.getItem('token');

const store = createStore(
  combineReducers,
  applyMiddleware(thunk)
);
if (token) {
  setAuthorizationToken(token);
}

ReactDom.render(
  <Provider store={store}>
    <div>
      <App />
      <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar/>
    </div>
  </Provider>
  , document.getElementById('react-app'));
