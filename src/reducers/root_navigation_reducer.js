import { NavigationActions } from 'react-navigation';

import RootNavigationStack from '../navigation/RootNavigationStack';

const INITIAL_STATE = RootNavigationStack.router.getStateForAction(NavigationActions.init());

export default (state = INITIAL_STATE, action) => {
  const nextState = RootNavigationStack.router.getStateForAction(action, state);
  return nextState || state;
};
