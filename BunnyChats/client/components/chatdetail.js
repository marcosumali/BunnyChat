import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun, observable, action } from "mobx"
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ScrollView, 
  Image, 
  AsyncStorage, 
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { observer } from "mobx-react";
import { Icon } from 'react-native-elements'
import { Mutation, Query, graphql } from 'react-apollo'

import { ADD_CHAT, GET_USER } from '../graphql/query.js'
import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'
import db from '../public/js/firebase.js'

class ChatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      chats: [],
      user: {}
    };
  }

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      user: PropTypes.object,
    }).isRequired,
  }

  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#fff',
      height: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
    },
  }

  sendMessage (addChatFunction) {
    let chat_detail = this.props.navigation.getParam('detail', 'No detail')
    let user = chat_detail.user
    let room = chat_detail.chat
    let dataSent = {
      static: addChatFunction,
      message: this.state.message,
      user,
      room
    }
    if (this.state.message !== '') {
      // console.log('send', this.state.message)
      userStore.addChat(dataSent)
    }
  }

  componentDidMount() {
    let chat_detail = this.props.navigation.getParam('detail', 'No detail')
    // console.log('from detail did mount', chat_detail)
    if (chat_detail.user !== undefined && chat_detail.chat !== undefined ) {
      this.setState({ user: chat_detail.user })
      let user_key = chat_detail.user.key
      let room_key = chat_detail.chat.key
  
      db.ref(`Rooms/${room_key}`).on('value', (snapshot) => {
        // console.log('didmout detail', snapshot.val())
        let chat_room = snapshot.val()
        if (chat_room.Chats) {
          let chat_keys =  Object.getOwnPropertyNames(chat_room.Chats)
          let arrChats = []
          
          chat_keys.map((key, index) => {
            db.ref(`Rooms/${room_key}/Chats/${key}`).on('value', (snapshot1) => {
              let chat_data = snapshot1.val()
              let chat_key = snapshot1.key
              chat_data['key'] = chat_key
              let status = true;
  
              if (arrChats.length > 0) {
                arrChats.map((chat, index) => {
                  if (chat.key !== chat_data.key && status) {
                    // console.log('check push', chat_data)
                    arrChats.push(chat_data)
                    status = false
                  }
                })
              } else {
                // console.log('satu kali aja cuy')
                arrChats.push(chat_data)
              }
  
            })
          })
          this.setState({ chats: arrChats })
        }
      })
    }
  }

  render() {
    let recipient = this.props.data.user
    // console.log('from details render', this.props)

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
            source={require('../public/image/bunny_loading.gif')}
          />
        </View>    
      )
    }

    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ScrollView>
          <View
            style={[ styles.chat_recipient_container, styles.row ]}
          > 
            <TouchableOpacity
              onPress={ () => this.props.navigation.navigate('Home') }                   
            >
              <View
                style={[ styles.row, { height: 56, alignItems: 'center' } ]}     
              >
                <Icon
                  name='keyboard-arrow-left'
                  iconStyle={ styles.icon_arrow_back }
                />
              </View>
            </TouchableOpacity>
            {
              recipient !== undefined ?
                <Text
                  style={ styles.chat_recipient_name }
                >{ recipient.first_name } { recipient.last_name }</Text>
              :
                <View></View>
            }
          </View>

          {
            this.state.chats.length > 0 ?
              this.state.chats.map((chat, index) => {
                let create_date = chat.createdAt.split(' ')
                let create_time = create_date[4].slice(0,5)

                return this.state.user.key == chat.userId_sender ?
                  <View 
                    key={index}
                    style={[styles.chat_user_container, styles.row]}
                  >
                    <Text
                      style={{ fontSize: 16 }}
                      >{ chat.message } </Text>
                    <Text                
                      style={{ fontSize: 16, color:'#757575' }}
                    >{ create_time }</Text>
                  </View>
                :             
                  <View 
                    key={index}
                    style={[styles.chat_counter_container, styles.row]}
                  >
                    <Text
                      style={{ fontSize: 16 }}
                      >{ chat.message } </Text>
                    <Text                
                      style={{ fontSize: 16, color:'#757575' }}
                    >{ create_time }</Text>
                  </View>
              })
            :
            <View></View>
          }
        </ScrollView>
        <Mutation mutation={ ADD_CHAT }>
          { addChat => (
            <View>
              <KeyboardAvoidingView behavior="padding">
                <View
                  style={ styles.row }
                >
                  <TextInput
                    style={[styles.textChat]}
                    onChangeText={(text) => this.setState({message: text})}
                  />
                  <TouchableOpacity 
                    style={{backgroundColor:'white',marginTop:8,height: 36}}
                    onPress={ () => this.sendMessage(addChat) }
                  >
                    <Icon
                      name='send'
                      iconStyle={ styles.icon_add }
                    />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
          )}
        </Mutation>
      </View>
    );
  }
}

const UserData = graphql(GET_USER, {
  options: (ownProps) => ({
    variables: {
      key: ownProps.navigation.getParam('detail', 'No detail').chat.userId_recipient
    }
  })
})(ChatDetail)

export default UserData;