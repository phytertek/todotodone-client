import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import createHistory from 'history/createBrowserHistory';

import { todosReducer, todosAsyncMiddleware } from './todoAPI';

export const history = createHistory();

const persistedReducers = ['todos'];

const encryptor = createEncryptor({
  secretKey: process.env.STORE_ENCRYPTION_KEY || 'A super secret key',
  onError: error => console.log(error)
});

const routerHistory = routerMiddleware(history);

const persistConfig = {
  key: 'store',
  whitelist: persistedReducers,
  transforms: [encryptor],
  storage
};

const root = combineReducers({
  todos: todosReducer,
  router: routerReducer
});

const persistedRoot = persistReducer(persistConfig, root);

const createStoreWithMiddleware = applyMiddleware(
  todosAsyncMiddleware,
  routerHistory
)(createStore);

export const store =
  process.env.NODE_ENV === 'development'
    ? createStoreWithMiddleware(
        persistedRoot,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : createStore(persistedRoot);

export const persistor = persistStore(store);
