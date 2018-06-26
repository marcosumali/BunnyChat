import React, { Component } from 'react';
import { autorun, observable, action } from "mobx"
import { StyleSheet, Text, View, FlatList, ScrollView, Image, AsyncStorage, RefreshControl, TouchableOpacity } from 'react-native';
import { observer } from "mobx-react";
import { Icon } from 'react-native-elements'

import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'
import Profile from './profile'
import ChatList from './chatlist'
import Friends from './friends'
import Settings from './settings'

class home extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      refreshing: false,
      status_home: 'chats'
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    // fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

  buttonChat () {
    this.setState({status_home: 'chats'})
    // console.log(this.state.status_home)
  }

  buttonFriends () {
    this.setState({status_home: 'friends'})
  }

  buttonSettings () {
    this.setState({status_home: 'settings'})
  }

  componentDidMount () {
    // console.log('didmount home', this.props)
    userStore.retrieveToken(this.props)
  }

  render () {
    console.disableYellowBox = true;
    let user_profile = this.props.navigation.getParam('user', 'No user')
    // console.log('user identified', user_profile)
    return (
      <View
        style={{backgroundColor:'white', height: '100%'}}
      >
        <ScrollView>
          <View
            style={ styles.row }
          > 
            <TouchableOpacity
              onPress={ () => this.buttonChat() }
              style={styles.icon_home_container}
            >
              <View
                style={[ styles.row, {alignSelf:'center'} ]}
              >
                <Icon
                  name='chat'
                  iconStyle={[ styles.icone_home ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ () => this.buttonFriends() }
              style={[styles.icon_home_container, {borderRightColor: 'white', borderRightWidth: 2, borderLeftColor: 'white', borderLeftWidth: 2}]}
            >
              <View
                style={[ styles.row, {alignSelf:'center'} ]}
              >
                <Icon
                  name='people'
                  iconStyle={[ styles.icone_home ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ () => this.buttonSettings() }
              style={styles.icon_home_container}
            >
              <View
                style={[ styles.row, {alignSelf:'center'} ]}
              >
                <Icon
                  name='settings'
                  iconStyle={[ styles.icone_home ]}
                />
              </View>
            </TouchableOpacity>


          </View>

          {
            this.state.status_home == 'chats' ?
            <View>
            { user_profile !== 'No user' ?
              <ChatList
                nav={ this.props }
                user={ user_profile }
              ></ChatList>
              :
              // <Text>Loading..</Text>
              <View
                style={[ styles.bunny_loading_container ]}
              >
                <Image
                  style={[ styles.bunny_loading ]}
                  source={require('../public/image/bunny_loading1.gif')}
                />
              </View>
            }
            </View>
            :
            <View></View>
          }

          {
            this.state.status_home == 'friends' ?
            <View>
              <Friends 
                user={ user_profile }
                nav={ this.props }
              />
            </View>
            :
            <View></View>
          }

          {
            this.state.status_home == 'settings' ?
            <View>
              <Profile 
                user={ user_profile }
              />
              <Settings 
                nav={ this.props }
              />
            </View>
            :
            <View></View>
          }



        </ScrollView>
      </View>
    )
  }
}

export default home;



