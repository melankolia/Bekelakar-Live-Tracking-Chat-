import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#7AC5E0',
  },
  edit: {
    color: 'white',
    fontFamily: 'AirbnbCerealMedium',
    fontSize: 16,
  },
  save: {
    color: 'white',
    fontFamily: 'AirbnbCerealLight',
    fontSize: 14,
  },
  headerTop: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  headerBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 10,
    height: 200,
  },
  headerImage: {
    width: 126,
    height: 126,
    borderRadius: 360,
    marginTop: -70,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  containerInput: {
    borderBottomWidth: 8,
    borderColor: '#F5F5F6',
    paddingVertical: 10,
  },
  labelText: {
    color: '#7AC5E0',
    fontFamily: 'AirbnbCerealBold',
    fontSize: 14,
    paddingLeft: 10,
  },
  inputText: {
    height: 40,
    paddingLeft: 35,
  },
  buttonGroupStyle: {
    width: '80%',
    height: 40,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: '#F5F5F6',
    borderWidth: 2,
  },
});

export default styles;
