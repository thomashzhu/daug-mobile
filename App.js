import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { PropTypes } from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigationStack from './src/navigation/RootNavigationStack';
import reducers from './src/reducers';

/* eslint-disable react/prefer-stateless-function  */
class RootComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    rootNavigation: PropTypes.shape({
      routes: PropTypes.arrayOf(PropTypes.shape({
        routeName: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  };

  render() {
    const { dispatch, rootNavigation } = this.props;
    const addListener = createReduxBoundAddListener('root');
    
    const navigation = addNavigationHelpers({
      dispatch,
      state: rootNavigation,
      addListener,
    });

    return (
      <RootNavigationStack navigation={navigation} />
    );
  }
}
/* eslint-enable react/prefer-stateless-function  */

const ConnectedRootComponent = (() => {
  const mapStateToProps = state => ({
    rootNavigation: state.rootNavigation,
  });

  return connect(mapStateToProps, null)(RootComponent);
})();

const App = () => {
  const navMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.rootNavigation,
  );

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
  };
  const persistedReducer = persistCombineReducers(persistConfig, reducers);
  
  const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(thunk, navMiddleware),
  );
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRootComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;
