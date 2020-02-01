import { History, createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { RouterState, connectRouter, routerMiddleware } from 'connected-react-router';
import { FormReducer, reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';

import { habitsReducer } from './modules/Habits';
import { habitRecordsReducer } from './modules/HabitRecords';
import { rootSaga } from './sagas';

export interface State {
  router: RouterState;
  form: any;
  habits: Habits;
  habitRecords: HabitRecords;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer,
    habits: habitsReducer,
    habitRecords: habitRecordsReducer,
  });

const logger = createLogger();

export const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export function configureStore(preloadedState?: State) {
  const middlewares = [routerMiddleware(history), sagaMiddleware, logger];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewareEnhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(rootReducer(history), preloadedState, middlewareEnhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
