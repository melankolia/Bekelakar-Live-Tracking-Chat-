import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './index.style';

class Home extends Component {
  state = {};

  render() {
    const {container} = styles;
    return (
      <View>
        <Text>HOME</Text>
      </View>
    );
  }
}

export default Home;
