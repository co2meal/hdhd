import React from 'react'
import ReactDOM from 'react-dom'
import Thunk from 'redux-thunk';

import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import * as RouterDOM from 'react-router-dom';
import * as HotLoader from 'react-hot-loader'

import registerServiceWorker from './registerServiceWorker'
import reducer from './reducer'
import App from './App';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose
let store = Redux.createStore(
  reducer,
  composeEnhancers(Redux.applyMiddleware(
    Thunk,
  )),
)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <HotLoader.AppContainer>
      <RouterDOM.BrowserRouter>
        <App />
      </RouterDOM.BrowserRouter>
    </HotLoader.AppContainer>
  </ReactRedux.Provider>,
  document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <ReactRedux.Provider store={store}>
        <HotLoader.AppContainer>
          <RouterDOM.BrowserRouter>
            <NextApp />
          </RouterDOM.BrowserRouter>
        </HotLoader.AppContainer>
      </ReactRedux.Provider>,
      document.getElementById('root')
    );
  });
}