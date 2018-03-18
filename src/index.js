import React from 'react'
import ReactDOM from 'react-dom'
import Thunk from 'redux-thunk';

import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import * as HotLoader from 'react-hot-loader'
import * as RouterRedux from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import registerServiceWorker from './registerServiceWorker'
import reducer from './reducer'

import App from './App';

import './index.css';
const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose
let store = Redux.createStore(
  reducer,
  composeEnhancers(
    Redux.applyMiddleware(Thunk),
    Redux.applyMiddleware(RouterRedux.routerMiddleware(history))
  ),
)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <HotLoader.AppContainer>
      <RouterRedux.ConnectedRouter history={history}>
        <App />
      </RouterRedux.ConnectedRouter>
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
          <RouterRedux.ConnectedRouter history={history}>
            <NextApp />
          </RouterRedux.ConnectedRouter>
        </HotLoader.AppContainer>
      </ReactRedux.Provider>,
      document.getElementById('root')
    );
  });
}