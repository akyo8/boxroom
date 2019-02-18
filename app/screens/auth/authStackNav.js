import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './login';
import SignUpScreen from './signup';
import { transitionConfig } from '../../const/constData';

const AuthStackNav = StackNavigator({
  AUTH_LOGIN: {
    screen: LoginScreen
  },
  AUTH_SIGNUP: {
    screen: SignUpScreen
  }
}, {
    headerMode: 'none',
    transitionConfig,
  });

class AuthNavigatorWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AuthStackNav screenProps={{ rootNavigation: this.props.navigation }} />
    );
  }
}

export default AuthNavigatorWrapper;