import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {Icon} from 'react-native-elements';
import styles from './index.style';

class Profile extends Component {
  state = {};
  getAccountData = async () => {
    const uid = this.props.navigation.getParam('uid');
    const ref = database().ref(`/users/${uid}`);
    let snapshot = await ref.once('value');
    this.setState({
      uid,
      name: snapshot.child('name').val(),
      email: snapshot.child('email').val(),
      age: snapshot.child('age').val(),
      gender: snapshot.child('gender').val(),
      photo: snapshot.child('photo').val(),
      longitude: snapshot.child('longitude').val(),
      latitude: snapshot.child('latitude').val(),
    });
  };
  testing = () => {
    console.log(this.state.age);
  };
  componentDidMount() {
    const {navigation} = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getAccountData();
    });
  }
  render() {
    const {
      container,
      header,
      headerTop,
      profileText,
      body,
      card,
      avatar,
      avatarRadius,
      nameText,
      locationText,
      contact,
      labelContact,
      edge,
      chat,
    } = styles;
    return (
      <View style={container}>
        {/* <View style={header}> */}
        <ImageBackground
          style={header}
          source={require('../../assets/images/cover.png')}>
          <View style={headerTop}>
            <TouchableOpacity
              style={{paddingRight: 20}}
              onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-left"
                type="font-awesome"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
            <Text style={profileText}>Profile</Text>
            <TouchableOpacity
              style={{paddingLeft: 20}}
              onPress={() => this.props.navigation.navigate('editProfile')}>
              <Icon
                name="ellipsis-v"
                type="font-awesome"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* </View> */}
        <View style={body}>
          <View style={card}>
            <ImageBackground
              style={avatar}
              imageStyle={avatarRadius}
              onProgress={() => this.pickImage()}
              source={{
                uri:
                  this.state.photo ||
                  'https://firebasestorage.googleapis.com/v0/b/bekelakar-df5d2.appspot.com/o/default%2Fdefault.png?alt=media&token=f155e397-4106-4e8a-857b-34433cf7e771',
              }}
            />

            <Text style={nameText}>{this.state.name || ' '}</Text>
            <Text style={locationText}>Yogyakarta, Indonesia</Text>
            <View style={contact}>
              <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
                <Icon
                  name={this.state.gender === 'Male' ? 'mars' : 'venus'}
                  type="font-awesome"
                  size={24}
                  color="black"
                />
                <Text style={labelContact}>Gender</Text>
              </View>
              <View style={edge}>
                <Text>{this.state.age || 0}</Text>
                <Text style={labelContact}>Age</Text>
              </View>
              <View style={edge}>
                <Icon
                  name="phone"
                  type="font-awesome"
                  size={22}
                  color="black"
                />
                <Text style={labelContact}>Phone</Text>
              </View>
              <View style={edge}>
                <Icon
                  name="envelope"
                  type="font-awesome"
                  size={22}
                  color="black"
                />
                <Text style={labelContact}>Email</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                auth().currentUser.uid === this.props.navigation.getParam('uid')
                  ? this.props.navigation.navigate('editProfile')
                  : this.props.navigation.navigate('Home');
              }}>
              <View style={chat}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'AirbnbCerealMedium',
                  }}>
                  {auth().currentUser.uid ===
                  this.props.navigation.getParam('uid')
                    ? 'Edit Profile'
                    : 'Chat'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Profile;
