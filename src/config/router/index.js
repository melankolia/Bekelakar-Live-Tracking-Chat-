import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Login,
  Home,
  Profile,
  editProfile,
  Chat,
  ChatList,
} from '../../screens/index';

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
    ChatList,
    Chat,
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
