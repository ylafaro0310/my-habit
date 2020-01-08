import { History, createBrowserHistory } from 'history';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { RouterState, connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

export interface State {
    router: RouterState;
  }
  
export const rootReducer = (history: History) =>
    combineReducers({
      router: connectRouter(history),
    });


const logger = createLogger();

export const history = createBrowserHistory();

export function configureStore(preloadedState?: State) {
  const middlewares = [routerMiddleware(history), logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer(history), preloadedState, middlewareEnhancer);
  return store;
}
