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
import storage from '@react-native-firebase/storage';
import BackFlat from '../../components/backFlat/index';
import ImagePicker from 'react-native-image-picker';
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
    let linkPhoto;
    try {
      if (this.state.photo.search('https') === -1) {
        await storage()
          .ref(`/friendsPhotos/${uid}`)
          .putFile(this.state.photo)
          .on(
            'state_changed',
            snapshot => {
              // linkPhoto = snapshot.metadata.fullPath;
              console.log('SNAPSHOT ', snapshot);
            },
            err => {
              console.error(err);
            },
            async uploadedFile => {
              console.log('UPLOADED PHOTO', uploadedFile);
              await storage()
                .ref(`/friendsPhotos/${uid}`)
                .getDownloadURL()
                .then(url => (linkPhoto = url));
              // .catch(err => (linkPhoto = auth().currentUser.photoURL));

              await ref.update({
                uid,
                name: this.state.name,
                email: this.state.email,
                age: this.state.age,
                photo: linkPhoto,
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
            },
          );
      } else {
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
      }
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
  pickImage = () => {
    const option = {
      title: 'Pick an Image',
      maxWidth: 800,
      maxHeight: 600,
    };
    ImagePicker.showImagePicker(option, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        ToastAndroid.showWithGravity(
          'Cancelled',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        ToastAndroid.showWithGravity(
          'Something went wrong',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Image url: ' + response.uri);
        const source = response.uri;
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        console.log(source);
        this.setState({
          photo: source,
        });
        ToastAndroid.showWithGravity(
          'Image Set',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
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
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => this.pickImage()}>
              <ImageBackground
                style={headerImage}
                imageStyle={{
                  borderRadius: 360,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                source={{
                  uri:
                    this.state.photo ||
                    'https://firebasestorage.googleapis.com/v0/b/bekelakar-df5d2.appspot.com/o/default%2Fdefault.png?alt=media&token=f155e397-4106-4e8a-857b-34433cf7e771',
                }}
              />
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderColor: '#7AC5E0',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 360,
                  marginTop: -30,
                  marginLeft: 70,
                  backgroundColor: 'white',
                }}>
                <Icon
                  name="edit"
                  type="font-awesome"
                  size={16}
                  color="#7AC5E0"
                />
              </View>
            </TouchableOpacity>
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
