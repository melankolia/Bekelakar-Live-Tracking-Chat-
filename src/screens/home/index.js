/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styles from './index.style';
import firebase from '@react-native-firebase/app';
import Geolocation from 'react-native-geolocation-service';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import FriendCircle from '../../components/friendCircle/index';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let detailCondition = 0;

class Home extends Component {
  state = {mapRegion: null, users: [], detailShow: false};

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
      this.setState({
        photo: snapshot.child('photo').val(),
      });
      this.props.navigation.navigate('Home');
    }
  };
  getAllAccount = async () => {
    const uid = auth().currentUser.uid;
    const ref = database()
      .ref('/users')
      .orderByKey();
    ref.on('child_added', snapshot => {
      // console.log(snapshot.val().age);
      if (snapshot.val() !== null && snapshot.val().uid !== uid) {
        this.setState(state => {
          return {users: [...state.users, snapshot.val()], loading: true};
        });
      }
    });
    // console.log('Loading Done');
  };
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
  checkPermissionLocation = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
  };
  getPos = () => {
    const uid = auth().currentUser.uid;
    const ref = database().ref(`/users/${uid}`);
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421 * 1.5,
        };
        this.setState({
          region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
        });
        ref.update({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // console.log('Get Pos');
        // console.log('region : ', region);
        // console.log(
        //   'latitude : ',
        //   position.coords.latitude,
        //   ' longitude : ',
        //   position.coords.longitude,
        // );
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };
  // getAllAccount = () =>{

  // }
  componentDidMount() {
    const {navigation} = this.props;
    // //Adding an event listner om focus
    // //So whenever the screen will have focus it will set the state to zero
    this.getAllAccount();
    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.checkAccount();
      await this.checkPermissionLocation();
      await this.getPos();
      // console.log(this.state.loading);
    });
  }
  // iterator = () => {
  //   this.state.users.map(item => console.log('1', item));
  //   console.log(this.state.users);
  // };
  detailShow = (stats, item) => {
    detailCondition += stats;
    if (detailCondition % 2 === 1) {
      this.setState({item, detailShow: true});
    } else {
      this.setState({detailShow: false});
    }
  };
  componentWillUnmount() {
    this.updateStatus();
    // console.log(this.state.userList[0].age);
  }
  render() {
    const {
      container,
      map,
      buttonConsole,
      detail,
      slider,
      marker,
      markerImage,
    } = styles;
    return (
      <View style={container}>
        <MapView
          style={{flex: 1}}
          showsMyLocationButton={true}
          showsIndoorLevelPicker={true}
          showsUserLocation={true}
          zoomControlEnabled={true}
          showsCompass={true}
          showsTraffic={false}
          region={this.state.mapRegion}
          initialRegion={{
            latitude: -7.7592745,
            longitude: 110.3782409,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {this.state.users.map(item => {
            return (
              <Marker
                key={item.uid}
                title={item.name}
                description={item.status}
                draggable
                coordinate={{
                  latitude: item.latitude || 0,
                  longitude: item.longitude || 0,
                }}
                onCalloutPress={() => {
                  this.props.navigation.navigate('Profile', {
                    uid: item.uid,
                  });
                }}
                onPress={() => this.detailShow(+1, item)}>
                <View style={marker}>
                  <Image source={{uri: item.photo}} style={markerImage} />
                  <Text
                    style={{paddingTop: 4, textAlign: 'center', fontSize: 9}}>
                    {item.name.split(' ')[0]}
                  </Text>
                </View>
              </Marker>
            );
          })}
        </MapView>
        {this.state.detailShow ? (
          <View style={detail}>
            <View style={{padding: 10}}>
              <FriendCircle
                key={1}
                photo={this.state.item.photo}
                uid={this.state.item.uid}
                navigation={this.props.navigation}
              />
            </View>
            <View
              style={{
                height: '80%',
                // borderColor: 'gray',
                // borderWidth: 1,
              }}>
              <Text style={{fontFamily: 'AirbnbCerealMedium', fontSize: 16}}>
                {this.state.item.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'AirbnbCerealMedium',
                  fontSize: 12,
                  color: 'gray',
                }}>
                {this.state.item.status}
              </Text>

              <View
                style={{flexDirection: 'row', width: '100%', paddingTop: 5}}>
                <TouchableOpacity
                  style={{
                    width: width * 0.25,
                    height: height * 0.05,
                    backgroundColor: '#7AC5E0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 40,
                  }}
                  onPress={() => {
                    // console.log(this.state.item.uid);
                    this.props.navigation.navigate('Profile', {
                      uid: this.state.item.uid,
                    });
                  }}>
                  <Text style={{color: 'white'}}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: width * 0.25,
                    height: height * 0.05,
                    backgroundColor: '#7AC5E0',
                    marginLeft: 10,
                    justifyContent: 'center',
                    borderRadius: 40,
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Chat', {
                      item: this.state.item,
                    })
                  }>
                  <Text style={{color: 'white'}}>Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        <View style={slider}>
          <TouchableOpacity
            onPress={() =>
              !this.state.loading
                ? this.props.navigation.navigate('Profile', {
                    uid: auth().currentUser.uid,
                  })
                : ToastAndroid.show(
                    'Users Data Still Loading',
                    ToastAndroid.LONG,
                  )
            }
            // onPress={() => this.iterator()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              width: 60,
              height: 60,
              borderRadius: 360,
              // marginHorizontal: 10,
            }}>
            <Icon name="user" type="font-awesome" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              !this.state.loading
                ? this.props.navigation.navigate('ChatList', {
                    uid: auth().currentUser.uid,
                  })
                : ToastAndroid.show(
                    'Users Data Still Loading',
                    ToastAndroid.LONG,
                  )
            }
            // onPress={() => this.iterator()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              width: 60,
              height: 60,
              borderRadius: 360,
              marginHorizontal: 10,
            }}>
            <Icon name="comments" type="font-awesome" size={20} color="gray" />
          </TouchableOpacity>
          <ScrollView
            style={{borderRadius: 360}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {!this.state.loading ? (
              this.state.users.map((item, index) => (
                <FriendCircle
                  key={index}
                  photo={item.photo}
                  uid={item.uid}
                  navigation={this.props.navigation}
                />
              ))
            ) : this.state.loading ? (
              <ActivityIndicator size="small" color="#7AC5E0" />
            ) : (
              <Text style={{color: 'gray'}}> Empty List </Text>
            )}
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
