import { combineReducers } from 'redux';

import RootNavigationReducer from './RootNavigationReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  rootNavigation: RootNavigationReducer,
  user: UserReducer,
  post: PostReducer,
});
