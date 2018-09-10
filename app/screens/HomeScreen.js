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


export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


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
