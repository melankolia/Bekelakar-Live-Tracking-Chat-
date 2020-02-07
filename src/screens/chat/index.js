import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
  GiftedChat,
  Bubble,
  Composer,
  Send,
  Time,
} from 'react-native-gifted-chat';
import {Icon} from 'react-native-elements';
import styles from './index.style';

class Chat extends Component {
  state = {
    message: '',
    messageList: [],
    item: this.props.navigation.getParam('item'),
    status: '',
  };
  onSend = async () => {
    // console.log(this.props.navigation.getParam('item'));
    if (this.state.message.length > 0) {
      let msgId = database()
        .ref('messages')
        .child(`${this.state.uid}`)
        .child(`${this.state.item.uid}`)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.uid,
          name: this.state.name,
          avatar: this.state.photo,
        },
      };
      updates[
        this.state.uid + '/' + this.state.item.uid + '/' + msgId
      ] = message;
      updates[
        this.state.item.uid + '/' + this.state.uid + '/' + msgId
      ] = message;
      database()
        .ref('messages')
        .update(updates);
      this.setState({message: ''});
    }
    // console.log(this.state.messageList);
  };
  setMessage = () => {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: database.ServerValue.TIMESTAMP,
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  };
  getAccountData = async () => {
    const uid = auth().currentUser.uid;
    let ref = database().ref(`/users/${uid}`);
    let snapshot = await ref.once('value');
    this.setState({
      uid,
      name: snapshot.child('name').val(),
      email: snapshot.child('email').val(),
      age: snapshot.child('age').val(),
      gender: snapshot.child('gender').val(),
      photo: snapshot.child('photo').val(),
      longitude: snapshot.child('longitude').val(),
      latitude: snapshot.child('latitude').val(),
    });
    // console.log('sini bro');
    ref = database()
      .ref('messages')
      // .child('messages')
      .child(`${uid}`)
      .child(`${this.state.item.uid}`);
    ref.on('child_added', val => {
      // console.log('didalam');
      this.setState(previousState => ({
        messageList: GiftedChat.append(previousState.messageList, val.val()),
      }));
    });
    // console.log('di bawah bro');
  };
  componentDidMount = async () => {
    this.getAccountData();
    // console.log(this.state.messageList);
  };
  renderTime(props) {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: 'black',
          },
        }}
      />
    );
  }
  renderBubble(props) {
    // console.log(props);
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#DCF8C6',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 10,
          },
          left: {
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 0,
          },
        }}
        textStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: 'black',
          },
        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            width: 54,
            height: '100%',
            marginBottom: 0,
            marginLeft: 5,
            backgroundColor: '#7AC5E0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="paper-plane"
            type="font-awesome"
            size={20}
            color={'white'}
          />
        </View>
      </Send>
    );
  }
  render() {
    const {photo, img, header, heading, off} = styles;
    return (
      //   <View styles={container}>
      <>
        <View style={header}>
          <>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Profile', {
                  uid: this.state.item.uid,
                })
              }>
              <View style={img}>
                <Image source={{uri: this.state.item.photo}} style={photo} />
              </View>
            </TouchableOpacity>
            <View style={{marginLeft: 5}}>
              <Text style={heading}>{this.state.item.name}</Text>
              {this.state.item.status === 'Online' ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="circle"
                    type="font-awesome"
                    size={10}
                    color={'#33ff33'}
                  />
                  <Text style={off}>{this.state.item.status}</Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="circle"
                    type="font-awesome"
                    size={10}
                    color={'red'}
                  />
                  <Text style={off}>{this.state.item.status}</Text>
                </View>
              )}
            </View>
          </>
        </View>
        <GiftedChat
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderTime={this.renderTime}
          text={this.state.message}
          onInputTextChanged={val => {
            this.setState({message: val});
          }}
          messages={this.state.messageList}
          onSend={() => this.onSend()}
          user={{
            _id: this.state.uid,
          }}
        />
      </>
    );
  }
}

export default Chat;
