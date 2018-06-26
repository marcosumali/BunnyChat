import React, { Component } from 'react';
import { 
  StyleSheet,
  Text, 
  View
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
  }
});

export default styles;