import React, { Component } from 'react';
import { autorun, observable, action } from "mobx"
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ScrollView, 
  Image, 
  TextInput, 
  TouchableHighlight, 
  TouchableNativeFeedback, 
  TouchableOpacity 
} from 'react-native';
import { Icon } from 'react-native-elements'
import { Mutation, Query } from 'react-apollo'
import { observer } from "mobx-react";

import { USER_LOGIN } from '../graphql/query.js'
import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'

@observer
class auth extends Component {  
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#fff',
      height: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      alignSelf: 'center',
      fontSize: 48,
      flex: 1,
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  signIn(userLoginFunction) {
    // console.log('check state',this.state)
    let dataSent = {
      static: userLoginFunction,
      data: this.state,
      props: this.props
    }
    // console.log('data sent', dataSent)
    // console.log('store check', userStore)
    userStore.userLogin(dataSent)
  }

  render() {
    // console.log(this.state)
    // console.log(USER_LOGIN)
    // console.log('from auth', this.props)
    return (
      <View style={styles.container}>
        <Image
          style={{width: 150, height: 150}}
          source={require('../public/image/pbpink_crop.jpg')}
        />

        <Text style={[styles.white, styles.heading]} >BunnyChat</Text>

        <Mutation mutation={ USER_LOGIN }>
          {userLogin => (
            <View>
              <View style={styles.row}>
                <Icon
                  name='email'
                  color='#FF4081'
                  iconStyle={styles.icon}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Email"
                  onChangeText={(text) => this.setState({email: text})}
                />
              </View>
              <View style={styles.row}>
                <Icon
                  name='android'
                  color='#FF4081'
                  iconStyle={styles.icon}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Password"
                  onChangeText={(text) => this.setState({password: text})}
                />
              </View>
              <TouchableOpacity onPress={ () => this.signIn(userLogin) }>
                <Text
                  style={[styles.joinButton]}
                >Sign In</Text>
              </TouchableOpacity>
            </View>
          )}

        </Mutation>

        <Text style={[styles.white, { marginTop: 8, fontWeight: 'bold' }]}>OR</Text>
        
        <TouchableHighlight
          onPress={ () => this.props.navigation.navigate('Register') }
        >
          <Text
            style={[styles.regButton]}
          >Register !</Text>
        </TouchableHighlight>

        <View style={[styles.row, styles.footer]}>
          <Text style={[styles.white]}>Powered by </Text>
          <Text style={[styles.white, styles.bold]}>WhatsApp</Text>
        </View>

      </View>
    );
  }

}


export default auth;



