import { History, createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { RouterState, connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';

import { habitsReducer } from './modules/Habits';
import { habitRecordsReducer } from './modules/HabitRecords';

export interface State {
  router: RouterState;
  habits: Habits;
  habitRecords: HabitRecords;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    habits: habitsReducer,
    habitRecords: habitRecordsReducer,
  });

const logger = createLogger();

export const history = createBrowserHistory();

export function configureStore(preloadedState?: State) {
  const middlewares = [routerMiddleware(history), logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer(history), preloadedState, middlewareEnhancer);
  return store;
}
