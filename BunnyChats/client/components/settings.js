import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun, observable, action } from "mobx"
import { StyleSheet, Text, View, FlatList, ScrollView, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { observer } from "mobx-react";
import { Icon } from 'react-native-elements'
import { Mutation, Query, graphql } from 'react-apollo'

import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'

class Settings extends Component {

  signOut () {
    AsyncStorage.removeItem('token')
    this.props.nav.navigation.navigate('Auth')
  }

  render() {
    return (
      <View>
        <Text
          style={ styles.profile_heading }
        >Settings</Text>

        <TouchableOpacity
          onPress={ () => this.signOut()  }                   
        >
          <View
            style={[ styles.friendHeader_container, styles.row ]}
          >
            <Icon
              name='exit-to-app'
              iconStyle={{ marginTop: 2 }}
            />
            <Text
              style={{ fontSize: 20, fontWeight: 'bold' }}
            > Sign Out</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Settings;