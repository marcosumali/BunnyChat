import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun, observable, action } from "mobx"
import { StyleSheet, Text, View, FlatList, ScrollView, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import { observer } from "mobx-react";
import { Icon } from 'react-native-elements'
import { Mutation, Query, graphql } from 'react-apollo'

import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'
import { GET_USERS } from '../graphql/query.js'
import FriendHeader from './friendheader'


class Friends extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      users: PropTypes.object,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {}
    };
  }

  componentDidMount () {
  }

  render() {
    let users = this.props.data.users
    let user = this.props.user
    let friends = []

    if (users !== undefined ) {
      users.map((userData, index) => {
        if (user.key !== userData.key) {
          friends.push(userData)
        }
      })
    }
    // console.log('from friends', this.props)
    // console.log('from friends', friends)

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
        >Bunnies</Text>
        {
          friends.map((friend, index) => (
            <FriendHeader 
              friend={friend}
              user={user}
              key={index}
              nav={ this.props.nav.navigation }
            />
          ))
        }
      </View>
    );
  }
}

const FriendsData = graphql(GET_USERS)(Friends)


export default FriendsData;