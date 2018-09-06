import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View, Button, Alert
} from 'react-native';


export default class SignInScreen extends React.Component {

  constructor(props){
    super(props);
    this.state={
      accessToken:"",
    };
  }

  accessTokenExport = () => {
    var data = {
      "accessToken": this.state.accessToken,
    }
    console.log("accessTokenExport called");
    fetch("http://192.168.201.69:3000/google-login",{
      method:"POST",
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body:  JSON.stringify(data)
    }).then(Alert.alert("Sent access token"))
  }

  signInWithGoogleAsync = async () => {
      try {
        const result = await Expo.Google.logInAsync({
          androidClientId: '701891613865-ji5j5f48rcbd1bfnq4s89mi5dq8ugb7d.apps.googleusercontent.com',
          iosClientId: '701891613865-3cjbhhtcfsvj69the1n9vdbanur6hbtj.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
          this.setState({
            accessToken:result.accessToken,
          });
          this.accessTokenExport();
          console.log(this.state.accessToken);
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
