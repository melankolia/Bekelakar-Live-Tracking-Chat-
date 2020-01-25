/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ToastAndroid,
} from 'react-native';
import styles from './index.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import BackFlat from '../../components/backFlat/index';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon, ButtonGroup} from 'react-native-elements';

class editProfile extends Component {
  state = {
    name: '',
    email: '',
    photo: '',
    age: '',
    gender: '',
    longitude: '',
    latitude: '',
    selectedIndex: 0,
  };
  getAccountData = async () => {
    const uid = auth().currentUser.uid;
    const ref = database().ref(`/users/${uid}`);
    const snapshot = await ref.once('value');
    console.log('edit profile', snapshot.child('email').val());
    this.setState({
      uid,
      name: snapshot.child('name').val(),
      email: snapshot.child('email').val(),
      age: snapshot.child('age').val(),
      gender: snapshot.child('gender').val(),
      selectedIndex: snapshot.child('gender').val() === 'Female' ? 1 : 0,
      photo: snapshot.child('photo').val(),
      phone: snapshot.child('phone').val(),
      longitude: snapshot.child('longitude').val(),
      latitude: snapshot.child('latitude').val(),
    });
  };
  updateProfile = async () => {
    const uid = auth().currentUser.uid;
    const ref = database().ref(`/users/${uid}`);
    try {
      await ref.update({
        uid,
        name: this.state.name,
        email: this.state.email,
        age: this.state.age,
        photo: this.state.photo,
        gender: this.state.gender || 'Male',
        phone: this.state.phone,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
      });
      ToastAndroid.showWithGravity(
        'Save Successfull',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      this.props.navigation.goBack();
    } catch (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    // console.log(this.state);
  };
  updateIndex = selectedIndex => {
    const gender = ['Male', 'Female'];

    this.setState({
      selectedIndex: selectedIndex,
      gender: gender[selectedIndex],
    });
  };

  componentDidMount() {
    this.getAccountData();
  }
  render() {
    const {
      container,
      header,
      edit,
      save,
      headerTop,
      headerBottom,
      headerImage,
      body,
      containerInput,
      labelText,
      inputText,
      buttonGroupStyle,
    } = styles;
    const gender = ['Male', 'Female'];
    return (
      <View style={container}>
        <ScrollView>
          <View style={header}>
            <View style={headerTop}>
              <BackFlat navigation={this.props.navigation} />
              <Text style={edit}>{'    '}Edit</Text>
              <TouchableOpacity onPress={() => this.updateProfile()}>
                <Text style={save}>Save</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={headerBottom}></View> */}
          </View>
          <View style={{backgroundColor: 'white'}}>
            <ImageBackground
              style={headerImage}
              imageStyle={{
                borderRadius: 360,
                borderColor: 'white',
                borderWidth: 3,
              }}
              source={{
                uri: auth().currentUser.photoURL,
              }}
            />
          </View>
          <View style={body}>
            <View style={containerInput}>
              <View style={{paddingLeft: 8, flexDirection: 'row'}}>
                <Icon
                  name="font"
                  type="font-awesome"
                  size={20}
                  color={'#7AC5E0'}
                />
                <Text style={labelText}> Name </Text>
              </View>
              <TextInput
                style={inputText}
                placeholder={'Name'}
                defaultValue={this.state.name}
                onChange={e => this.setState({name: e.nativeEvent.text})}
              />
            </View>
            <View style={containerInput}>
              <View style={{paddingLeft: 8, flexDirection: 'row'}}>
                <Icon
                  name="envelope"
                  type="font-awesome"
                  size={20}
                  color={'#7AC5E0'}
                />
                <Text style={labelText}> Email </Text>
              </View>
              <TextInput
                style={inputText}
                placeholder={'Email'}
                defaultValue={this.state.email}
                onChange={e => this.setState({email: e.nativeEvent.text})}
              />
            </View>
            <View style={containerInput}>
              <View
                style={{
                  paddingLeft: 8,
                  paddingBottom: 10,
                  flexDirection: 'row',
                }}>
                <Icon
                  name="venus-mars"
                  type="font-awesome"
                  size={16}
                  color={'#7AC5E0'}
                />
                <Text style={labelText}>Gender </Text>
              </View>
              <View style={{alignSelf: 'center'}}>
                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={this.state.selectedIndex}
                  buttons={gender}
                  containerStyle={buttonGroupStyle}
                  selectedButtonStyle={{backgroundColor: '#7AC5E0'}}
                />
              </View>
              {/* <TextInput style={inputText} placeholder={'Gender'} /> */}
            </View>
            <View style={containerInput}>
              <View style={{paddingLeft: 8, flexDirection: 'row'}}>
                <Icon
                  name="birthday-cake"
                  type="font-awesome"
                  size={16}
                  color={'#7AC5E0'}
                />
                <Text style={labelText}> Age </Text>
              </View>
              <TextInput
                style={inputText}
                placeholder={'Age'}
                defaultValue={this.state.age}
                onChange={e => this.setState({age: e.nativeEvent.text})}
              />
            </View>
            <View style={containerInput}>
              <View style={{paddingLeft: 8, flexDirection: 'row'}}>
                <Icon
                  name="phone"
                  type="font-awesome"
                  size={16}
                  color={'#7AC5E0'}
                />
                <Text style={labelText}> Phone </Text>
              </View>
              <TextInput
                style={inputText}
                placeholder={'Phone'}
                defaultValue={this.state.phone}
                onChange={e => this.setState({phone: e.nativeEvent.text})}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default editProfile;
