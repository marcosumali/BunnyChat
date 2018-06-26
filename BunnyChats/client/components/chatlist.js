import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun, observable, action } from "mobx"
import { StyleSheet, Text, View, FlatList, ScrollView, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import { observer } from "mobx-react";
import { Icon } from 'react-native-elements'
import { Mutation, Query, graphql } from 'react-apollo'

import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'
import { ROOMS_BY_USER } from '../graphql/query.js'
import db from '../public/js/firebase.js'
import ChatHeader from './chatheader'

class ChatList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      roomsByUser: PropTypes.object,
    }).isRequired,
  }

  goToDetail (chat) {
    // console.log('Yes', chat)
    let user = this.props.user
    let detail = {
      user,
      chat
    }
    this.props.nav.navigation.navigate('ChatDetail', { detail: detail })
  }
  
  render() {
    console.log('from chatlist => props', this.props)
    let chats = this.props.data.roomsByUser
    // let chats = []
    let user = this.props.user


    // db.ref('Rooms').on('value', (snapshot) => {
    //   let roomsData = snapshot.val()
    //   let arrRoomId = Object.getOwnPropertyNames(roomsData)
  
    //   arrRoomId.map((roomId, index) => {
    //     db.ref('Rooms/' + roomId).on('value', (snapshot1) => {
    //       let roomData = snapshot1.val()
    //       let roomKey = snapshot1.key
    //       roomData['key'] = roomKey        
    //       if (roomData.userId_owner == user.key || roomData.userId_recipient == user.key) {
    //         if (roomData.Chats) {
    //           const Chats = []
    //           let arrChatId = Object.getOwnPropertyNames(roomData.Chats)          
    //           arrChatId.map((chatId, index) => {
    //             db.ref(`Rooms/${roomId}/Chats/${chatId}`).on('value', (snapshot2) => {
    //               let chatData = snapshot2.val()
    //               let chatKey = snapshot2.key
    //               chatData['key'] = chatKey
    //               Chats.push(chatData)
    //             })
    //           })
    //           roomData['chats'] = Chats
    //           chats.push(roomData)  
    //         } else {
    //           chats.push(roomData)
    //         }
    //       }
    //     })
    //   })
    // })   

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<Text style={{marginTop: 64}}>An unexpected error occurred</Text>)
    }

    if (this.props.data.loading) {
      // return (<Text style={{marginTop: 64}}>Loading</Text>)
      return (
        <View
          style={[ styles.bunny_loading_container ]}
        >
          <Image
            style={[ styles.bunny_loading ]}
            source={require('../public/image/bunny_loading1.gif')}
          />
        </View>    
      )
    }

    return (
      <View>
        <Text
          style={ styles.profile_heading }
        >Chats</Text>
        <View>
        { 
          chats.map((chat, index) => (
            <TouchableHighlight 
              onPress={ () => this.goToDetail(chat) }
              key={index}
            >
              <View>
                <ChatHeader 
                  chat={ chat }
                />
              </View>
            </TouchableHighlight>
          ))
        }
        </View>
      </View>
    );
  }
}

const ChatListWithData = graphql(ROOMS_BY_USER, {
  options: (ownProps) => ({
    variables: {
      key: ownProps.user.key
    }
  })
})(ChatList)

export default ChatListWithData;