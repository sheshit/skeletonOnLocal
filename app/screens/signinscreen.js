import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View, Button, Alert
} from 'react-native';
//import Expo from 'expo';


export default class SignInScreen extends React.Component {

  constructor(props){
    super(props);
  }

  signInWithGoogleAsync = async () => {
      try {
        const result = await Expo.Google.logInAsync({
          androidClientId: '701891613865-ji5j5f48rcbd1bfnq4s89mi5dq8ugb7d.apps.googleusercontent.com',
          iosClientId: '701891613865-3cjbhhtcfsvj69the1n9vdbanur6hbtj.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
          Alert.alert(result.accessToken);
          console.log("Successful");
          this.props.navigation.navigate('App');
        } else {
          return {cancelled: true};
        }
      } catch(e) {
        return {error: true};
      }
    }



  render() {
    return (
      <View style={styles.container}>
      <Button onPress={this.signInWithGoogleAsync} title = 'Sign in with google'/>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
