import React, { Component } from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40
  },
  white: {
    color: 'white',
  },
  heading: {
    fontSize: 48,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  textInput: {
    height: 35,
    backgroundColor: 'white',
    width: 250,
    marginTop: 8,
  },
  joinButton: {
    height: 35,
    backgroundColor: '#FF4081',
    width: 282,
    color: 'black',
    fontSize: 20,
    marginTop: 16,
    paddingTop: 4,
    textAlign: 'center',
    borderRadius: 3
  },
  regButton: {
    height: 35,
    backgroundColor: '#FCE4EC',
    width: 282,
    color: 'black',
    fontSize: 20,
    marginTop: 8,
    paddingTop: 4,
    textAlign: 'center',
    borderRadius: 3
  },
  row: {
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  icon: {
    height: 35,
    marginTop: 8,
    padding: 4,
    backgroundColor: 'white'
  },
  footer: {
    marginTop: 48
  },
  bold: {
    fontWeight: 'bold'
  },
  profile_heading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 4
  },
  profile_container: {
    borderColor: 'black',
    borderWidth: 2,
    margin: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    borderRadius: 5,
  },
  profile_name: {
    fontSize: 24
  },
  profile_key: {
    color: '#757575',
    paddingTop: 8
  },
  profile_detail: {
    fontSize: 16
  },
  chatHeader_container: {
    borderBottomColor: '#757575',
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8
  },
  chatHeader_name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  chatHeader_detail: {
    marginTop: 4,
    fontSize: 16,
    color: '#757575'
  },
  chatHeader_size: {
    fontSize: 16,
    color: '#757575'
  },
  view_center: {
    justifyContent: 'center',
    height: 56
  },
  icon_arrow: {
    alignSelf: 'flex-end'
  },
  chatDetail_container: {
    justifyContent: 'center', 
  },
  icon_add: {
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4,
    fontSize: 28,
    backgroundColor: 'white',
    color: '#D81B60',
  },
  textChat: {
    height: 35,
    backgroundColor: 'white',
    width: "90%",
    marginTop: 8,
  },
  chat_user_container: {
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: '#FCE4EC',
    alignSelf: 'flex-end',
    margin: 4,
    padding: 4,
    borderRadius: 5,
    maxWidth: 250
  },
  chat_counter_container: {
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-start',
    margin: 4,
    padding: 4,
    borderRadius: 5,
    maxWidth: 250
  },
  friendHeader_container: {
    borderColor: '#757575',
    borderWidth: 1,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 5
  },
  friendHeader_name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  friendHeader_email: {
    fontSize: 16,
    color: '#757575'
  },
  chat_recipient_container: {
    backgroundColor: '#EC407A',
    width: '100%',
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon_arrow_back: {
    flex: 0.5,
    fontSize: 26,
    // marginTop: 10.5,
  },
  chat_recipient_name: {
    flex: 0.9,
    alignSelf: 'center',
    fontSize: 20
  },
  icon_home_container: {
    width:'33.33%', justifyContent:'center', backgroundColor:'#AD1457',
  },
  icone_home: {
    color:'white', fontSize:40, padding: 8
  },
  bunny_loading: {
    width: 250, height: 250
  },
  bunny_loading_container: {
    flex:1, alignItems: 'center', justifyContent: 'center', height: 500
  }
  

});

export default styles;