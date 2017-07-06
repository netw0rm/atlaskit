// @flow
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import hookMiddleware from './hook-middleware';
import type { Hooks } from '../types';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (hooks: Hooks) => createStore(
      reducer,
      // TODO: disable in production
      composeEnhancers(
        applyMiddleware(
          thunk,
          hookMiddleware(hooks),
        )
      )
    );
