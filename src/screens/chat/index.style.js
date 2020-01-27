import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  photo: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  img: {
    backgroundColor: 'silver',
    width: 41,
    height: 41,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heading: {
    color: 'white',
    fontSize: 16,
    // fontWeight: '700',
    width: 'auto',
  },
  header: {
    backgroundColor: '#7AC5E0',
    height: 70,
    width: '100%',
    paddingHorizontal: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  off: {
    fontWeight: '200',
    color: 'whitesmoke',
    fontSize: 13,
    paddingLeft: 5,
  },
});

export default styles;
