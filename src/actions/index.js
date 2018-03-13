import { NavigationActions } from 'react-navigation';

import {
  USER_LOGGED_IN,
  USER_SELECTED,
  USER_DISMISSED,
  POST_SELECTED,
} from './types';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: user,
});

export const selectUser = user => (
  (dispatch) => {
    dispatch({
      type: USER_SELECTED,
      payload: user,
    });

    dispatch(NavigationActions.navigate({
      routeName: 'Profile',
    }));
  }
);

export const dismissUser = () => ({
  type: USER_DISMISSED,
});

export const selectPost = post => (
  (dispatch) => {
    dispatch({
      type: POST_SELECTED,
      payload: post,
    });

    dispatch(NavigationActions.navigate({
      routeName: 'PostDetail',
    }));
  }
);
