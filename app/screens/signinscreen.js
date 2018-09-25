import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View, Button, Alert, Image
} from 'react-native';
import * as firebase from 'firebase';
import BackgroundImage from '../components/BackgroundImage.js';

export default class SignInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      accessToken: "",
      refreshToken: "",
      name: "",
      email: "",
      photoUrl: ""
    };
  }

  accessTokenExport = () => {
    var data = {
      "userId": this.state.userId,
      "accessToken": this.state.accessToken,
      "refreshToken": this.state.refreshToken,
      "name": this.state.name,
      "email": this.state.email,
      "photoUrl": this.state.photoUrl
    }
    console.log("accessTokenExport called");
    console.log(JSON.stringify(data));
    fetch("http://192.168.201.55:3000/google-login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(Alert.alert("Sent data"))
  }

  signInWithFacebookAsync = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('226750358191015', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
      console.log(JSON.stringify(response));
      console.log("Successful");
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      // Sign in with credential from the Facebook user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        // Handle Errors here.
      });
      this.props.navigation.navigate('App');
    }
    else {
      console.log('error');
    }
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '701891613865-ji5j5f48rcbd1bfnq4s89mi5dq8ugb7d.apps.googleusercontent.com',
        iosClientId: '701891613865-3cjbhhtcfsvj69the1n9vdbanur6hbtj.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log(JSON.stringify(result));
      if (result.type === 'success') {
        this.setState({
          userId: result.user.id,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          name: result.user.name,
          email: result.user.email,
          photoUrl: result.user.photoUrl
        });
        //  this.accessTokenExport();
        console.log("Successful");
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
        console.log("crucial");
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(
          Alert.alert("Success")
        ).catch((error) => {
          // Handle Errors here.
          Alert.alert("Fail!!");
        });
        this.props.navigation.navigate('App');
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <BackgroundImage>
        <Button style={styles.SigninButton} onPress={this.signInWithGoogleAsync} color='#e60000' title='Sign in with google' />
        <Button onPress={this.signInWithFacebookAsync} style={styles.SigninButton} title='Sign in with Facebook' />
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //  paddingTop:100,
    //  alignItems: 'center',
    //  backgroundColor: '#F5FCFF',
  },
  SigninButton: {
    //color: 'red',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green',
  }
});
