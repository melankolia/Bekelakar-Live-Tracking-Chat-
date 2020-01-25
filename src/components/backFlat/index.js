import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './index.style';
import {Icon} from 'react-native-elements';

const backFlat = props => {
  const {container} = styles;
  return (
    <View style={container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <View>
          <Icon
            name="arrow-left"
            type="font-awesome"
            size={20}
            color={'white'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default backFlat;
