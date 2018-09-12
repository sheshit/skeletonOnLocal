import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,Alert,
} from 'react-native';
import {Constants} from 'expo';
import {Entypo,Ionicons} from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import * as firebase from 'firebase';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './Profile.js';
import PhotoCardScreen from './PhotoCardScreen.js';
export default class HomeScreen extends Component {
  static navigationOptions = {
        title: "Awesome App",
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerRight: <Icon style={{ paddingRight: 10 }} name="ios-add-circle" /> ,
    }


    signOutUser = async () => {
      try {
          await firebase.auth().signOut();
            this.props.navigation.navigate('Auth');
      } catch (e) {
          console.log(e);
      }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          HomeScreen
        </Text>
        <Button onPress={()=>this.props.navigation.navigate('Profile')} title="Open Profile" />
        <Button onPress={()=>this.props.navigation.navigate('PhotoCardScreen')} title="Open photo" />
        <Button onPress={this.signOutUser} title="sign out" />
      </View>
    );
  }
}
/*
export default createStackNavigator(
      {
      HomeScreen:HomeScreen,
      Profile:ProfileScreen,
      PhotoCardScreen:PhotoCardScreen,
      },
      {
        initialRouteName:'HomeScreen'
      }
      );
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    //alignItems: 'center',
   // paddingTop:Constants.statusBarHeight,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    //margin: 10,
  }
});
