import { REHYDRATE } from 'redux-persist';

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SELECTED,
  USER_DISMISSED,
  USER_UPDATED,
} from '../actions/types';

const INITIAL_STATE = {
  loggedInUser: null,
  selectedUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload ? action.payload.user : state;
    case USER_LOGGED_IN:
      return { ...state, loggedInUser: action.payload };
    case USER_LOGGED_OUT:
      return { ...state, loggedInUser: null };
    case USER_SELECTED:
      return { ...state, selectedUser: action.payload };
    case USER_DISMISSED:
      return { ...state, selectedUser: null };
    case USER_UPDATED:
      console.log('action.payload', action.payload);
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};
