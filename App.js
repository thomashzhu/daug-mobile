import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import reducers from './src/reducers';

import RootNavigator from './src/navigation/RootNavigator';

let isLoggedIn = false;

class Root extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    rootNavigation: PropTypes.shape({
      routes: PropTypes.arrayOf(PropTypes.shape({
        routeName: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.readLoginData()
      .then(() => { isLoggedIn = true; })
      .catch(() => { isLoggedIn = false; });
  }

  readLoginData = () => (
    new Promise((resolve, reject) => {
      AsyncStorage.getItem('loggedInUser')
        .then((value) => {
          if (value !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(error => reject(error));
    })
  );

  render = () => {
    const { dispatch, rootNavigation } = this.props;
    const addListener = createReduxBoundAddListener('root');

    const navigation = addNavigationHelpers({
      dispatch,
      state: rootNavigation,
      addListener,
    });

    return <RootNavigator navigation={navigation} />;
  }
}
const mapStateToProps = state => ({
  rootNavigation: state.rootNavigation,
});
const RootNavigationStack = connect(mapStateToProps)(Root);

const App = () => {
  const navMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.rootNavigation,
  );
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, navMiddleware));

  return (
    <Provider store={store}>
      <RootNavigationStack />
    </Provider>
  );
};

export default App;
export const isUserLoggedIn = isLoggedIn;
