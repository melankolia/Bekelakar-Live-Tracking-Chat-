import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './index.style';

const FriendCircle = props => {
  const {container} = styles;
  return (
    <>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Profile', {uid: props.uid})}>
        <Image
          style={container}
          source={{
            uri:
              props.photo ||
              'https://firebasestorage.googleapis.com/v0/b/bekelakar-df5d2.appspot.com/o/default%2Fdefault.png?alt=media&token=f155e397-4106-4e8a-857b-34433cf7e771',
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default FriendCircle;
