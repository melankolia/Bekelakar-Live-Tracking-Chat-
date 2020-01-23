import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './index.style';
import {Icon} from 'react-native-elements';

class Login extends Component {
  state = {};

  render() {
    const {container, LoginText} = styles;
    return (
      <View styles={container}>
        <Text style={LoginText}>Login</Text>
        <Icon name="receipt" size={24} color={'#00B444'} />
      </View>
    );
  }
}

export default Login;
