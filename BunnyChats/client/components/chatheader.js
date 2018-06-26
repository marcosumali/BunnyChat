import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun, observable, action } from "mobx"
import { StyleSheet, Text, View, FlatList, ScrollView, Image, AsyncStorage } from 'react-native';
import { observer } from "mobx-react";
import { Icon } from 'react-native-elements'
import { Mutation, Query, graphql } from 'react-apollo'

import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'
import { ROOMS_BY_USER, GET_USER } from '../graphql/query.js'

class ChatHeader extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      user: PropTypes.object,
    }).isRequired,
  }

  render() {
    // console.log('from chatheader', this.props)
    let data = this.props.chat
    let recipientId = data.userId_recipient
    let chats = data.chats
    let update_date = data.updatedAt.split(' ')
    let update_time = update_date[4].slice(0,5)
    let last_chat = 'No messages'
    let name = ''

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<Text style={{marginTop: 64}}>An unexpected error occurred</Text>)
    }

    if (this.props.data.loading) {
      // return (<Text style={{marginTop: 64}}>Loading</Text>)
      return (
        <View
          style={[ {flex:1, alignItems: 'center', justifyContent: 'center', height: 400} ]}
        >
          <Image
            style={[ styles.bunny_loading ]}
            source={require('../public/image/bunny_loading1.gif')}
          />
        </View>    
      )
    }

    if (chats !== null) {
      let last_chat_index = chats.length -1;
      last_chat = chats[last_chat_index].message
    }

    if (this.props.data.user) {
      name = this.props.data.user.first_name + ' ' + this.props.data.user.last_name
    }

    return (
      <View
        style={ styles.chatHeader_container }
      >
        <View
          style={ styles.row }
        >
          <View
            style={[ {flex: 1, } ]}
          >
            <View
              style={ styles.row }
            >
              <View
                style={[ {flex: 1, } ]}            
              >
                <Text
                  style={ styles.chatHeader_name }
                >{ name }</Text>
              </View>
              <View
                style={[ {flex: 0.5, } ]}            
              >
                <Text
                  style={[ {textAlign:'right'}, styles.chatHeader_size ]}
                >{ update_time }</Text>
              </View>
            </View>
            <Text
              style={ styles.chatHeader_detail }
            >{ last_chat }</Text>
          </View>
          <View
            style={[ styles.view_center, {} ]}
          >
            <Icon
              name='chevron-right'
              iconStyle={ styles.icon_arrow }
            />
          </View>
        </View>
      </View>
    );
  }
}


const UserData = graphql(GET_USER, {
  options: (ownProps) => ({
    variables: {
      key: ownProps.chat.userId_recipient
    }
  })
})(ChatHeader)

export default UserData;