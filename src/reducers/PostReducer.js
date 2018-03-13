import { POST_SELECTED } from '../actions/types';

const INITIAL_STATE = {
  selectedPost: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_SELECTED:
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
};
