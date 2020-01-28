import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7AC5E0',
  },
  map: {
    flex: 1,
  },
  // buttonConsole: {
  //   backgroundColor: 'yellow',
  //   width: 250,
  //   height: 250,
  // },
  detail: {
    position: 'absolute',
    top: height * 0.65,
    left: width * 0.05,
    backgroundColor: 'white',
    width: '90%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 40,
  },
  slider: {
    flexDirection: 'row',
    // height: 80,
    position: 'absolute',
    width: '100%',
    top: height - height * 0.17,
    left: 0,
    // backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  marker: {
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    width: 60,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 10,
    paddingHorizontal: 7,
  },
  markerImage: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
});

export default styles;
