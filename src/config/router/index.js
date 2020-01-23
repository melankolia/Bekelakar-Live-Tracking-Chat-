import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Login} from '../../screens/index';

const StackAuth = createStackNavigator(
  {
    Login,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default createAppContainer(StackAuth);
