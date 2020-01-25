import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './index.style';
import firebase from '@react-native-firebase/app';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Home extends Component {
  state = {};

  checkAccount = async () => {
    const uid = auth().currentUser.uid;
    const ref = database().ref(`/users/${uid}`);
    const snapshot = await ref.once('value');
    if (!snapshot.val()) {
      await ref.set({
        uid,
        name: auth().currentUser.displayName,
        email: auth().currentUser.email,
        photo: auth().currentUser.photoURL,
        phone: '',
        age: '',
        gender: '',
        longitude: '',
        latitude: '',
        status: 'Online',
      });
      this.props.navigation.navigate('editProfile');
    } else if (snapshot.val()) {
      await ref.update({
        status: 'Online',
      });
      this.props.navigation.navigate('Home');
    }
  };
  // checkAllAccount = async () => {
  //   const uid = auth().currentUser.uid;
  //   const ref = database()
  //     .ref(`/users/`)
  //     .orderByKey();
  //   ref.once('value').then(snapshot => {
  //     snapshot.forEach(childSnapshot => {
  //       let name = childSnapshot.child('name').val();
  //       // childData will be the actual contents of the child
  //       let longitude = childSnapshot.child('longitude').val();
  //       let latitude = childSnapshot.child('latitude').val();
  //       console.log(name, ' longitude : ', longitude, ' latitude : ', latitude);
  //     });
  //   });
  // };
  updateStatus = async () => {
    try {
      const uid = auth().currentUser.uid;
      const ref = database().ref(`/users/${uid}`);
      await ref.update({
        status: 'Offline',
      });
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // this.props.navigation.navigate('Login');
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {
    // this.checkAllAccount();
    this.checkAccount();
  }
  componentWillUnmount() {
    // this.updateStatus();
  }
  render() {
    const {container, map, buttonConsole, slider} = styles;
    return (
      <View style={container}>
        <View style={map} />
        <View style={slider}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Image
              style={{
                marginHorizontal: 5,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />
            <Image
              style={{
                marginHorizontal: 2,
                width: 50,
                height: 50,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{uri: auth().currentUser.photoURL}}
            />

            {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('editProfile')}>
            <View style={buttonConsole} />
          </TouchableOpacity> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Home;
