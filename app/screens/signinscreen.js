import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View, Button, Alert
} from 'react-native';
//import Expo from 'expo';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';


export default class SignInScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userInfo:"",
    };
  }

  componentWillMount(){
    GoogleSignin.configure({
  scopes: ['email','profile'], // what API you want to access on behalf of the user, default is email and profile
  androidClientId: '701891613865-0tkhm1dec4o944sslq8jct2osmi4d8io.apps.googleusercontent.com', // only for iOS
//  webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
  accountName: '', // [Android] specifies an account name on the device that should be used
});
  }


  _signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      Alert.alert("Cancelled");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};



  render() {
    return (
      <View style={styles.container}>
      <GoogleSigninButton
  style={{ width: 48, height: 48 }}
  size={GoogleSigninButton.Size.Icon}
  color={GoogleSigninButton.Color.Dark}
  onPress={this._signIn}/>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
