import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

//import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';

import { configureStore, history } from './redux/store';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}><Routes/></ConnectedRouter>
  </Provider>,
  document.getElementsByClassName('root')[0],
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
