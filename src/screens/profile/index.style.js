import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#7AC5E0',
  },
  headerTop: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileText: {
    fontSize: 16,
    fontFamily: 'AirbnbCerealMedium',
    color: 'white',
  },
  body: {
    height: 300,
    backgroundColor: 'transparent',
  },
  card: {
    flex: 1,
    marginHorizontal: 30,
    borderRadius: 20,
    marginTop: -40,
    marginBottom: 60,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: -50,
  },
  avatarRadius: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 360,
  },
  nameText: {
    fontSize: 20,
    marginTop: 22,
    fontFamily: 'AirbnbCerealMedium',
  },
  locationText: {
    color: 'gray',
    fontSize: 12,
    fontFamily: 'AirbnbCerealMedium',
  },
  contact: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  edge: {
    borderLeftColor: '#E6E6E6',
    borderLeftWidth: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  labelContact: {
    color: 'gray',
    fontSize: 10,
    fontFamily: 'AirbnbCerealMedium',
  },
  chat: {
    // width: '100%',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 40,
    backgroundColor: '#26B6E3',
  },
});

export default styles;
