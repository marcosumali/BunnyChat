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

import { USER_LOGIN, ADD_USER } from '../graphql/query.js'
import userStore from '../user.store.js'
import styles from '../public/css/indexCSS.js'

@observer
class Register extends Component {  
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
      password: '',
      username: '',
      first_name: '',
      last_name: ''
    };
  }

  register(addUserFunction) {
    let dataSent = {
      static: addUserFunction,
      data: this.state,
      props: this.props
    }
    // console.log('from register', dataSent)
    userStore.addUser(dataSent)
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

        <Text style={[styles.white, { fontSize: 48, fontWeight: 'bold' }]} >BunnyChat</Text>

        <Mutation mutation={ ADD_USER }>
          { addUser => (
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
              <View style={styles.row}>
                <Icon
                  name='person-pin'
                  color='#FF4081'
                  iconStyle={styles.icon}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Username"
                  onChangeText={(text) => this.setState({username: text})}
                />
              </View>
              <View style={styles.row}>
                <Icon
                  name='person-pin'
                  color='#FF4081'
                  iconStyle={styles.icon}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder="First Name"
                  onChangeText={(text) => this.setState({first_name: text})}
                />
              </View>
              <View style={styles.row}>
                <Icon
                  name='person-pin'
                  color='#FF4081'
                  iconStyle={styles.icon}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Last Name"
                  onChangeText={(text) => this.setState({last_name: text})}
                />
              </View>

              <TouchableHighlight
                onPress={ () => this.register(addUser) }
              >
                <Text
                  style={[styles.regButton]}
                >Register !</Text>
              </TouchableHighlight>

            </View>
          )}
        </Mutation>

        <View style={[styles.row, { marginTop: 16 }]}>
          <Text style={[styles.white]}>Powered by </Text>
          <Text style={[styles.white, styles.bold]}>WhatsApp</Text>
        </View>

      </View>
    );
  }

}


export default Register;



