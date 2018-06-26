import React, { Component } from 'react';
import { autorun, observable, action } from "mobx"
import { StyleSheet, Text, View, FlatList, ScrollView, Image, AsyncStorage } from 'react-native';
import { observer } from "mobx-react";

import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'

class profile extends Component {
  render() {
    let user = this.props.user
    console.log('from profile', user)
    return (
      <View>
        <Text
          style={ styles.profile_heading }
        >Profile</Text>
        <View
          style={ styles.profile_container }
        >
          <Text
            style={ styles.profile_name }
            >{ user.first_name } { user.last_name }</Text>
          <Text
            style={ styles.profile_key }
            >USERNAME</Text>
          <Text
            style={ styles.profile_detail }
            >{ user.username }</Text>
          <Text
            style={ styles.profile_key }        
            >EMAIL</Text>
          <Text
            style={ styles.profile_detail }        
          >{ user.email }</Text>
        </View>
        


      </View>
    );
  }
}

export default profile;