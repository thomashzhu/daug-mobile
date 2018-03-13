import {
  USER_LOGGED_IN,
  USER_SELECTED,
  USER_DISMISSED,
} from '../actions/types';

const INITIAL_STATE = {
  loggedInUser: null,
  selectedUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, loggedInUser: action.payload };
    case USER_SELECTED:
      return { ...state, selectedUser: action.payload };
    case USER_DISMISSED:
      return { ...state, selectedUser: null };
    default:
      return state;
  }
};
