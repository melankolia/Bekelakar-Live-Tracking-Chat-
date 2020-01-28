import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './index.style';

class ChatList extends Component {
  state = {
    userList: [],
    refreshing: false,
    uid: '',
  };

  componentDidMount = async () => {
    const uid = auth().currentUser.uid;
    this.setState({uid: uid, refreshing: true});

    await database()
      .ref('/users')
      .on('child_added', data => {
        let otherUser = data.val();
        if (otherUser.uid !== uid) {
          this.setState(prevData => {
            return {userList: [...prevData.userList, otherUser]};
          });
          this.setState({refreshing: false});
        }
      });
  };

  renderItem = ({item}) => {
    const {
      row,
      pic,
      nameContainer,
      nameTxt,
      on,
      off,
      msgContainer,
      status,
    } = styles;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('Chat', {item})}>
          <View style={row}>
            <Image source={{uri: item.photo}} style={pic} />
            <View>
              <View style={nameContainer}>
                <Text style={nameTxt} numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
                </Text>
                {item.status === 'Online' ? (
                  <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <Text style={on}>{item.status}</Text>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <Text style={off}>{item.status}</Text>
                  </View>
                )}
              </View>
              <View style={msgContainer}>
                <Text style={status}>{item.email}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <>
        <SafeAreaView>
          {this.state.refreshing === true ? (
            <ActivityIndicator
              size="large"
              color="#05A0E4"
              style={{marginTop: 150}}
            />
          ) : (
            <FlatList
              data={this.state.userList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </SafeAreaView>
      </>
    );
  }
}

export default ChatList;
