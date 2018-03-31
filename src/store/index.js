import { AsyncStorage } from 'react-native';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const persistedReducer = persistCombineReducers(persistConfig, reducers);

export default (initialState = {}) => {
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunk),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
