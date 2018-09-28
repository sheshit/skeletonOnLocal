import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCH4CLro81HlZJ-raRKoOytDeMuhwogjIQ",
  authDomain: "signin-integration-215405.firebaseapp.com"
};

firebase.initializeApp(firebaseConfig);

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("App");
      } else {
        this.props.navigation.navigate("Auth");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center"
  }
};
