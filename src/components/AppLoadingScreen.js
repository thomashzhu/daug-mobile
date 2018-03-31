import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { PropTypes } from 'prop-types';

class AppLoadingScreen extends Component {
  state = {
    isUserLoggedIn: null,
  }

  componentWillMount() {
    const { user, navigation: { dispatch } } = this.props;
    if (user.loggedInUser) {
      dispatch(NavigationActions.navigate({ routeName: 'HomeTabs' }));
      this.setState({ isUserLoggedIn: true });
    } else {
      dispatch(NavigationActions.navigate({ routeName: 'IntroStack' }));
      this.setState({ isUserLoggedIn: false });
    }
  }

  render = () => {
    const { isUserLoggedIn } = this.state;

    if (isUserLoggedIn === null) {
      return <AppLoading style={{ flex: 1 }} />;
    }

    return null;
  }
}

AppLoadingScreen.propTypes = {
  user: PropTypes.shape({
    loggedInUser: PropTypes.shape(),
  }).isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default (() => {
  const mapStateToProps = state => ({
    user: state.user,
  });

  return connect(mapStateToProps)(AppLoadingScreen);
})();
