/* eslint-disable react-native/no-inline-styles */
import {firebase} from '@react-native-firebase/auth';
import React, {Component} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import styles from './index.style';
import {Icon} from 'react-native-elements';

class Login extends Component {
  state = {};

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  googleConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '830046566202-udr47q03hpq1jm3r17sfb78881vdurlb.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({loggedIn: false});
      } else {
        // some other error
        this.setState({loggedIn: false});
      }
    }
  };
  firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      this.props.navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  componentDidMount() {
    this.googleConfigure();
    // this.getCurrentUserInfo();
  }
  render() {
    const {
      container,
      background,
      LoginText,
      loginView,
      googleSignInButton,
      descText,
      googleSignInView,
      alternateButton,
    } = styles;
    return (
      <View styles={container}>
        <ImageBackground
          style={background}
          source={require('../../../assets/images/login.jpeg')}>
          <View style={loginView}>
            <Text style={LoginText}>Bekelakar</Text>
            <Text style={descText}>
              Chat and track your friends location here
            </Text>
          </View>
          <View style={googleSignInView}>
            {/* <GoogleSigninButton
              style={googleSignInButton}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => this.firebaseGoogleLogin()}
              disabled={this.state.isSigninInProgress}
            /> */}
            <TouchableOpacity onPress={() => this.firebaseGoogleLogin()}>
              <View style={alternateButton}>
                <View
                  style={{
                    alignItems: 'center',
                    // borderColor: 'white',
                    // borderWidth: 1,
                    flex: 1,
                  }}>
                  <Icon
                    name="google"
                    type="font-awesome"
                    size={24}
                    color={'white'}
                  />
                </View>
                <View
                  style={{
                    paddingLeft: 30,
                    // borderColor: 'white',
                    // borderWidth: 1,
                    flex: 2,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: 'AirbnbCerealMedium',
                    }}>
                    Login
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Text
              style={{marginTop: 30, color: 'white', fontSize: 10, width: 250}}>
              By clicking above to login, you're agreeing to our terms of
              services
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Login;
