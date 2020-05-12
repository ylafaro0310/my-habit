import { History, createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {
  RouterState,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';

import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import HabitSessions from '../models/HabitSessions';

import { habitsReducer } from './modules/Habits';
import { habitRecordsReducer } from './modules/HabitRecords';
import { rootSaga } from './sagas';
import { HabitSessionsReducer } from './modules/HabitSessions';

export interface State {
  router: RouterState;
  form: any;
  habits: Habits;
  habitRecords: HabitRecords;
  habitSessions: HabitSessions;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer,
    habits: habitsReducer,
    habitRecords: habitRecordsReducer,
    habitSessions: HabitSessionsReducer,
  });

export const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export function configureStore(preloadedState?: State) {
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewareEnhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(
    rootReducer(history),
    preloadedState,
    middlewareEnhancer,
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
