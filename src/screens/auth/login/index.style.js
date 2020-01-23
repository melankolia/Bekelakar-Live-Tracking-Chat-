import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  LoginText: {
    color: 'white',
    fontFamily: 'AirbnbCerealMedium',
    fontSize: 36,
  },
  descText: {
    paddingLeft: 2,
    color: 'white',
  },
  loginView: {
    flex: 2,
    // borderColor: 'white',
    // borderWidth: 1,
    paddingTop: '10%',
  },
  googleSignInButton: {
    width: 192,
    height: 48,
  },
  googleSignInView: {
    flex: 1,
    // marginTop: '10%',
    // paddingTop: 50,
    // borderColor: 'blue',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alternateButton: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 15,
  },
  body: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default styles;
