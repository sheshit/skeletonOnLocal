import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import BackgroundImage from "../components/BackgroundImage.js";
import { iam_access_id, iam_secret, ip_address } from "./keys.js";

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
      userId: this.state.userId,
      accessToken: this.state.accessToken,
      refreshToken: this.state.refreshToken,
      name: this.state.name,
      email: this.state.email,
      photoUrl: this.state.photoUrl
    };
    console.log("accessTokenExport called");
    console.log(JSON.stringify(data));
    fetch(ip_address+"/google-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(Alert.alert("Sent data"));
  };

  signInWithFacebookAsync = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "226750358191015",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      console.log(JSON.stringify(response));
      console.log("Successful");
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {});
      this.props.navigation.navigate("App");
    } else {
      console.log("error");
    }
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "701891613865-ji5j5f48rcbd1bfnq4s89mi5dq8ugb7d.apps.googleusercontent.com",
        iosClientId:
          "701891613865-3cjbhhtcfsvj69the1n9vdbanur6hbtj.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      console.log(JSON.stringify(result));
      if (result.type === "success") {
        this.setState({
          userId: result.user.id,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          name: result.user.name,
          email: result.user.email,
          photoUrl: result.user.photoUrl
        });
        console.log("Successful");
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );
        console.log("crucial");
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(Alert.alert("Success"))
          .catch(error => {
            Alert.alert("Fail!!");
          });
        this.props.navigation.navigate("App");
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]} onPress={this.signInWithFacebookAsync} >
        <View style={styles.socialButtonContent}>
          <Image
            style={styles.icon}
            source={require('../assets/Icons/facebookIcon.png')}
          />
          <Text style={styles.loginText}>Sign in with facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]} onPress={this.signInWithGoogleAsync} >
        <View style={styles.socialButtonContent}>
          <Image
            style={styles.icon}
            source={require('../assets/Icons/googleIcon.png')}
          />
          <Text style={styles.loginText}>Sign in with google</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B0E0E6"
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft:20,
  },
  buttonContainer: {
    height: 45,
    justifyContent: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 45
  },
  loginText: {
    color: "white",
    marginLeft:25,
  },
  fabookButton: {
    backgroundColor: "#3b5998"
  },
  googleButton: {
    backgroundColor: "#ff0000"
  },
  socialButtonContent: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
  },
});
