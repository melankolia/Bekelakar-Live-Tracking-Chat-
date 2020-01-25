import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Login, Home, Profile, editProfile} from '../../screens/index';

const StackAuth = createStackNavigator(
  {
    Login,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const Inside = createStackNavigator(
  {
    Home,
    Profile,
    editProfile,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const Apps = createSwitchNavigator(
  {
    StackAuth,
    Inside,
  },
  {
    initialRouteName: 'StackAuth',
    headerMode: 'none',
  },
);

export default createAppContainer(Apps);
