import { autorun, observable, action } from "mobx";
import { Alert, AsyncStorage } from 'react-native';

import db from './public/js/firebase.js'

class UserStore {
  @observable user = {}

  @action userLogin (dataSent) {
    console.log('store==>', dataSent)
    let userLoginFunction = dataSent.static
    let state = dataSent.data
    let props = dataSent.props

    userLoginFunction({
      variables: {
        email: state.email,
        password: state.password
      }
    })
    .then(response => {
      let data = response.data.userLogin
      console.log('response server==>', data)

      if (data.email == null && data.password == null) {
        Alert.alert(
          'ERROR',
          `Incorrect email or password.\nPlease register if you're new to BunnyChat :3`,
          [
            {text: 'OK', onPress: () => {
              console.log('OK Pressed - error')
            }},
          ],
          { cancelable: false }
        )
      } else {
        Alert.alert(
          'SUCCESS',
          `User sign in successful !\nYou'll be redirected to your homepage :3`,
          [
            {text: 'OK', onPress: () => {
              // console.log('OK Pressed')
              // console.log('from store', data)
              let user = {
                username: data.username,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                key: data.key
              }
              AsyncStorage.setItem('token', JSON.stringify(user))
              props.navigation.navigate('Home', { user: user })
            }},
          ],
          { cancelable: false }
        )    
      }

    })
    .catch(err => {
      console.log(err)
    })
  }

  @action retrieveToken = async (props) => {
    try {
      const retrievedItem =  await AsyncStorage.getItem('token');
      console.log('===?checkToken', retrievedItem)
      if (!retrievedItem) {
        props.navigation.navigate('Auth')
      } else {
        const user = JSON.parse(retrievedItem);
        this.user = user
        console.log('saved token', user)
        // console.log('saved user', this.user.first_name)
        props.navigation.navigate('Home', { user: user })
        return user;
      }
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  @action addChat (dataSent) {
    console.log('store==>addChat', dataSent)
    let addChatFunction = dataSent.static
    let message = dataSent.message
    let user = dataSent.user
    let room = dataSent.room
    // console.log('store==>addChat', message, user, room)
    addChatFunction({
      variables: {
        message,
        userId_sender: user.key,
        room_key: room.key
      }
    })
    .then(response => {
      console.log('from add chat store', response)
    })
    .catch(err => {
      console.log('from add chat store',err)
    })
  }

  @action addRoom (dataSent) {
    console.log('store==>addRoom', dataSent)
    let user = dataSent.user
    let userId_owner = user.key
    let recipient = dataSent.recipient
    let userId_recipient = recipient.key
    let addRoomFunction = dataSent.static
    let nav = dataSent.nav
    // console.log('store==>addRoom check var', userId_owner)
    // console.log('store==>addRoom check var', userId_recipient)

    addRoomFunction({
      variables: {
        userId_owner,
        userId_recipient
      }
    })
    .then(response => {
      // console.log('from add chat store', response)
      let detail = {
        user,
        chat: response.data.addRoom
      }
      // console.log('from add chat store', detail)
      nav.navigate('ChatDetail', { detail: detail })
    })
    .catch(err => {
      console.log('from add chat store',err)
    })
  }

  @action addUser (dataSent) {
    console.log('from store ==>addUser', dataSent)

    let addUserFunction = dataSent.static
    let state = dataSent.data
    let props = dataSent.props

    if (state.email == '' || state.password == '' || state.username == '' || state.first_name == '' || state.last_name == '') {
      Alert.alert(
        'ERROR',
        `Your inputs can't be empty :3`,
        [
          {text: 'OK', onPress: () => {
            console.log('OK Pressed - error')
          }},
        ],
        { cancelable: false }
      )
    } else {
      addUserFunction({
        variables: {
          email: state.email,
          password: state.password,
          username: state.username,
          first_name: state.first_name,
          last_name: state.last_name
        }
      })
      .then(response => {
        let data = response.data.addUser
        console.log('response server==>addUser', data)
        if (data.email !== null && data.username !== null) {
          Alert.alert(
            'SUCCESS',
            `User registration successful !\nYou'll be redirected to your homepage :3`,
            [
              {text: 'OK', onPress: () => {
                // console.log('OK Pressed')
                // console.log('from store', data)
                let user = {
                  username: data.username,
                  email: data.email,
                  first_name: data.first_name,
                  last_name: data.last_name,
                  key: data.key
                }
                AsyncStorage.setItem('token', JSON.stringify(user))
                props.navigation.navigate('Home', { user: user })
              }},
            ],
            { cancelable: false }
          )
        }
      })
      .catch(err => {
        console.log('from add user store',err)
      })
    }







  }

}


const userStore = new UserStore()

export default userStore

autorun(() => {
  // console.log('test user store masuk')
})