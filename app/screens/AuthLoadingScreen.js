import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCH4CLro81HlZJ-raRKoOytDeMuhwogjIQ",
  authDomain: "signin-integration-215405.firebaseapp.com",
};

firebase.initializeApp(firebaseConfig);

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  //  this._bootstrapAsync();
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
  if (user) {
    this.props.navigation.navigate('App');
  } else {
    this.props.navigation.navigate('Auth');
  }
  });
  }

  // Fetch the token from storage then navigate to our appropriate place
/*  _bootstrapAsync = async () => {
    //const userToken = await AsyncStorage.getItem('accessToken');
    //userToken?console.log("from async"):console.log("not from async ....have to sign in");;

    const userToken = await AsyncStorage.getItem('accessToken');
    userToken?console.log("from async"):console.log("not from async ....have to sign in");;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  //  this.props.navigation.navigate(userToken ? 'App' : 'Auth');
   this.props.navigation.navigate('Auth');
  };
*/
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles={
  container:{
    flex:1,
    justifyContent:'center',
  }
}
