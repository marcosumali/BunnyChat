import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun, observable, action } from "mobx"
import { StyleSheet, Text, View, FlatList, ScrollView, Image, AsyncStorage,
  TouchableHighlight, TouchableOpacity } from 'react-native';
import { observer } from "mobx-react";
import { Icon } from 'react-native-elements'
import { Mutation, Query, graphql } from 'react-apollo'

import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'
import { ADD_ROOM, ROOMS_BY_USER } from '../graphql/query.js'


class FriendHeader extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      roomsByUser: PropTypes.object,
    }).isRequired,
  }

  addRoom(addRoomFunction) {
    let user = this.props.user
    let recipient = this.props.friend
    let rooms = this.props.data.roomsByUser
    let statusNew = true
    let status = true
    let roomChat = {}
    
    if (rooms) {
      rooms.map((room, index) => {
        if (user.key == room.userId_owner && recipient.key == room.userId_recipient && status) {
          roomChat = room
          statusNew = false
          status = false
        }
      })
    }

    let dataSent = {
      static: addRoomFunction,
      user,
      recipient,
      nav: this.props.nav,
    }

    if (statusNew == false) {
      let detail = {
        user,
        chat: roomChat
      }
      this.props.nav.navigate('ChatDetail', { detail: detail })
    } else {
      userStore.addRoom(dataSent)
    }

  }

  render() {
    // console.log('from friend header', this.props)
    let friend = this.props.friend
    let first_name = friend.first_name
    let last_name = friend.last_name
    let email = friend.email

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
      <Mutation mutation={ADD_ROOM}> 
      {
        addRoom => (
          <TouchableOpacity
            onPress={ () => this.addRoom(addRoom) }
          >
            <View
              style={styles.friendHeader_container}
            >
              <Text
                style={styles.friendHeader_name}
                >{first_name} {last_name}</Text>
              <Text
                style={styles.friendHeader_email}
              >{email}</Text>
            </View>
          </TouchableOpacity>
        )
      }
      </Mutation>
    );
  }
}


const FriendHeaderWithData = graphql(ROOMS_BY_USER, {
  options: (ownProps) => ({
    variables: {
      key: ownProps.user.key
    }
  })
})(FriendHeader)


export default FriendHeaderWithData;