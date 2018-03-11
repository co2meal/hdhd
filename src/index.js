import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import {AppContainer} from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.css';

ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
